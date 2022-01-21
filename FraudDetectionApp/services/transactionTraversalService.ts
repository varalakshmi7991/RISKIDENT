import { ICombinedConnectionInfo, ITransactionResponseModel } from "../models/transactionResponseModel";
import { ITransactionModel, ConnectionType } from "../models/transactionModel";

export class TransactionTraversalService {

    private response: ITransactionResponseModel[];

    private connectionTypes: ConnectionType[];
    /**
     * Instantiate a new instance of Transaction service
     */
    public constructor() {
        this.response = [];
        this.connectionTypes = [];
    }

    public _getRequiredTransactionsIfExists(transactions: ITransactionModel[], transactionId: string, confidenceLevel: number): ITransactionResponseModel[] {
        this.response = [];
        this._traverseUntilTransactionFound(transactions, transactionId, confidenceLevel);
        return this.response;
    }

    private _traverseUntilTransactionFound(transactions: ITransactionModel[], transactionId: string, confidenceLevel: number) {
        if (!transactions || transactions.length == 0) {
            return false;
        }
        let requiredIndex = undefined;
        //This iterator is for finding the match in the outer objects
        const matchFound = transactions.some((transaction, index) => {
            if (transaction.id == transactionId) {
                requiredIndex = index;
                return true;
            }
        });
        if (matchFound && requiredIndex != undefined) {
            //traverse through children and select the ones greater than or equal to confidence level
            this.response.push({
                id: transactions[requiredIndex].id,
                index: transactions[requiredIndex].index,
                age: transactions[requiredIndex].age,
                name: transactions[requiredIndex].name,
                email: transactions[requiredIndex].email,
                phone: transactions[requiredIndex].phone,
            });
            this._getChildrenBasedOnConfidence(transactions[requiredIndex].children,
                confidenceLevel, {
                    confidence: 1,
                    types: []
                } as ICombinedConnectionInfo
            );
            return;
        }
        else {
            transactions.some((transaction) => {
                if (transaction.children) {
                    return this._traverseUntilTransactionFound(transaction.children, transactionId, confidenceLevel);
                }
                else {
                    return false;
                }
            });
            return;
        }
    }

    private _getChildrenBasedOnConfidence(transactions: ITransactionModel[], confidenceLevel: number, combinedConnectionInfo: ICombinedConnectionInfo) {
        if (!transactions || transactions.length == 0) {
            return;
        }
        transactions.forEach(t => {
            this.connectionTypes = [];
            this.connectionTypes = [...combinedConnectionInfo.types];
            this.connectionTypes.push(t.connectionInfo.type);
            if (t.connectionInfo.confidence >= confidenceLevel) {
                this.response.push({
                    id: t.id,
                    index: t.index,
                    age: t.age,
                    name: t.name,
                    email: t.email,
                    phone: t.phone,
                    connectionInfo: t.connectionInfo,
                    combinedConnectionInfo: {
                        confidence: t.connectionInfo.confidence * combinedConnectionInfo.confidence,
                        types: this.connectionTypes
                    }
                });
            }
            if (t.children) {
                this._getChildrenBasedOnConfidence(t.children, confidenceLevel, {
                    confidence: t.connectionInfo.confidence,
                    types: this.connectionTypes
                } as ICombinedConnectionInfo);
            }
        });
    }
}