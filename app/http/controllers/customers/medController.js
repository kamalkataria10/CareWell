
const Menu = require('../../../models/menu')
function medController() {
    return{
        async ca(req, res){
            const pizzas = await Menu.find()
            // console.log(pizzas)
            return res.render('hospital/med', { pizzas: pizzas })
    }
}
}
module.exports = medController