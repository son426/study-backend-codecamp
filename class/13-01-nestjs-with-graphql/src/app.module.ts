import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/board/board.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Board } from './apis/board/entities/board.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [BoardModule,
    ConfigModule.forRoot(),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile: "src/commons/graphql/schema.gql"
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'myproject03',
    entities: [Board],
    synchronize: true,
    logging:true,
  })],  
})
export class AppModule {}
