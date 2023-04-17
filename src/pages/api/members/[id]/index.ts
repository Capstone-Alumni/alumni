import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import MemberController from 'src/modules/members/controllers/member.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
})
  // .get(MemberController.getById)
  .put(MemberController.updateInfoById);

export default handler;
