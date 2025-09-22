import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const version = String(process.env.npm_package_version);

  const config = new DocumentBuilder()
    .setVersion(version)
    .setTitle('AI Daily Speech Maker')
    .setDescription(
      'Know exactly what you did at given day and what to say at daily meetings',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.MATERIAL),
  };
  SwaggerModule.setup('api', app, documentFactory, options);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
