import { PrismaClient } from '@prisma/client';
import { sendMailService } from 'src/utils/emailSmsService';
import { UpdateApplication } from '../type';

export default class ApplicationService {
  static apply = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
    userId: string,
    body: { resumeUrl: string },
    host: string | undefined,
  ) => {
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: {
        AND: [{ id: recruitmentId }, { archived: false }, { isPublic: true }],
      },
      include: {
        recruitmentOwner: {
          include: {
            information: true,
          },
        },
      },
    });
    if (!recruitment) {
      throw new Error('Recruitment is not Existed');
    }
    const isExistedApplication =
      await tenantPrisma.recruitmentApplication.findFirst({
        where: {
          AND: [
            { applicationOwnerId: userId },
            { recruitmentId: recruitmentId },
          ],
        },
      });
    if (isExistedApplication) {
      throw new Error('Your application had been submitted');
    }

    const apply = await tenantPrisma.recruitmentApplication.create({
      data: {
        ...body,
        recruitment: {
          connect: {
            id: recruitmentId,
          },
        },
        applicationOwner: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (recruitment.recruitmentOwner.information?.email) {
      let setupLink = '';
      if (process.env.NODE_ENV === 'production') {
        setupLink = `https://${host}/recruitments/job_details/${recruitment.id}`;
      } else {
        setupLink = `http://${host}/recruitments/job_details/${recruitment.id}`;
      }
      await sendMailService({
        to: recruitment.recruitmentOwner.information.email,
        subject: `Vị trí cho công việc ${recruitment.title} vừa có người ứng tuyển`,
        text: `
            <p>Xin chào ${recruitment.recruitmentOwner.information.fullName},<p>
            <br/>
            <p>Vừa có người ứng tuyển vào công việc bạn đăng: <span style="font-weight: bold;">${recruitment.title}</span>. </p> <br/>
            <p>Hãy click vào đường dẫn để trực tiếp tới trang chi tiết công việc để xem danh sách ứng viên</p>
            <a href="${setupLink}">Link truy cập</a>
        `,
      });
    }

    await tenantPrisma.$disconnect();

    return apply;
  };

  static update = async (
    tenantPrisma: PrismaClient,
    applicationId: string,
    userId: string,
    body: UpdateApplication,
  ) => {
    const isApplicationExisted =
      await tenantPrisma.recruitmentApplication.findFirst({
        where: { id: applicationId, archived: false },
      });
    if (!isApplicationExisted) {
      throw new Error('Application is not existed');
    } else if (isApplicationExisted.applicationOwnerId !== userId) {
      throw new Error('You are not allowed to update');
    }

    const updated = await tenantPrisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: {
        ...body,
      },
    });

    await tenantPrisma.$disconnect();

    return updated;
  };

  static delete = async (
    tenantPrisma: PrismaClient,
    applicationId: string,
    userId: string,
    isSchoolAdmin: boolean,
  ) => {
    const application = await tenantPrisma.recruitmentApplication.findFirst({
      where: { id: applicationId, archived: false },
    });

    if (!application) {
      throw new Error('application is not existed');
    } else if (!isSchoolAdmin) {
      if (application && application.applicationOwnerId !== userId) {
        throw new Error('You are not allowed to delete this application');
      }
    }
    const deleted = await tenantPrisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: {
        archived: true,
      },
    });

    await tenantPrisma.$disconnect();

    return deleted;
  };

  static getAppliedList = async (
    tenantPrisma: PrismaClient,
    {
      recruitmentId,
      page,
      limit,
    }: { recruitmentId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      recruitmentId: recruitmentId,
      archived: false,
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.recruitmentApplication.count({
        where: whereFilter,
      }),
      tenantPrisma.recruitmentApplication.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          applicationOwner: {
            include: {
              information: true,
            },
          },
        },
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalItems,
      items,
      itemPerPage: limit,
    };
  };
}
