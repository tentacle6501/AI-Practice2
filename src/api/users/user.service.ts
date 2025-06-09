import { PrismaClient } from '@prisma/client';
import { UserCreateInput, UserUpdateInput } from './user.validation.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const findAll = async () => {
  return await prisma.user.findMany();
};

export const findById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const create = async (data: UserCreateInput) => {
  const { name, username, email, password, phone, website } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const createData = {
    name,
    username,
    email,
    password: hashedPassword,
    phone,
    website,
  };

  return await prisma.user.create({
    data: createData as any,
  });
};

export const update = async (id: number, data: UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data: data as any,
  });
};

export const remove = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};
