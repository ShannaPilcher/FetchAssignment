require('dotenv').config();

const express = require ('express');
const app = express();
const cors = require ('cors');

app.set('view engine', 'ejs')

//create home route
app.get('/', (req,res) => {
    res.render ('home');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config')(process.env.DB_NAME);
require('./routes/transaction.routes')(app);

app.listen(process.env.DB_PORT, () => console.log('Listening on port' + process.env.DB_PORT));

module.exports = app;
