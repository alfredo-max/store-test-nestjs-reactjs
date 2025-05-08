import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './modules/product/product.module';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductEntity } from './modules/product/infrastructure/adapters/outbound/persistence/entities/product.entity';
import { PaymentModule} from './modules/payment/payment.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV ?? 'local'}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
    
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          entities: [ProductEntity],
          synchronize: true,
          ssl: configService.get<string>('DB_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : false,
        };
      },
    }),
    ProductoModule,
    PaymentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
