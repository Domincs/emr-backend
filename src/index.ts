import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-session';
import Router from 'koa-router';
import cors from '@koa/cors'; // Import CORS middleware
import authenticationRoutes from './routes/authenticationRoutes';
import swaggerJSDoc from 'swagger-jsdoc';
import drugsRoutes from './routes/drugsRoutes';
import inventoryRoutes from './routes/inventoryRoutes';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 8000;

dotenv.config();

// CORS middleware
app.use(cors());

// Session configuration
app.keys = ['ifuifdfusosufnsoufnsoso'];
app.use(session(app));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser());

router.use('/auth', authenticationRoutes.routes());
router.use('', drugsRoutes.routes());
router.use('', inventoryRoutes.routes());

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
  apis: ['./routes/authenticationRoutes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.get('/swagger.json', async (ctx) => {
  ctx.body = swaggerSpec;
});

app.use(router.routes());

app.use(async (ctx, next) => {
  if (ctx.path === '/api-docs') {
    ctx.response.redirect(`/api-docs?url=/swagger.json`);
  } else if (ctx.path === '/swagger-ui') {
    ctx.response.redirect(`https://your-swagger-ui-url`);
  } else {
    await next();
  }
});

app.on('error', err => {
  console.error('Server error:', err);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
