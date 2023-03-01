import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  try {
    const PORT = process.env.PORT

    const appOptions = {cors: true}

    const app = await NestFactory.create(AppModule, appOptions);
    app.setGlobalPrefix('api')
    
    await app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
