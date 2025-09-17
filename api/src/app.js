import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan   from 'morgan';
import routes from './routes.js';


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);


app.use((err, req, res, next) => {
const status = err.status || 500;
res.status(status).json({ message: err.message || 'Server error' });
});
export default app;