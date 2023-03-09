import appNextConnect from '@lib/next-connect';
import querystring from 'qs';
import crypto from 'crypto';
import { isNil } from 'lodash/fp';
import { formatDate } from '@share/utils/formatDate';

function sortObject(obj: any) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

const handler = appNextConnect.post(function (req, res) {
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;

  const tmnCode = process.env.VNPAY_TMNCODE; // config.get('vnp_TmnCode');
  const secretKey = process.env.VNPAY_HASHSECRET; // config.get('vnp_HashSecret');

  if (isNil(secretKey) || isNil(tmnCode)) {
    return res.status(500).json({
      message: 'Xảy ra lỗi',
      status: false,
    });
  }

  let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // config.get('vnp_Url');
  // TODO: https://capstone-alumni.atlassian.net/browse/AL-147
  const returnUrl = 'http://localhost:3005/vnpayreturn'; // config.get('vnp_ReturnUrl');

  const date = new Date();

  const createDate = formatDate(date, 'yyyyMMddHHmmss');
  const orderId = formatDate(date, 'HHmmss');
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
  vnp_Params.vnp_OrderInfo = orderInfo;
  vnp_Params.vnp_OrderType = orderType;
  vnp_Params.vnp_Amount = amount * 100;
  vnp_Params.vnp_ReturnUrl = returnUrl;
  vnp_Params.vnp_IpAddr = ipAddr;
  vnp_Params.vnp_CreateDate = createDate;
  if (bankCode !== undefined && bankCode !== null && bankCode !== '') {
    vnp_Params.vnp_BankCode = bankCode;
  }

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
});

export default handler;
