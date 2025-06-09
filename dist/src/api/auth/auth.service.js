import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export const register = async (data) => {
    const { name, username, email, password, phone, website, address, company } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createData = {
        name,
        username,
        email,
        password: hashedPassword,
        phone,
        website,
    };
    if (address) {
        createData.address = {
            create: {
                ...address,
                geo: {
                    create: address.geo,
                },
            },
        };
    }
    if (company) {
        createData.company = {
            create: company,
        };
    }
    return await prisma.user.create({
        data: createData,
    });
};
export const login = async (data) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', {
        expiresIn: '1h',
    });
    return { user, token };
};
