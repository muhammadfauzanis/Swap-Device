import prisma from '../db';

export const findAllCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

export const findCategoryByName = async (categoryName: string) => {
  const category = await prisma.category.findFirst({
    where: {
      category_name: categoryName,
    },
  });

  return category;
};
