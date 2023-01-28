import appNextConnect from '@lib/next-connect';
import EducationController from 'src/modules/profiles/controller/education.controller';

const handler = appNextConnect
  .get(EducationController.getEducationByEduId)
  .put(EducationController.updateEducation)
  .delete(EducationController.deleteducation);

export default handler;
