import appNextConnect from '@lib/next-connect';
import dateFormat from 'dateformat';
import querystring from 'qs';
import crypto from 'crypto';

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

  // const config = require('config');

  const tmnCode = 'LV8GF9HU'; // config.get('vnp_TmnCode');
  const secretKey = 'PCNZIYGWCOCPNHWAYYJAYFSTPXBREKIV'; // config.get('vnp_HashSecret');
  // let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // config.get('vnp_Url'); // use rewrites to prevent CORS
  let vnpUrl = '/vnpayUrl';
  const returnUrl = 'http://localhost:3005/vnpayreturn'; // config.get('vnp_ReturnUrl');

  const date = new Date();

  const createDate = dateFormat(date, 'yyyymmddHHmmss');
  const orderId = dateFormat(date, 'HHmmss');
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

  // return res.status(200).json({
  //   data: vnpUrl,
  //   status: true,
  // });
  res.redirect(vnpUrl);
});

export default handler;

// https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=10000000&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=20230310000335&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=undefined&vnp_OrderInfo=Nap+tien+cho+thue+bao+0123456789.+So+tien+100%2C000+VND&vnp_OrderType=250000&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3005%2Fvnpayreturn&vnp_TmnCode=LV8GF9HU&vnp_TxnRef=000335&vnp_Version=2.1.0&vnp_SecureHash=8c9462c6e57c485ed462ef06d6b359561bd6f37feaf202e1b0ddc89133c7338018ebef0046d93791b73686c0dafd71ab6fed4a39e9c952d33ca1e72629854f5f
