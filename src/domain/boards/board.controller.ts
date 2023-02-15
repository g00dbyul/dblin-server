import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {BoardService} from "./board.service";
import {CreateBoardDTO} from "./create.board.dto";
import {UpdateBoardDTO} from "./update.board.dto";

@Controller('/boards')
export class BoardController {
    constructor(private readonly boardService :BoardService) {}

    @Get()
    async findAll() {
        const result = await this.boardService.findAll();
        if(result.length) {
            return { result };
        } else {
            return { result: 'NotFound' };
        }
    }

    @Get(':uuid')
    async findByUUID(@Param('uuid') uuid: string) {
        const result = await this.boardService.findByUUID(uuid);
        if(result) {
            return { result };
        } else {
            return { result: 'NotFound' };
        }
    }

    @Get()
    async findByCategory(@Query('category') category: string) {
        const result = await this.boardService.findByCategory(category);
        if(result) {
            return { result };
        } else {
            return { result: 'NotFound' };
        }
    }

    @Post()
    async create(@Body() createBoardDTO: CreateBoardDTO) {
        const result = await this.boardService.create(createBoardDTO.category, createBoardDTO.userDID, createBoardDTO.title, createBoardDTO.content);
        return { result };
    }

    @Delete(':uuid')
    async deleteByUUID(@Param('uuid') uuid: string) {
        const result = await this.boardService.deleteByUUID(uuid);
        return { result };
    }

    @Patch(':uuid')
    async updateByUUID(@Param('uuid') uuid: string, @Body() updateBoardDTO: UpdateBoardDTO) {
        const result = await this.boardService.updateByUUID(uuid, updateBoardDTO);
        return { result };
    }
}