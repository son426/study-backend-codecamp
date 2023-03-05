import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/board/board.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Board } from './apis/board/entities/board.entity';

@Module({
  imports: [BoardModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile: "src/commons/graphql/schema.gql"
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'myproject03',
    entities: [Board],
    synchronize: true,
    logging:true,
  })],  
})
export class AppModule {}
