import { CashService } from "./services/cash.service.js"
import { ProductService } from "./services/product.service.js"

export class ProductController{
    buyProduct = (req, res)=>{
        // 가진돈 검증
        const cashService = new CashService()
        const hasMoney = cashService.checkValue()

        // 판매여부 검증
        const productService = new ProductService()
        const isSoldOut = productService.checkSoldOut()

        // 상품 구매 코드
        if(hasMoney && !isSoldOut){
            res.send("상품 구매 완료")
        }
    }
    refundProduct = (req, res)=>{
        // 판매여부 검증
        const productService = new ProductService()
        const isSoldOut = productService.checkSoldOut()

        // 상품 환불하는 코드
        if(isSoldOut){
            res.send("상품 환불 완료!!")
        }
    }
}