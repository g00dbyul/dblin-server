import {Injectable} from "@nestjs/common";
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";

@Injectable()
export class BoardService {
    constructor(private readonly boardRepository: BoardRepository) {}

    async findAll() {
        return await this.boardRepository.findAll();
    }

    async findByUUID(uuid: string):Promise<Board|null> {
        return await this.boardRepository.findByUUID(uuid);
    }

    async findByCategory(category: string):Promise<Board|null> {
        return await this.boardRepository.findByCategory(category);
    }

    async create(category: string, userDID: string, title: string, content: string): Promise<Board> {
        return await this.boardRepository.create(category, userDID, title, content);
    }

    async deleteByUUID(uuid: string) {
        const board = await this.boardRepository.findByUUID(uuid);
        if(board) {
            await this.boardRepository.delete(uuid);
            return { result: true };
        } else {
            return {result: 'NotExist'};
        }
    }

    // @ts-ignore
    async updateByUUID(uuid: string, options: { category?: string; title?: string; content?: string }) {
        const board = await this.boardRepository.findByUUID(uuid);
        if(board) {
            return await this.boardRepository.update(board, options);
        } else {
            return {result: 'NotExist'};
        }
    }
}