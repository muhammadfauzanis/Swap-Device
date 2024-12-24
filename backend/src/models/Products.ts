import prisma from '../db';

export const findAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};
