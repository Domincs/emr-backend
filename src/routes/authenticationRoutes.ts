import Router from 'koa-router';
import { Context } from 'koa';
import { sendResponse, StatusCode } from '../common/response';
import { AuthenticationService } from '../modules/authentication/services';
import { PrismaClient } from '@prisma/client';

// Define interface for user registration data
interface UserRegistrationData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  // Add more properties as needed
}

interface UserProfileUpdateData {
  username?: string;
  password?: string;
  email?: string;
  // Add more properties as needed
}

const router = new Router();

const prisma = new PrismaClient();

router.post('/register', async (ctx: Context) => {
  try {
    const userData = ctx.request.body as UserRegistrationData; // Use defined interface
    const user = await prisma.user.create({ data: userData });
    sendResponse(ctx, { status: StatusCode.Created, data: user });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.ServerError, message: (error as Error).message });
  }
});

router.post('/login', async (ctx: Context) => {
  try {
    const { username, password } = ctx.request.body as { username: string; password: string }; // Define inline type
    const token = await AuthenticationService.login(username, password);
    console.log('Token:', token);
    sendResponse(ctx, { status: StatusCode.Success, data: { token } });
  } catch (error) {
    console.error(error);
    sendResponse(ctx, { status: StatusCode.Unauthorized, message: (error as Error).message });
  }
});

router.put('/profile/:userId', async (ctx: Context) => {
  try {
    const userId = parseInt(ctx.params.userId);
    const userData = ctx.request.body as UserProfileUpdateData;
    const updatedUser = await prisma.user.update({ where: { id: userId }, data: userData });
    sendResponse(ctx, { status: StatusCode.Success, data: updatedUser });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.Unauthorized, message: (error as Error).message });
  }
});

router.put('/permissions/:userId', async (ctx: Context) => {
  try {
    const userId = parseInt(ctx.params.userId);
    const { permissionGroupId } = ctx.request.body as { permissionGroupId: number[] }; // Define inline type
    await prisma.user.update({
      where: { id: userId },
      data: {
        permissionGroups: {
          connect: permissionGroupId.map((id: number) => ({ id }))
        }
      }
    });
    sendResponse(ctx, { status: StatusCode.Success, message: 'Permissions set successfully' });
  } catch (error) {
    sendResponse(ctx, { status: StatusCode.Unauthorized, message: (error as Error).message });
  }
});

export default router;
