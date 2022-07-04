function findController() {
    return{
        car(req,res) {
            res.render('hospital/hosp');
        }
    }
}
module.exports = findController