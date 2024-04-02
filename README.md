npx prisma migrate dev --name add-default-user 
npx prisma migrate deploy
npx prisma generate

my-app/ ├── src/ │ ├── common/ │ │ └── logger.ts │ ├── config/ │ │ ├── index.ts
│ │ └── database.ts │ ├── middleware/ │ │ └── authMiddleware.ts │ ├── errors/ │
│ └── errorHandler.ts │ ├── modules/ │ │ ├── authentication/ │ │ │ ├──
controller.ts │ │ │ ├── service.ts │ │ │ └── repository.ts │ │ ├──
userManagement/ │ │ │ ├── controller.ts │ │ │ ├── service.ts │ │ │ └──
repository.ts │ │ └── otherModule/ │ │ ├── controller.ts │ │ ├── service.ts │ │
└── repository.ts │ ├── routes/ │ │ ├── authenticationRoutes.ts │ │ ├──
userManagementRoutes.ts │ │ └── otherModuleRoutes.ts │ ├── app.ts │ └── index.ts
├── tests/ │ ├── unit/ │ └── integration/ ├── package.json └── tsconfig.json
