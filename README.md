##Configuration
1. Create a database table called `emr_db`
2. Create a .env file and add the following variable and update the values as required
`
DATABASE_URL="postgresql://postgres:admin@localhost:5432/emr_db?schema=public"
AUTH_TOKEN="your-auth-token"
`
3. Run initial migrations:
`
npx prisma migrate dev --name initial-migrations 
npx prisma migrate deploy
npx prisma generate
`
4. Run the command to create a default user
    `npm run seed`
    The default email is `superadmin@example.com`
    Password is `password123`

5. Start the app by `npm run dev`

