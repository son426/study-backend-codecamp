import express from "express"
import {ProductController} from './mvc/controllers/product.controller.js'
import {CouponController} from './mvc/controllers/coupon.controller.js'
import { ProductService } from "./mvc/controllers/services/product.service.js"
import { CashService } from "./mvc/controllers/services/cash.service.js"
import { PointService } from "./mvc/controllers/services/point.service.js"

const app = express()


// 의존성 주입
// new 한번으로 모든 곳에서 재사용 가능 (싱글톤 패턴)
const productService = new ProductService()
const cashService = new CashService()
const pointService = new PointService() // 쿠폰 구매 방식이, 포인트 결제로 변경


// 상품 api
const productController = new ProductController(productService, cashService);
app.post("/products/buy", productController.buyProduct)
app.post("/products/refund", productController.refundProduct)

// 쿠폰 api
const couponController = new CouponController(cashService)
app.post("/coupons/buy", couponController.buyCoupon)

app.listen(3000, ()=>{console.log("3000번 열림")})