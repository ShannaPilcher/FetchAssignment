const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

describe('POST /api/addtransaction', () => {

    var data = {
        "payer": "DANNON",
        "points": 1000,
        "timestamp": "2020-11-02T14:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/api/addtransaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /api/addtransaction', () => {

    var data = {
        "payer": "UNILEVER",
        "points": 200,
        "timestamp": "2020-10-31T11:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/api/addtransaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /api/addtransaction', () => {

    var data = {
        "payer": "DANNON",
        "points": -200,
        "timestamp": "2020-10-31T15:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/api/addtransaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /api/addtransaction', () => {

    var data = {
        "payer": "MILLER COORS",
        "points": 10000,
        "timestamp": "2020-11-01T14:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/api/addtransaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /api/addtransaction', () => {

    var data = {
        "payer": "DANNON",
        "points": 300,
        "timestamp": "2020-10-31T10:00:00Z"
    };

    it('Add points', (done) => {
        request(app)
        .post('/api/addtransaction')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /api/spendpoints', () => {

    var data = {
        "points": 5000
    };

    it('Deduct points, First come first basis', (done) => {
        request(app)
        .post('/api/spendpoints')
        .send(data)
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});

describe('GET /api/pointsbalance', () => {

    it('Get points balance', (done) => {
        request(app)
        .get('/api/pointsbalance')
        .then((res) => {
            console.log(res.text);
            done();
        })
        .catch((err) => done(err));
    });
});