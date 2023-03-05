import { Resolver, Query } from "@nestjs/graphql";
import { BoardService } from "./board.service";

@Resolver()
export class BoardResolver{
    constructor(private readonly boardService: BoardService)   {} 

    @Query(()=>String)
    getHello(){
        return this.boardService.aaa()
    }

    
}