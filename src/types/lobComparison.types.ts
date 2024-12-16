export type Environment = "uat" | "demo" | "prod";

export interface IHealthCheckResponse {
    systemInfo: {
        lobNames: string[];
    };
}

interface IClientConfigValue {
    name: string;
    value: string;
}

export interface IClientConfigFeature {
    domainName: string;
    domainType: string;
    domainValues: IClientConfigValue[];
}

export interface IClientConfigResponse {
    features: IClientConfigFeature[];
}
