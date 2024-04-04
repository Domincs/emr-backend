import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { PermissionGroup } from './interfaces';

const prisma = new PrismaClient();

export const AuthenticationService = {
  login: async (username: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: username },
            include: {
                permissionGroups: { include: { permissions: true } }
            }
        });

        if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
        }

        const { id, firstName, lastName, email } = user;

        const permissions = user.permissionGroups?.map((permissionGroup: PermissionGroup) => ({
            groupName: permissionGroup.name,
            permissions: permissionGroup.permissions?.map(permission => permission.name)
        }));

        const token = sign({ userId: id }, process.env.AUTH_TOKEN, { expiresIn: '1h' });

        return { token, id, permissions, firstName, lastName, email };
    } catch (error) {
        console.log(error);
        throw new Error('Error logging in');
    }
  },
};
