import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerConfigModule } from './common/config/config.module';
import {DatabaseModule} from "./shared/database/database.module";
import {ServerConfigService} from "./common/config/server-config.service";
import {BoardModule} from "./domain/boards/board.module";
import {InfraDIDModule} from "./shared/infraDID/infraDID.module";
import {UserModule} from "./domain/user/user.module";

@Module({
    imports: [
        ServerConfigModule,
        DatabaseModule.forRootAsync({
            inject: [ServerConfigService],
            useFactory: (configService: ServerConfigService) => configService.typeOrmConfig
        }),
        BoardModule,
        InfraDIDModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
