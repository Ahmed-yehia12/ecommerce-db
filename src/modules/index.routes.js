import authRouter from "./auth/auth.routes.js";
import brandsRouter from "./brand/brand.routes.js";
import categoryRouter from "./category/category.routes.js";
import productRouter from "./products/products.routes.js";
import subCategoryRouter from "./subcategory/subcategory.routes.js";
import userRouter from "./user/user.routes.js";
import reviewRouter from './review/review.routes.js';
import wishListRouter from "./wishList/wishList.routes.js";
import addressRouter from "./address/address.routes.js";
import cuponRouter from "./cupon/cupon.routes.js";
import cartRouter from "./cart/cart.routes.js";
import orderRouter from "./order/order.routes.js";


export const bootstrap=(app)=>{
    
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/api/v1/categories',categoryRouter);
    app.use('/api/v1/sub_category',subCategoryRouter);
    app.use('/api/v1/brands',brandsRouter);
    app.use('/api/v1/product',productRouter);
    app.use('/api/v1/user',userRouter);
    app.use('/api/v1/auth',authRouter);
    app.use('/api/v1/review',reviewRouter);
    app.use('/api/v1/wishList',wishListRouter);
    app.use('/api/v1/address',addressRouter);
    app.use('/api/v1/cupon',cuponRouter);
    app.use('/api/v1/cart',cartRouter);
    app.use('/api/v1/order',orderRouter);








    
}