#!/bin/bash

# Array of service names
services=("enrollment" "billing" "payments-adapter" "notifications" "ussd-sms" "degree-audit-stub")

for service in "${services[@]}"; do
  echo "Creating service: $service"
  
  # Create package.json
  cat > "services/$service/package.json" << EOL
{
  "name": "@et-univ/$service",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/node": "^20.3.1",
    "typescript": "^5.1.3"
  }
}
EOL

  # Create src directory
  mkdir -p "services/$service/src"
  
  # Create main.ts
  cat > "services/$service/src/main.ts" << EOL
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(\`🚀 $service service running on http://localhost:\${port}\`);
}
bootstrap();
EOL

  # Create app.module.ts
  cat > "services/$service/src/app.module.ts" << EOL
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
EOL

  # Create app.controller.ts
  cat > "services/$service/src/app.controller.ts" << EOL
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }
}
EOL

  # Create app.service.ts
  cat > "services/$service/src/app.service.ts" << EOL
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: '$service',
      version: '0.1.0',
    };
  }
}
EOL

  echo "✅ Created $service service"
done

echo "🎉 All services created successfully!"
