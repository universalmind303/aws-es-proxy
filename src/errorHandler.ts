import {Request, Response} from "express";

const handlers = {
  [401]: (res: Response, err: Error) => {
    res.json(err).end();
  },
  [500]: (res: Response, err: Error) => res.status(500).json(err.message).end(),
};

export const errorHandler = (err: Error, req: Request, res: Response) => {
  const handler = handlers[res.statusCode] || handlers[500];
  return handler(res, err);
};
