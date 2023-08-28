import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de opciones de CORS
  const corsOptions = {
    origin: 'http://localhost:3001', // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir cookies y encabezados de autenticación
  };

  // Habilitar CORS con las opciones
  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
