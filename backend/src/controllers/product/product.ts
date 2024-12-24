import express from 'express';
import response from '../../response';
import { findAllProducts } from '../../models/Products';

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await findAllProducts();

    return response(200, products, 'Success get all products', res);
  } catch (error) {
    console.log(error);
    return response(500, null, 'Error when get all products', res);
  }
};
