import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Choppi API')
    .setDescription('Choppi e-commerce API documentation')
    .setVersion('1.0')
    .addTag('products', 'Product operations')
    .addTag('stores', 'Store operations')
    .addTag('auth', 'Authentication operations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.init();
  return app;
}

export default async (req: any, res: any) => {
  const app = await createApp();
  const server = app.getHttpAdapter().getInstance();

  return server(req, res);
};

async function runLocal() {
  const app = await createApp();
  const port = process.env.PORT || 4000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/documentation`);
}

if (process.env.VERCEL_ENV === undefined) {
  runLocal();
}
