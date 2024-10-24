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

export const findUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
  });

  return user;
};

export const validateVerificationToken = async (verificationToken: string) => {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: verificationToken,
    },
  });

  return user;
};

export const createUser = async (userData: any) => {
  const user = await prisma.user.create({ data: userData });

  return user;
};

export const updateUserData = async (
  userId: number,
  isVerified: boolean,
  verificationToken: string | null,
  verificationTokenExpired: Date | null
) => {
  const user = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data: {
      isVerified: isVerified,
      verificationToken: verificationToken,
      verificationTokenExpired: verificationTokenExpired,
    },
  });

  return user;
};

export const updateResetPasswordToken = async (
  userId: number,
  resetPasswordToken: string | null,
  resetPasswordTokenExpired: Date | null
) => {
  const user = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data: {
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpired: resetPasswordTokenExpired,
    },
  });

  return user;
};
