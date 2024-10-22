import prisma from '../db';

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

export const findUserByPhoneNumber = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: {
      phone_number: phoneNumber,
    },
  });

  return user;
};

export const createUser = async (userData: any) => {
  const user = await prisma.user.create({ data: userData });

  return user;
};
