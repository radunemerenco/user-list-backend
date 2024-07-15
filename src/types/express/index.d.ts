export interface PaginatedResults<T> {
  previous?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
  results: T[];
  count: number;
}


declare global {
  namespace Express {
    interface Response {
      paginatedResults?: PaginatedResults<any>;
    }
  }
}
