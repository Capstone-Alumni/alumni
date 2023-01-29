import { prisma } from '@lib/prisma/prisma';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import { getPageAndLimitFromParams } from 'src/utils';

const isNewsExisted = async (newsId: string) => {
  const whereFilter = {
    AND: [{ id: newsId }, { archived: false }],
  };
  const news = await prisma.news.findFirst({
    where: whereFilter,
  });

  if (!news) {
    throw new Error('News is not existed');
  }
};

export default class NewsService {
  static createNews = async (authorId: string, body: any) => {
    const newsCreated = await prisma.news.create({
      data: {
        ...body,
        authorId: authorId,
      },
    });
    return newsCreated;
  };

  static updateNews = async (newsId: string, body: any) => {
    await isNewsExisted(newsId);

    const newsUpdated = await prisma.news.update({
      where: { id: newsId },
      data: body,
    });

    return newsUpdated;
  };

  static deleteNews = async (newsId: string) => {
    await isNewsExisted(newsId);
    const newsUpdated = await prisma.news.update({
      where: { id: newsId },
      data: {
        archived: true,
      },
    });

    return newsUpdated;
  };

  static getNewsByNewsId = async (newsId: string) => {
    await isNewsExisted(newsId);
    const news = await prisma.news.findFirst({
      where: { id: newsId },
    });
    return news;
  };

  static getListNews = async (params: any) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const { title, content } = params;
    const whereFilter = {
      AND: [
        { title: { contains: title } },
        { content: { contains: content } },
        { archived: false },
      ],
    };
    const [totalNewsItem, newsItems] = await prisma.$transaction([
      prisma.news.count({
        where: whereFilter,
      }),
      prisma.news.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
      }),
    ]);
    return {
      totalItems: totalNewsItem,
      items: newsItems,
      itemPerPage: limit,
    };
  };
}
