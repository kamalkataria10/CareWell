const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController');
const orderController=require('../app/http/controllers/customers/orderController');
const findController=require('../app/http/controllers/customers/findController');
const medController=require('../app/http/controllers/customers/medController');
const ambController=require('../app/http/controllers/customers/ambController');
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController');


const guest=require('../app/http/middlewares/guest');
const auth=require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin')

function initroutes(app) {
    app.get('/', homeController().index);
    app.get('/cart',cartController().cart);
    app.get('/login',guest,authController().login);  
    app.post('/login',authController().postLogin);  
    app.get('/register',guest,authController().register);
    app.post('/register',authController().postRegister);
    app.post('/logout',authController().logout);
    app.post('/update-cart',cartController().update);
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);
    app.get('/customer/orders/:id',auth,orderController().show);
    app.get('/admin/orders',admin,adminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update);
    app.get('/find',findController().car);
    app.get('/menu',medController().ca);
    app.get('/ambulance',ambController().car);
    app.get('/insurance',ambController().car1);
}
module.exports =initroutes;