import { Query } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ProductCategory } from "./entities/productCategory.entity";
import { ProductCategoryService } from "./productCategory.service";

@Resolver()
export class ProductCategoryResolver{
    constructor(
        private readonly productCategoryService:ProductCategoryService
    ){} 



    @Mutation(()=>ProductCategory)
    createProductCategory(
        @Args("name") name:string,
 
    ){
        // DB 카테고리 등록
        return this.productCategoryService.create({name})   
    }
}