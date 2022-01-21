import { ITransactionRequestModel } from "../models/transactionRequestModel";
import { ITransactionResponseModel } from "../models/transactionResponseModel";
import { JsonToTransactionConverter } from "../helpers/JsonToTransactionConverter";
import { TransactionTraversalService } from "./transactionTraversalService";

export class TransactionService {
    public getTransactions(requestDetails: ITransactionRequestModel): ITransactionResponseModel[] {
        const t = new TransactionTraversalService();
        return t._getRequiredTransactionsIfExists(JsonToTransactionConverter.instantiateController()._readFromConfig(),
            requestDetails.transactionId,
            requestDetails.confidenceLevel);
    }
}