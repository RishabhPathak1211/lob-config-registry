import axios from "axios";
import { Environment, IClientConfigFeature, IClientConfigResponse, IHealthCheckResponse } from "../types/lobComparison.types";
import { DefaultConfigObjectType } from "../store/ConfigurationReducer/configuration-reducer.default-value";

export class LobComparisonService {
    private environment: Environment;

    constructor(environment: Environment) {
        this.environment = environment;
    }

    private async getLobList(): Promise<string[]> {
        try {
            const hckeckResponse = await axios<IHealthCheckResponse>({
                url: `https://${this.environment}.salescode.ai/hckeck`,
                method: 'GET',
            })

            return hckeckResponse.data.systemInfo.lobNames;
        } catch (e) {
            return [];
        }
    }

    private async getClientConfigByLob(lob: string): Promise<IClientConfigFeature[] | null> {
        try {
            const clientConfigResponse = await axios<IClientConfigResponse>({
                url: `https://${this.environment}.salescode.ai/metadata/clientconfig?minimalResponse=true`,
                method: 'GET',
                headers: {
                    lob,
                }
            });

            return clientConfigResponse.data.features;
        } catch (e) {
            return null;
        }
    }

    private transformConfigData(data: IClientConfigFeature[]): Record<string, Record<string, string>> {
        const configData: Record<string, Record<string, string>> = {};

        for (let feature of data) {
            if (!configData[feature.domainType]) {
                configData[feature.domainType] = {};
            }

            for (let domainValue of feature.domainValues) {
                configData[feature.domainType][domainValue.name] = domainValue.value
            }
        }

        return configData;
    }

    async getLobwiseConfigMapping() {
        const lobList = await this.getLobList();

        const mapping: Record<string, Record<string, Record<string, string>>> = {};

        for (let lob of lobList) {
            const clientConfigFeatures = await this.getClientConfigByLob(lob);

            if (clientConfigFeatures) {
                mapping[lob] = this.transformConfigData(clientConfigFeatures);
            }
        }

        return mapping;
    }

    async getDefaultConfigData(){
        const res = await axios.get('https://l8oq52vga7.execute-api.ap-south-1.amazonaws.com/globalConfig');
        let populatedData : DefaultConfigObjectType[];
        // const dataJson = data.json();
        populatedData = res.data;
        return populatedData;
    }
}

