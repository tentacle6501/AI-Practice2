import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
export const findAll = async () => {
    return await prisma.user.findMany();
};
export const findById = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};
export const create = async (data) => {
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
        data: createData,
    });
};
export const update = async (id, data) => {
    return await prisma.user.update({
        where: { id },
        data: data,
    });
};
export const remove = async (id) => {
    return await prisma.user.delete({
        where: { id },
    });
};
