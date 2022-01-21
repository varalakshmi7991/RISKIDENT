import express = require('express');
import { ITransactionRequestModel } from "../models/transactionRequestModel";
import { ITransactionResponseModel } from "../models/transactionResponseModel";
import { TransactionService } from "../services/transactionService"

export class TransactionsController {

    private static _instance: TransactionsController;

    public static instantiateController(): TransactionsController {
        if (!this._instance) {
            this._instance = new TransactionsController();
        }
        return this._instance;
    }

    public getTransactions = (req: express.Request, res: express.Response) => {

        //Read from URL parameters
        const reqParams: ITransactionRequestModel = {
            transactionId: req.query.transactionId as string,
            confidenceLevel: req.query.confidenceLevel ? +req.query.confidenceLevel : 0
        }

        console.log("Request Params received --> TrasactionId " + reqParams.transactionId + " with confidence Level " + reqParams.confidenceLevel);
        const transactionService = new TransactionService();
        const response: ITransactionResponseModel[] = transactionService.getTransactions(reqParams);
        return res.status(200).send({
            response
        });
    }
}