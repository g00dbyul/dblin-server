import { Inject, Injectable } from '@nestjs/common';
import InfraDID from 'infra-did-js';
import { createVerifiableCredentialJwt } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'infra-did-resolver';
import {
    DID,
    InfraDIDConfig,
    InfraDIDIdentity,
    INFRA_DID_CONFIG,
    NetworkConfig,
    parsedVcPayload,
    VCPayload,
} from './infraDID.type';

@Injectable()
export class InfraDIDService {
    private defaultNetworks: NetworkConfig[];
    constructor(@Inject(INFRA_DID_CONFIG) private readonly config: InfraDIDConfig) {
        this.defaultNetworks = [
            {
                networkId: this.config.networkId,
                registryContract: this.config.registryContract,
                rpcEndpoint: this.config.rpcEndpoint,
            },
        ];
    }

    generateInfraDID(networkId = this.config.networkId) {
        return InfraDID.createPubKeyDIDsecp256k1(networkId);
    }

    private getInfraDIDController(infraDIDConfig: InfraDIDConfig) {
        const { privateKey, ...res } = infraDIDConfig;
        return new InfraDID({ ...res, didOwnerPrivateKey: privateKey });
    }

    async resolve(did: DID, networks: NetworkConfig[] = this.defaultNetworks) {
        return await new Resolver(getResolver({ networks })).resolve(did);
    }

    async isRevoked(did: DID, networks: NetworkConfig[] = this.defaultNetworks) {
        const resolved = await this.resolve(did, networks);
        return resolved.didDocumentMetadata.deactivated ?? false;
    }

    async revoke(identity: InfraDIDIdentity, networks: NetworkConfig[] = this.defaultNetworks) {
        if (identity.did === this.config.did) {
            throw new Error('Cannot revoke default issuer DID');
        }
        await this.getInfraDIDController({ ...this.config, ...identity }).revokePubKeyDID();
        return true;
    }

    async createVC(payload: VCPayload<any>, issuer?: InfraDIDIdentity) {
        const jwtVcIssuer = this.getInfraDIDController({ ...this.config, ...issuer }).getJwtVcIssuer();
        const vcIdentity = this.generateInfraDID();
        payload.vc.credentialSubject.id = vcIdentity.did;
        const vc = await createVerifiableCredentialJwt(payload, jwtVcIssuer);
        return { vc, vcIdentity };
    }

    parseVcPayload(payload: VCPayload<any>): parsedVcPayload<any> {
        const {
            ver,
            sub,
            vc: { type, credentialSubject },
        } = payload;
        return {
            type,
            context: payload.vc['@context'],
            version: ver,
            holder: sub,
            credentialSubject,
        };
    }
}
