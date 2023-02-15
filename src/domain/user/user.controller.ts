import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('/users')
export class userController {
    constructor(private readonly userService: UserService) {}

    @Post(':id')
    async create(@Param('id') id: string) {
        const result = await this.userService.create(id);
        return { result };
    }

    @Get(':id')
    async findByID(@Param('id') id: string) {
        const result = await this.userService.findByID(id);
        if(result) {
            return { result };
        } else {
            return { result: 'NotFound' };
        }
    }

}