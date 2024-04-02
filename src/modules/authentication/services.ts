import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { PermissionGroup } from './interface';

const prisma = new PrismaClient();

export const AuthenticationService = {
  login: async (username: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({ 
        where: { username },
        include: { permissionGroups: { include: { permissions: true } } } // Include permission groups and their associated permissions
      });
      
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }

      const permissions = user.permissionGroups?.map((permissionGroup: PermissionGroup) => ({
        groupName: permissionGroup.name,
        permissions: permissionGroup.permissions?.map(permission => permission.name)
      }));

      const token = sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

      return { token, permissions };
    } catch (error) {
      throw new Error('Error logging in');
    }
  },
};
