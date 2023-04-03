import { PrismaClient } from '@prisma/client';
import AccessRequestService from './accessRequest.service';

const prisma = new PrismaClient();

describe('verifyAccount function', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should throw an error if there exists unapproved access request for user', async () => {
    const userId = '123';
    const accessLevel = 'ALUMNI';
    const fullName = 'John Smith';
    const gradeId = '456';
    const classId = '789';

    // create an unapproved access request
    await prisma.accessRequest.create({
      data: {
        userId,
        fullName,
        grade: {
          connect: {
            id: gradeId,
          },
        },
        alumClass: {
          connect: {
            id: classId,
          },
        },
        isApproved: false,
      },
    });

    // expect an Error to be thrown with a message containing 'existed access-request'
    await expect(
      AccessRequestService.verifyAccount(prisma, {
        userId,
        accessLevel,
        fullName,
        gradeId,
        classId,
      }),
    ).rejects.toThrowError('400 existed access-request');
  });

  it('should create a new access request if there is no unapproved access request for user', async () => {
    const userId = '456';
    const accessLevel = 'STUDENT';
    const fullName = 'Jane Doe';
    const gradeId = '101';
    const classId = '202';

    // expect no error to be thrown
    await expect(
      AccessRequestService.verifyAccount(prisma, {
        userId,
        accessLevel,
        fullName,
        gradeId,
        classId,
      }),
    ).resolves.not.toThrow();

    // check if the new access request is created
    const accessRequest = await prisma.accessRequest.findUnique({
      where: {
        userId,
      },
    });

    expect(accessRequest).toBeTruthy();
    expect(accessRequest!.fullName).toBe(fullName);
    expect(accessRequest!.gradeId).toBe(gradeId);
    expect(accessRequest!.classId).toBe(classId);
    expect(accessRequest!.isApproved).toBe(true);
  });
});
