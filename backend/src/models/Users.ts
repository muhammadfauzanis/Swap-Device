import prisma from '../db';

const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const findUserByPhoneNumber = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: {
      phone_number: phoneNumber,
    },
  });

  return user;
};

const createUser = async (userData: any) => {
  const user = await prisma.user.create({ data: userData });

  return user;
};

export default { findUserByEmail, findUserByPhoneNumber, createUser };
