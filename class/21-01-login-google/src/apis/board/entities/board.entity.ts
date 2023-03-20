import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql"

@Entity()
@ObjectType() // graphql type 만들기위함.
export class Board{
    @PrimaryGeneratedColumn("increment")
    @Field(()=>Int)
    number:number

    @Column()
    @Field(()=>String)
    writer:string

    @Column()
    @Field(()=>String)
    title:string

    @Column()
    @Field(()=>String)
    contents:string
}