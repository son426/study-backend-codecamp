export class ProductController{
    
    // 얘는 생략가능.
    // this.a = moneyService에서 a가 없을경우 만들어서 넣어줌.
    // productService
    // moneyService;
    
    constructor( productService,moneyService){
        this.moneyService = moneyService
        this.productService = productService
    }
    
    
    buyProduct = (req, res)=>{
        // 가진돈 검증
        // const cashService = new CashService()
        const hasMoney = this.moneyService.checkValue()

        // 판매여부 검증
        // const productService = new ProductService()
        const isSoldOut = this.productService.checkSoldOut()

        // 상품 구매 코드
        if(hasMoney && !isSoldOut){
            res.send("상품 구매 완료")
        }
    }
    refundProduct = (req, res)=>{
        // 판매여부 검증
        // const productService = new ProductService()
        const isSoldOut = this.productService.checkSoldOut()

        // 상품 환불하는 코드
        if(isSoldOut){
            res.send("상품 환불 완료!!")
        }
    }
}