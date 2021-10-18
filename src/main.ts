import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle("Rest Api For VuejsTime")
    .setDescription("swagger api ")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/", app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
