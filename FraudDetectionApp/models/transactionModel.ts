export interface ITransactionModel {
    id: string,
    index: number,
    age: number,
    name: string,
    email: string,
    phone: string,
    connectionInfo: IConnectionInfo,
    geoInfo: IGeoInfo
    children: ITransactionModel[],
}

export interface IConnectionInfo {
    type: ConnectionType,
    confidence: number
}

export interface IGeoInfo {
    latitude: number,
    longitude: number
}

export enum ConnectionType {
    sameEmail,
    sameGeoInfo
}