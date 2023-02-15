export const INFRA_DID_CONFIG = 'infraDIDConfig';

export type DID = string;

export interface NetworkConfig {
    networkId: string;
    rpcEndpoint: string;
    registryContract: string;
}

export interface TxFeePayler {
    txfeePayerAccount: string;
    txfeePayerPrivateKey: string;
}

export interface InfraDIDIdentity {
    did: DID;
    privateKey: string;
}

export interface InfraDIDConfig extends NetworkConfig, TxFeePayler, InfraDIDIdentity {}

export interface VCPayload<T> {
    iss?: string;
    iat?: number;
    nbf?: number;
    exp?: number;
    sub: DID;
    ver: string;
    vc: {
        id?: DID;
        '@context': string[];
        type: string[];
        credentialSubject: T;
    };
}

export interface parsedVcPayload<T> {
    type: string[];
    context: string[];
    version: string;
    holder: string;
    credentialSubject: T;
}
