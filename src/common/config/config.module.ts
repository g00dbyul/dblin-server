import { Global, Module } from "@nestjs/common";
import { ServerConfigService } from "./server-config.service";
import { ConfigModule } from "@nestjs/config";


@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`
        })
    ],
    providers: [ServerConfigService],
    exports: [ConfigModule, ServerConfigService]
})
export class ServerConfigModule {}
