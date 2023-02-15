import { Module } from '@nestjs/common';
import { INFRA_DID_CONFIG } from './infraDID.type';
import { InfraDIDService } from './infraDID.service';

@Module({
    providers: [
        {
            provide: INFRA_DID_CONFIG,
            useValue: {
                networkId: process.env.INFRADID_NETWORK_ID,
                rpcEndpoint: process.env.INFRADID_RPC_ENDPOINT,
                registryContract: process.env.INFRADID_REGISTRY_CONTRACT,
                txfeePayerAccount: process.env.INFRADID_TXFEE_PAYER_ACCOUNT,
                txfeePayerPrivateKey: process.env.INFRADID_TXFEE_PAYER_PRIVATEKEY,
                did: process.env.INFRADID_ISSUER_DID,
                privateKey: process.env.INFRADID_ISSUER_PRIVATEKEY,
            },
        },
        InfraDIDService,
    ],
    exports: [InfraDIDService, INFRA_DID_CONFIG],
})
export class InfraDIDModule {}
