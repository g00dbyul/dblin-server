import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {Board} from "./board.entity";

@Injectable()
export class BoardRepository {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ) {}
    private manager = this.dataSource.createEntityManager();

    async create(category: string, title: string, content: string): Promise<Board> {
        return await this.manager.save(Board, {category, title, content});
    }

    // async getAll(): Promise<Board[]> {
    //
    // }

    async findByUUID(uuid: string): Promise<Board|null> {
        return await this.manager.findOne(Board, {where: { uuid } });
    }

    async delete(uuid: string) {
        return await this.manager.softDelete(Board, { uuid });
    }

    async update(board: Board, options:{ category?: string, title?: string, content?: string } ) {
        return await this.manager.save(Board, { ...board, ...options });
    }
}