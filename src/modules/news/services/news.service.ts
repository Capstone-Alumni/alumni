import { Prisma, PrismaClient } from '@prisma/client';
import { getPageAndLimitFromParams } from 'src/utils';
import { CreateNewsProps, GetListNewParams, UpdateNewsProps } from '../types';

const isNewsExisted = async (tenantPrisma: PrismaClient, newsId: string) => {
  const whereFilter = {
    AND: [{ id: newsId }, { archived: false }],
  };
  const news = await tenantPrisma.news.findFirst({
    where: whereFilter,
  });

  if (!news) {
    throw new Error('News is not existed');
  }
};

export default class NewsService {
  static createNews = async (
    tenantPrisma: PrismaClient,
    authorId: string,
    body: CreateNewsProps,
  ) => {
    const newsCreated = await tenantPrisma.news.create({
      data: {
        ...body,
        author: {
          connect: { id: authorId },
        },
        tagsNews: {
          connectOrCreate: body.tagsNews?.map(tag => ({
            where: { tagName: tag },
            create: { tagName: tag },
          })),
        },
      },
    });

    await tenantPrisma.$disconnect();

    return newsCreated;
  };

  static updateNews = async (
    tenantPrisma: PrismaClient,
    newsId: string,
    body: UpdateNewsProps,
  ) => {
    await isNewsExisted(tenantPrisma, newsId);
    const news = await tenantPrisma.news.findFirst({
      where: { id: newsId },
      include: {
        tagsNews: true,
      },
    });

    if (
      news?.tagsNews &&
      body.tagsNews &&
      news?.tagsNews?.length > body.tagsNews?.length
    ) {
      const removeTags = news.tagsNews.filter(
        tag => !body.tagsNews?.includes(tag.tagName),
      );

      await tenantPrisma.news.update({
        where: { id: newsId },
        data: {
          tagsNews: {
            disconnect: removeTags.map(tag => ({
              id: tag.id,
            })),
          },
        },
        include: {
          tagsNews: true,
        },
      });
    }
    const newsUpdated = await tenantPrisma.news.update({
      where: { id: newsId },
      data: {
        ...body,
        tagsNews: {
          connectOrCreate: body.tagsNews?.map(tag => ({
            where: { tagName: tag },
            create: { tagName: tag },
          })),
        },
      },
      include: {
        tagsNews: true,
      },
    });

    await tenantPrisma.$disconnect();

    return newsUpdated;
  };

  static deleteNews = async (tenantPrisma: PrismaClient, newsId: string) => {
    await isNewsExisted(tenantPrisma, newsId);
    const newsUpdated = await tenantPrisma.news.update({
      where: { id: newsId },
      data: {
        archived: true,
      },
    });

    await tenantPrisma.$disconnect();

    return newsUpdated;
  };

  static getNewsByNewsId = async (
    tenantPrisma: PrismaClient,
    newsId: string,
  ) => {
    await isNewsExisted(tenantPrisma, newsId);
    const news = await tenantPrisma.news.findFirst({
      where: { id: newsId },
      include: {
        author: {
          include: {
            information: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
        tagsNews: true,
      },
    });

    await tenantPrisma.$disconnect();

    return news;
  };

  static getListNews = async (
    tenantPrisma: PrismaClient,
    params: GetListNewParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const { title, content } = params;
    const whereFilter = {
      AND: [
        { title: { contains: title } },
        { content: { contains: content } },
        { archived: false },
      ],
    };
    const [totalNewsItem, newsItems] = await tenantPrisma.$transaction([
      tenantPrisma.news.count({
        where: whereFilter,
      }),
      tenantPrisma.news.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          author: {
            select: {
              id: true,
              information: {
                select: {
                  id: true,
                  fullName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          tagsNews: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalNewsItem,
      items: newsItems,
      itemPerPage: limit,
    };
  };

  static getListNewsPublic = async (
    tenantPrisma: PrismaClient,
    params: GetListNewParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const { title, content } = params;
    const whereFilter: Prisma.NewsWhereInput = {
      AND: [
        { title: { contains: title, mode: 'insensitive' } },
        { content: { contains: content, mode: 'insensitive' } },
        { archived: false },
        { isPublic: true },
      ],
    };
    const [totalNewsItem, newsItems] = await tenantPrisma.$transaction([
      tenantPrisma.news.count({
        where: whereFilter,
      }),
      tenantPrisma.news.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          author: {
            select: {
              id: true,
              information: {
                select: {
                  id: true,
                  fullName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          tagsNews: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalNewsItem,
      items: newsItems,
      itemPerPage: limit,
    };
  };

  static getNewsDetailsPublic = async (
    tenantPrisma: PrismaClient,
    newsId: string,
  ) => {
    await isNewsExisted(tenantPrisma, newsId);
    const news = await tenantPrisma.news.findFirst({
      where: { id: newsId, isPublic: true },
      include: {
        author: {
          select: {
            id: true,
            information: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
              },
            },
          },
        },
        tagsNews: true,
      },
    });

    await tenantPrisma.$disconnect();

    return news;
  };

  static getListTags = async (tenantPrisma: PrismaClient) => {
    const tags = await tenantPrisma.tagsNews.findMany({
      where: { archived: false },
    });

    await tenantPrisma.$disconnect();

    return tags;
  };
}
