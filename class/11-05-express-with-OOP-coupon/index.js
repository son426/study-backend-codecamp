import express from "express"
import {ProductController} from './mvc/controllers/product.controller.js'
import {CouponController} from './mvc/controllers/coupon.controller.js'

const app = express()

// 상품 api
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct)
app.post("/products/refund", productController.refundProduct)

// 쿠폰 api
const couponController = new CouponController
app.post("/coupons/buy", couponController.buyCoupon)

app.listen(3000, ()=>{console.log("3000번 열림")})