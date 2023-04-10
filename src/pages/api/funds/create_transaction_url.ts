import nc from 'next-connect';
import querystring from 'qs';
import crypto from 'crypto';
import { isNil } from 'lodash/fp';
import { formatDate } from '@share/utils/formatDate';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import { sortObject } from '@share/utils/sortObject';
import { extractTenantId, NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import { getTenantVnpayData } from '@share/utils/getTenantData';
import getSubdomain from '@share/utils/getSubdomain';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
})
  .use(extractTenantId)
  .use(isAuthenticatedUser);

handler.post(async function (req: NextApiRequestWithTenant, res) {
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;

  const subdomain = getSubdomain();

  const { data } = await getTenantVnpayData(req.tenantId);
  // const tmnCode = process.env.VNPAY_TMNCODE; // config.get('vnp_TmnCode');
  // const secretKey = process.env.VNPAY_HASHSECRET; // config.get('vnp_HashSecret');
  const tmnCode = data.vnp_tmnCode;
  const secretKey = data.vnp_hashSecret;

  if (isNil(secretKey) || isNil(tmnCode)) {
    return res.status(500).json({
      message: 'Xảy ra lỗi',
      status: false,
    });
  }

  let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // config.get('vnp_Url');
  // TODO: https://capstone-alumni.atlassian.net/browse/AL-147

  const host = process.env.NEXT_PUBLIC_MAINAPP_HOST;
  const returnUrl = `${host?.replace(
    'alumni-sp23',
    subdomain,
  )}/transaction_status`;
  // 'http://localhost:3005/vnpayreturn'; // config.get('vnp_ReturnUrl');

  const date = new Date();

  const createDate = formatDate(date, 'yyyyMMddHHmmss');
  const orderId = createDate; // formatDate(date, 'HHmmss');
  const amount = req.body.amount;
  const bankCode = req.body.bankCode;

  const orderInfo = req.body.orderDescription;
  const orderType = req.body.orderType;
  let locale = req.body.language;
  if (locale === undefined || locale === null || locale === '') {
    locale = 'vn';
  }
  const currCode = 'VND';
  let vnp_Params: any = {};
  vnp_Params.vnp_Version = '2.1.0';
  vnp_Params.vnp_Command = 'pay';
  vnp_Params.vnp_TmnCode = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params.vnp_Locale = locale;
  vnp_Params.vnp_CurrCode = currCode;
  vnp_Params.vnp_TxnRef = orderId;
  vnp_Params.vnp_OrderInfo = `${req.tenantId} ${orderInfo}`;
  vnp_Params.vnp_OrderType = orderType;
  vnp_Params.vnp_Amount = amount * 100;
  vnp_Params.vnp_IpAddr = ipAddr;
  vnp_Params.vnp_CreateDate = createDate;
  if (bankCode !== undefined && bankCode !== null && bankCode !== '') {
    vnp_Params.vnp_BankCode = bankCode;
  }

  const prisma = await getPrismaClient(req.tenantId);

  await prisma.fundTransaction.create({
    data: {
      ...vnp_Params,
      vnp_Amount: parseInt(vnp_Params.vnp_Amount, 10),
      vnp_OrderType: vnp_Params.vnp_OrderType.toString(),
      incognito: req.body.incognito,
      fund: {
        connect: { id: req.body.fundId },
      },
      userInformation: {
        connect: { userId: req.user.id },
      },
    },
  });

  await prisma.$disconnect();

  vnp_Params.vnp_ReturnUrl = returnUrl;
  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params.vnp_SecureHash = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  return res.status(200).json({
    data: vnpUrl,
    status: true,
  });
  // res.redirect(vnpUrl);
});

export default handler;
