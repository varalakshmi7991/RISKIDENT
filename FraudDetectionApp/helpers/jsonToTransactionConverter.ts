import { ITransactionModel } from "../models/transactionModel";
import * as t from "../transactions.json";

export class JsonToTransactionConverter {
    //properties
    private static _instance: JsonToTransactionConverter;

    public static instantiateController(): JsonToTransactionConverter {
        if (!this._instance) {
            this._instance = new JsonToTransactionConverter();

        }
        return this._instance;
    }
    public _readFromConfig(): ITransactionModel[] {
        const data: [] = t as [];
        const transactions: ITransactionModel[] = [];
        data.forEach(item => {
            transactions.push(item as ITransactionModel)
        });
        return transactions;
    }
}