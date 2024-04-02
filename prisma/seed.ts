// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const admin = await prisma.permissionGroup.create({
            data: {
            name: 'admin',
            description: 'Administrator group',
            },
        });
        console.log(admin)
    } catch (error) {
        console.error(error);
    }

  const result = await prisma.user.create({
    data: {
      username: 'superadmin',
      firstName: 'Admin',
      lastName: 'User',
      password: 'password123',
      email: 'superadmin@example.com',
      permissionGroups: {
        connect: {
          name: 'admin',
        },
      },
    },
  });
  console.log(result)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
