import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";
import { Board } from "../../domain/boards/board.entity";


@Injectable()
export class ServerConfigService {
    constructor(private readonly configService: ConfigService) {}

    get nodeEnv(): string {
        return this.getString('NODE_ENV');
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    }

    get isTest(): boolean {
        return this.nodeEnv === 'test';
    }

    private get(key: string): string {
        const value = this.configService.get<string>(key);
        if (!value) {
            throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
        }
        return value;
    }

    private getNumber(key: string): number {
        const value = this.get(key);
        try {
            return Number(value);
        } catch {
            throw new Error(key + ' environment variable is not a number');
        }
    }

    private getBoolean(key: string): boolean {
        const value = this.get(key);
        try {
            return Boolean(JSON.parse(value));
        } catch {
            throw new Error(key + ' env var is not a boolean');
        }
    }

    private getString(key: string): string {
        const value = this.get(key);
        return value.replace(/\\n/g, '\n');
    }

    get typeOrmConfig(): DataSourceOptions {
        return {
            type: 'mysql',
            host: this.get('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            username: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
            synchronize: true,
            entities: [Board]
        }
    }
}