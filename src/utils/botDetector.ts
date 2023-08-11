import { PangeaConfig, IPIntelService, PangeaErrors } from "pangea-node-sdk";

const domain = process.env.PANGEA_DOMAIN;
const token = process.env.PANGEA_INTEL_TOKEN;
const config = new PangeaConfig({ domain: domain });
const ipIntel = new IPIntelService(String(token), config);

const botDetector = async (ipAddress: string) => {

    // Selecting Cymru provider to detect malicious bots and botnets
    const options = { provider: "cymru", verbose: true, raw: true };
    try {
        const response = await ipIntel.reputation(ipAddress, options);
        console.log(response.result.data)
        if (response.result.data.verdict == "malicious" || response.result.data.verdict == "suspicious") {
            return {isBotDetected: true, resultData: response.result.data}
        } else {
            // No bot detected
            return {isBotDetected: false, resultData: response.result.data}
        }
    } catch (e) {
    if (e instanceof PangeaErrors.APIError) {
        console.log("Error", e.summary, e.errors);
    } else {
        console.log("Error: ", e);
    }
    }
    return {isBotDetected: false, resultData: null};
}

export default botDetector;