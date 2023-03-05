import { ProductCategory } from "src/apis/productCategory/entities/productCategory.entity"
import { ProductSaleslocation } from "src/apis/productSaleslocation/entities/productSaleslocation.entity"
import { ProductTag } from "src/apis/productTag/entities/productTag.entity"
import { User } from "src/apis/users/entities/user.entity"
import { Column, Entity,  JoinColumn,  JoinTable,  ManyToMany,  ManyToOne,  OneToOne,  PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    id:string;
 
    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    price:number;

    @Column()
    isSoldout:boolean;

    // 포린키를 이렇게 박으면 됨.
    @JoinColumn()
    @OneToOne(() => ProductSaleslocation)
    productSaleslocation: ProductSaleslocation;

    // 얘는 JoinColumn 필요없음.
    @ManyToOne(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(()=>User)
    user: User;

    @JoinTable() // 얘하면 중간테이블이 나타나게됨. 둘중 하나에만.
    @ManyToMany(()=>ProductTag, (productTags)=>productTags.products)
    productTags: ProductTag[];
}