//require transaction controller in order to assign routes
const TransactionController = require ('../controllers/transaction.controller');

//export and define routes
module.exports = (app) => {
    app.get('/api/pointsbalance', TransactionController.pointsBalance);
    app.post('/api/addtransaction', TransactionController.addTransaction);
    app.post('/api/spendpoints', TransactionController.spendPoints);
}