import { Injectable, HttpException, HttpStatus, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";


@Injectable()
export class ProductService{
        constructor(
            @InjectRepository(Product)
            private readonly productRepository:Repository<Product>
        ){}

    async findAll(){
        return await this.productRepository.find()
    }

    async findOne({productId}){
        return await this.productRepository.findOne({where: {id:productId}})
    }


    async create({createProductInput}){
        const result = await this.productRepository.save({
            ...createProductInput,
            // name: createProductInput.name,
            // description: createProductInput.description,
            // price:createProductInput.price
        })
        return result
    }

    // repository.save 의 경우, 생성과 업데이트를 둘다 담당
    // 이미 있으면 업데이트, 아니면 생성하는 원리
    async update({productId, updateProductInput}){
        const myproduct = await this.productRepository.findOne({
            where:{id:productId},
        })
        
        const newProduct = {
            ...myproduct,
            id: productId,
            ...updateProductInput,
        }
        
        return await this.productRepository.save(newProduct)
    }

    async checkSoldOut({productId}){
        const product = await this.productRepository.findOne({
            where:{id:productId}
        });

        if(product.isSoldout){
            throw new UnprocessableEntityException("이미 판매 완료된 상품");
        }

        // if(product.isSoldOut){
        //     throw new HttpException(
        //         "이미 판매 완료된 상품",
        //          HttpStatus.UNPROCESSABLE_ENTITY
        //          )
        // }
    }

    async delete({productId}){
        // 1. 실제 삭제
        // const result = await this.productRepository.delete({
        //     id : productId
        // })
        // return result.affected? true:false;

        // 2. 소프트 삭제(직접 구현) - isDeleted
        // 실제 삭제는, 바로 db에 삭제 안함.
        // isDeleted 컬럼을 true로 바꾸는 것.
        // 다른 api에서 데이터 보여줄 때, isDeleted가 false 인 것만 보여줘야 함.
        // this.productRepository.update({id:productId},{isDeleted:true})


        // 3. 소프트 삭제(직접 구현) - deletedAt
        // this.productRepository.update({id:productId},{deletedAt: new Date()})


        // 4. 소프트 삭제(TypeORM 제공) - softRemove
        // 얘를 쓰면, 다른 api에서 delete 관련 컬럼을 거르고 써야하는데
        // 이거 쓰면, 다른 api를 따로 수정 안해도됨. deletedAt 들어가있는 컬럼은 알아서 안가져옴.
        // this.productRepository.softRemove({ id:productId}) // id로만 삭제가능


        // 5. 소프트 삭제(TypeORM 제공) - softDelete
        const result = await this.productRepository.softDelete({ id:productId}) // id 뿐만 아니라 전부 이용가능.
        return result.affected? true:false

        // save랑 update로 수정하는 것의 차이
        // save는 수정하고 수정 객체를 받아올 수도 있음.
        // update는 수정후 수정문구 같은거 받아오는 것.

    }
}