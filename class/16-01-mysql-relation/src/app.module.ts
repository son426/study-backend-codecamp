import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/board/board.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Board } from './apis/board/entities/board.entity';
import { Product } from './apis/product/entities/product.entity';
import { ProductCategory } from './apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from './apis/productSaleslocation/entities/productSaleslocation.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductTag } from './apis/productTag/entities/productTag.entity';
import { User } from './apis/users/entities/user.entity';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import Joi from 'joi';
import { ProductModule } from './apis/product/product.module';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile: "src/commons/graphql/schema.gql"
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'myproject03',
      entities: [Board, Product, ProductCategory, ProductSaleslocation, ProductTag, User],
      synchronize: true,
      logging:true,
    }),
],  
})
export class AppModule {}
