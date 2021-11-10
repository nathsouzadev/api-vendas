import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppError } from '@shared/errors/ApeError';

const app = express();

app.use(cors());

app.use(express.json());
app.use(router)

app.use(function(request: Request, response: Response, next: NextFunction) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});

export { app }
