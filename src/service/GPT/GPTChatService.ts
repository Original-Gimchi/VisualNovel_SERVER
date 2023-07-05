import {GPT_SECRET} from "@utils/env/env";
import {InternalServerException} from "@utils/exception/Exceptions";

const { Configuration, OpenAIApi } = require("openai");

const GPTChatService = async (question:string) => {
    const configuration = new Configuration({
        apiKey: GPT_SECRET,
    });
    try {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", messages: [
                {role: "user", content: question},
                {role: "system", content: "I am Batman."},
            ],
        }).data.choices[0];
        return response;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw new InternalServerException()
    }
}

export default GPTChatService;