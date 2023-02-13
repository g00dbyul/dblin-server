import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {BoardService} from "./board.service";
import {CreateBoardDTO} from "./create.board.dto";
import {UpdateBoardDTO} from "./update.board.dto";

@Controller('/boards')
export class BoardController {
    constructor(private readonly boardService :BoardService) {}

    @Get()
    findAll() {
        return this.boardService.findAll();
    }

    @Get(':uuid')
    async findByUUID(@Param('uuid') uuid: string) {
        const result = await this.boardService.findByUUID(uuid);
        if(result) {
            return result;
        } else {
            return { result: 'NotFound' };
        }
    }

    @Post()
    async create(@Body() createBoardDTO: CreateBoardDTO) {
        return await this.boardService.create(createBoardDTO.category, createBoardDTO.title, createBoardDTO.content);
    }

    @Delete(':uuid')
    async deleteByUUID(@Param('uuid') uuid: string) {
        return await this.boardService.deleteByUUID(uuid);
    }

    @Patch(':uuid')
    async updateByUUID(@Param('uuid') uuid: string, @Body() updateBoardDTO: UpdateBoardDTO) {
        return await this.boardService.updateByUUID(uuid, updateBoardDTO);
    }
}