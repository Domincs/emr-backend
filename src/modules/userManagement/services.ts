// src/modules/userManagement/service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  // Add any additional fields here
}

export const UserService = {
  createUser: async (userData: UserData) => {
    try {
      const user = await prisma.user.create({ data: userData });
      return user;
    } catch (error) {
      throw new Error('Error creating user');
    }
  },
  updateProfile: async (userId: number, userData: UserData) => {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: userData,
      });
      return user;
    } catch (error) {
      throw new Error('Error updating profile');
    }
  },
  // setPermission: async (userId: number, permissionGroupId: number) => {
  //   try {
  //     // Logic to associate user with permission group
  //     // You would use Prisma's generated methods to establish the relation
  //   } catch (error) {
  //     throw new Error('Error setting permission');
  //   }
  // },
};
