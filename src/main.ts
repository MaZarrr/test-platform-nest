import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
dotenv.config();

const optionsCors = {
  origin: "*",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors(optionsCors);
  await app.listen(5000, '0.0.0.0');
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// // import { ValidationPipe } from '@nestjs/common';

// const optionsCors = {
//   origin: "*",
//   allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 200
// };

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors(optionsCors);
//   await app.listen(3000, '0.0.0.0');
// }
// bootstrap();  

// app.useGlobalPipes(new ValidationPipe());
// app.use(cookieParser());
// app.use(cors(optionsCors));


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
