import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

const optionsCors = {
  origin: "*",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(optionsCors);
  // app.useGlobalPipes(new ValidationPipe());
  // app.use(cookieParser());
  // app.use(cors(optionsCors));
  await app.listen(3000);
}
bootstrap();  


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
