import { Field, Int, ObjectType } from "@nestjs/graphql"
import { ProductCategory } from "src/apis/productCategory/entities/productCategory.entity"
import { ProductSaleslocation } from "src/apis/productSaleslocation/entities/productSaleslocation.entity"
import { ProductTag } from "src/apis/productTag/entities/productTag.entity"
import { User } from "src/apis/users/entities/user.entity"
import { Column, DeleteDateColumn, Entity,  JoinColumn,  JoinTable,  ManyToMany,  ManyToOne,  OneToOne,  PrimaryGeneratedColumn } from "typeorm"

@Entity()
@ObjectType()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    @Field(()=>String)
    id:string;
 
    @Column()
    @Field(()=>String)
    name:string;

    @Column()
    @Field(()=>String)
    description:string;

    @Column()
    @Field(()=>Int)
    price:number;

    @Column({default:false})
    @Field(()=>Boolean)
    isSoldout:boolean;

    @DeleteDateColumn()
    deletedAt:Date;


    // 포린키를 이렇게 박으면 됨.
    @JoinColumn()
    @OneToOne(() => ProductSaleslocation)
    @Field(()=>ProductSaleslocation)
    productSaleslocation: ProductSaleslocation;

    // 얘는 JoinColumn 필요없음.
    @ManyToOne(() => ProductCategory)
    @Field(()=>ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(()=>User)
    @Field(()=>User)
    user: User;

    @JoinTable() // 얘하면 중간테이블이 나타나게됨. 둘중 하나에만.
    @ManyToMany(()=>ProductTag, (productTags)=>productTags.products)
    @Field(()=>[ProductTag]) // gql에서는 이렇게 표현하는게 ProductTag[]
    productTags: ProductTag[];
}