import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import NewsService from '../services/news.service';
import { GetListNewParams } from '../types';

export default class NewsController {
  static createNews = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);

      const authorId = req.user.id;
      const newsCreated = await NewsService.createNews(
        prisma,
        authorId,
        req.body,
      );
      return res.status(201).json({
        status: true,
        data: newsCreated,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getListNews = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const listNews = await NewsService.getListNews(
        prisma,
        req.query as unknown as GetListNewParams,
      );
      return res.status(200).json({
        status: true,
        data: listNews,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static updateNews = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const newsUpdated = await NewsService.updateNews(
        prisma,
        id as string,
        req.body,
      );
      return res.status(200).json({
        status: true,
        data: newsUpdated,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static deleteNews = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const newsDeleted = await NewsService.deleteNews(prisma, id as string);
      return res.status(200).json({
        status: true,
        data: newsDeleted,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getNewsById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const news = await NewsService.getNewsByNewsId(prisma, id as string);
      return res.status(200).json({
        status: true,
        data: news,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getListNewsPublic = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const listNews = await NewsService.getListNewsPublic(
        prisma,
        req.query as unknown as GetListNewParams,
      );
      return res.status(200).json({
        status: true,
        data: listNews,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getNewsDetailsPublic = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const news = await NewsService.getNewsDetailsPublic(prisma, id as string);
      return res.status(200).json({
        status: true,
        data: news,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
}
