import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-session';
import Router from 'koa-router'; // Import Koa router
import authenticationRoutes from './routes/authenticationRoutes';
import swaggerJSDoc from 'swagger-jsdoc';

const app = new Koa();
const router = new Router(); // Create a Koa router
const port = process.env.PORT || 3000;

// Session configuration
app.keys = ['your-secret-key']; // Set session keys
app.use(session(app));

// Initialize Passport.js and restore authentication state if available
app.use(passport.initialize());
app.use(passport.session());

// Parse request body using koa-bodyparser middleware
app.use(bodyParser());

// Authentication routes
router.use('/auth', authenticationRoutes.routes()); // Use the routes defined in authenticationRoutes

// Swagger API documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./routes/authenticationRoutes.ts'], // Specify the path to your route files
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger JSON
router.get('/swagger.json', async (ctx) => {
  ctx.body = swaggerSpec;
});

// Mount the router
app.use(router.routes());

// Serve Swagger UI
app.use(async (ctx, next) => {
  if (ctx.path === '/api-docs') {
    ctx.response.redirect(`/api-docs?url=/swagger.json`);
  } else if (ctx.path === '/swagger-ui') {
    ctx.response.redirect(`https://your-swagger-ui-url`);
  } else {
    await next();
  }
});

// Error handling middleware
app.on('error', err => {
  console.error('Server error:', err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
