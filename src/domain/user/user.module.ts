import {Module} from "@nestjs/common";
import {userController} from "./user.controller";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {InfraDIDModule} from "../../shared/infraDID/infraDID.module";

@Module({
    imports: [InfraDIDModule],
    controllers: [userController],
    providers: [UserService, UserRepository]
})
export class UserModule {}