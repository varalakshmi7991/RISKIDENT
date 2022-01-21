import { IConnectionInfo, ConnectionType } from "./transactionModel";

export interface ITransactionResponseModel {
    id: string,
    index: number,
    age?: number,
    name?: string,
    email?: string,
    phone?: string,
    connectionInfo?: IConnectionInfo,
    combinedConnectionInfo?: ICombinedConnectionInfo
}

export interface ICombinedConnectionInfo {
    types: ConnectionType[],
    confidence: number
}