import { PrismaClient } from '@prisma/client';
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
        authorId: authorId,
      },
    });
    return newsCreated;
  };

  static updateNews = async (
    tenantPrisma: PrismaClient,
    newsId: string,
    body: UpdateNewsProps,
  ) => {
    await isNewsExisted(tenantPrisma, newsId);

    const newsUpdated = await tenantPrisma.news.update({
      where: { id: newsId },
      data: body,
    });

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

    return newsUpdated;
  };

  static getNewsByNewsId = async (
    tenantPrisma: PrismaClient,
    newsId: string,
  ) => {
    await isNewsExisted(tenantPrisma, newsId);
    const news = await tenantPrisma.news.findFirst({
      where: { id: newsId },
    });
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
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
    ]);
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
    const whereFilter = {
      AND: [
        { title: { contains: title } },
        { content: { contains: content } },
        { archived: false },
        // { isPublic: true },
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
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
    ]);
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
    });
    return news;
  };
}
