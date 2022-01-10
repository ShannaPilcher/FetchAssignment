//require the Transaction model
const Transaction = require('../models/transaction.model');

//declare variables for setting up data structure
let payersBalance = {};
let totalPoints = 0;
let transactionQueue = [];

//Create controller for routes for addTransaction, spendPoints, and pointsBalance
module.exports= {
    addTransaction: (req,res) => {

        var payer = req.body.payer;
        var points = req.body.points;
        var timeStamp = new Date(req.body.timestamp);
                
        //check to make sure there will be no negative balance
        if (points > 0){
            totalPoints += points;
            transactionQueue.push({'payer': payer, 'points': points, 'timestamp': timeStamp});

            //add payer information for the payer and the points; first check if the payer is new and add payer & points
            if(!(payer in payersBalance)) {
                payersBalance[payer] = points
            }

            //if we already have payer information transaction history, add points to that payer
            else {
                payersBalance[payer] += points
            }
        }
        //check to make sure adding negative points won't create a negative balance for that payer, if negative balance, give error. If not, add transaction to queue & add points to balances
        else if (points < 0){
            if ((payer in payersBalance) && ((payersBalance[payer] + points) < 0)){
                res.status(400).send('Unable to add transaction.')
            }
            else if ((payer in payersBalance) && ((payersBalance[payer] + points) > 0)){
                payersBalance[payer] += points;
                totalPoints += points;
                transactionQueue.push({'payer': payer, 'points': points, 'timestamp': timeStamp})
            }
            else {
                res.status(400).send('Unable to add transaction.')
            }
        }

        //sort Queue after every added transaction
        transactionQueue.sort(function(a, b) {
            return a.timestamp - b.timestamp;
        });
        
        //send response for the new transaction
        res.status(200).send(JSON.stringify(transactionQueue))
    },
    
    //subtract points in order of first transaction based on timestamp; return an array of objects containing the payer points were deducted from and the points deducted
    spendPoints: (req, res) => {
        let pointsToSpend = req.body.points;

        //check to see if spending points won't make the total points negative
        if((totalPoints - pointsToSpend) < 0){
            res.status(400).send('Not enough points')
        }

        //iterate through transactionQueue and deduct points until all points have been deducted, add point changes to array; adjust total points & payers balance
        else {
            let spentPoints = [];
            //adjust the total point balance with the points spent
            totalPoints -= pointsToSpend;

            while(pointsToSpend > 0){
                let oldestTransaction = transactionQueue[0];
                let currentPayer = oldestTransaction.payer;
                let currentPoints = oldestTransaction.points;
                
                //determine if the points to spend are greater than the amount of points in the oldest transaction
                if (currentPoints < pointsToSpend){
                    //subtract the transaction's points from the points to spend
                    pointsToSpend -= currentPoints;
                    //determine if the payer has already been added to the new array for listing the points spent for each payer
                    if(spentPoints.every(item => item.payer !== currentPayer)) {
                        //add payer and the points deducted from that payer to the new array
                        spentPoints.push({'payer': currentPayer, 'points':  (-currentPoints)});
                    }
                    else {
                        //adjust the points deducted from the payer already in the new array
                        //spentPoints[currentPayer] = {'points': (spentPoints[currentPayer].points -= currentPoints)}
                        spentPoints.forEach(item => {
                            if (item.payer === currentPayer){
                                item.points -= currentPoints
                            }
                        })
                    }
                    //adjust the point balance associated with the payer
                    payersBalance[currentPayer] -= currentPoints;
                    //remove that transaction from the queue since the points were all used
                    transactionQueue.shift();
                    continue;
                }

                //determine if the points to deduct are less than the amount of points in the oldest transaction
                else if (currentPoints > pointsToSpend){
                    //subtract the points to spend from the points of the oldest transaction
                    currentPoints -= pointsToSpend;
                    //adjust the point balance associated with the payer
                    payersBalance[currentPayer] -= pointsToSpend;
                    //determine if the payer has already been added to the new array for listing the points spent for each payer
                    if(spentPoints.every(item => item.payer !== currentPayer)) {
                        //add payer and the points deducted from that payer to the new array
                        spentPoints.push({'payer': currentPayer, 'points': (-pointsToSpend)});
                    }
                    else {
                        //adjust the points deducted from the payer already in the new array
                        spentPoints.forEach(item => {
                            if (item.payer === currentPayer){
                                item.points -= pointsToSpend
                            }
                        })
                    }
                    //set pointsToSpent to 0
                    pointsToSpend = 0;
                    break;
                }
            }
            //send response with spent points
            res.status(200).send(JSON.stringify(spentPoints))
        }
    },

    pointsBalance: (req,res) => {
        res.status(200).send(JSON.stringify(payersBalance))
    },
}