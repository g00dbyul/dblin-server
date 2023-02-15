import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {User} from "./user.model";

@Injectable()
export class UserRepository {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) {}
    private manager = this.dataSource.createEntityManager();

    async create(did: string, privateKey: string, id: string) {
        return await this.manager.save(User, {did, privateKey, id});
    }

    async findByID(id: string): Promise<User|null> {
        return await this.manager.findOne(User, { where:  {id} });
    }
}