import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Choppi API')
    .setDescription('Choppi e-commerce API documentation')
    .setVersion('1.0')
    .addTag('products', 'Product operations')
    .addTag('stores', 'Store operations')
    .addTag('auth', 'Authentication operations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 4000}`);
  console.log(`Swagger documentation: http://localhost:${process.env.PORT ?? 4000}/api`);
}

bootstrap();
