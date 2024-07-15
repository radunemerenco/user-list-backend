import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';
import { PaginatedResults } from '../types/express';


export const paginate = (model: Model<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let { page, limit } = req.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;

    const count = await model.count();
    const results: PaginatedResults<any> = {
      results: [],
      count,
    };

    if (endIndex < count) {
      results.next = {
        page: pageNumber + 1,
        limit: limitNumber,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: pageNumber - 1,
        limit: limitNumber,
      };
    }

    try {
      results.results = await model.findAll({
        offset: startIndex,
        limit: limitNumber,
      });
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: 'Error occurred while paginating results' });
    }
  };
};
