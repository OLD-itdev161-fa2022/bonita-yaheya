import express from 'express';
import connectDatabase from './config/db';

//Initialize express application
const app = express();

//Connect connectDatabase
connectDatabase();

//API endpoints
app.get('/', (req, res) => 
res.send('http get request sent to root api endpoint')

);

//Connection listener
app.listen(8080, () => console.log('Express server running on port 8080'));
