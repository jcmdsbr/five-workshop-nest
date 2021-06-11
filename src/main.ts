import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  await app.listen(3000);
}

const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Five Bank APIs')
    .setDescription('Exemplo do swagger para apis')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, doc);
};
bootstrap();
