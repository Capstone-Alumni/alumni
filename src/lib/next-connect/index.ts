import nc from 'next-connect';
import onErrorAPIHandler from './onErrorAPIHandler';
import onNoMatchAPIHandler from './onNoMatchAPIHandler';

const appNextConnect = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
});

export default appNextConnect;
