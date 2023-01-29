import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import NewsService from '../services/news.service';

export default class NewsController {
  static createNews = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const authorId = req.user.id;
      const newsCreated = await NewsService.createNews(authorId, req.body);
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
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const listNews = await NewsService.getListNews(req.query);
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
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const newsUpdated = await NewsService.updateNews(id as string, req.body);
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
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const newsDeleted = await NewsService.deleteNews(id as string);
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
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const news = await NewsService.getNewsByNewsId(id as string);
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
