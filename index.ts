import express, { Express, Request } from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

const eCommerceRouter = require('./routes/eCommerce')

app.use(cors<Request>({ origin: `${process.env.API_URL}` }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/ecommerce', eCommerceRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))