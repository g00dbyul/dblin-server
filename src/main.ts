import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
// import * as swaggerDocument from 'src/common/document/swagger/swagger.json';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // SwaggerModule.setup('api-doc', app, swaggerDocument as OpenAPIObject);

    await app.listen(3000);
}
bootstrap();
