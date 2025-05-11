import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

jest.mock('@nestjs/core');

describe('bootstrap', () => {
  let mockApp: any;
  let mockConfigService: any;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'CORS_ORIGIN') return 'http://localhost:3000';
        if (key === 'PORT') return 4000;
      }),
    };

    mockApp = {
      get: jest.fn(() => mockConfigService),
      enableCors: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('should create the app and set up CORS and listen on the configured port', async () => {
    const { bootstrap } = await import('./main');

    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(mockApp.get).toHaveBeenCalledWith(ConfigService);
    expect(mockApp.enableCors).toHaveBeenCalledWith({
      origin: 'http://localhost:3000',
    });
    expect(mockApp.listen).toHaveBeenCalledWith(4000);
  });

  it('should fallback to default port if not set', async () => {
    mockConfigService.get = jest.fn((key: string) => {
      if (key === 'CORS_ORIGIN') return 'http://localhost:3000';
      if (key === 'PORT') return undefined;
    });

    const { bootstrap } = await import('./main');

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });
});
