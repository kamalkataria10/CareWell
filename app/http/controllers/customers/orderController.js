const Order=require('../../../models/order')
const moment = require('moment')
function orderController() {
    return{
        store(req, res) {
            // console.log(req.body);
            const {phone,address} = req.body;
            if(!phone || !address)
            {
                req.flash('error','All fields are required');
                return res.redirect('/cart');
            }
            const order = new Order({
                customerId: req.user._id,
                items:req.session.cart.items,
                phone,
                address
            })
            
            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                req.flash('success','Order Placed successfully');
                delete req.session.cart
                const eventEmitter = req.app.get('eventEmitter')
                                eventEmitter.emit('orderPlaced', placedOrder)
                return res.redirect('/customer/orders');
                })
            }).catch(err => {
                req.flash('error','Something went wrong');
                res.redirect('/cart');
            });
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } } )
            res.header('Cache-Control', 'no-store')
            res.render('customers/orders', { orders: orders, moment: moment })
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return  res.redirect('/')
        }

    }
}
module.exports =orderController;