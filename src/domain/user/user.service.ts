import {Injectable} from "@nestjs/common";
import {InfraDIDService} from "../../shared/infraDID/infraDID.service";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly infraDIDService: InfraDIDService,
        private readonly userRepository: UserRepository
    ) {}

    async create(id: string) {
        const did = this.infraDIDService.generateInfraDID('01');
        return await this.userRepository.create(did.did, did.privateKey, id);
    }

    async findByID(id: string) {
        return await this.userRepository.findByID(id);
    }

}