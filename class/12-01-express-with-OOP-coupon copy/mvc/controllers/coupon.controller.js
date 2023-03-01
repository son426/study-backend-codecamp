import { CashService } from "./services/cash.service.js"


export class CouponController{
    buyCoupon = (req, res)=>{
        // 1. 가진 돈 검증하는 코드
           const cashService = new CashService() 
           const hasMoney = cashService.checkValue()

        // 2. 쿠폰 구매하는 코드
        if(hasMoney){
            res.send("쿠폰 구매 완료")
        }
    }
}