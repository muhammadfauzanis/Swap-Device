import express from 'express';

const response = (
  statusCode: number,
  data: any,
  message: string,
  res: express.Response
) => {
  res.status(statusCode).json({
    status: statusCode,
    data,
    message,
  });
};

export default response;
