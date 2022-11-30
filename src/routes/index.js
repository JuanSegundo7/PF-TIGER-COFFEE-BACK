const { Router } = require('express');
const productRouter = require("../routes/products.js");
const categoryRouter = require("../routes/categories.js");
const imageRouter = require("../routes/images.js");
const brandRouter = require("../routes/brands.js");
const userRouter = require("../routes/users");
const mailRouter = require('../routes/mail.js');
const commentRouter = require('../routes/comments.js');
const mercadoRouter = require('../routes/mercadopago.js');

const router = Router();

// Configuro los routers
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/images', imageRouter);
router.use('/brands', brandRouter);
router.use('/users', userRouter);
router.use('/mail', mailRouter);
router.use('/comments' , commentRouter);
router.use('/mercadopago', mercadoRouter);


module.exports = router;
