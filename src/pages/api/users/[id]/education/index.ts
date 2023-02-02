import appNextConnect from '@lib/next-connect';
import EducationController from 'src/modules/profiles/controller/education.controller';

const handler = appNextConnect
  .get(EducationController.getEducationsByUserId)
  .post(EducationController.create)
  .put(EducationController.createManyRecords);

export default handler;
