import dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const useAI = async (inputPrompt) => {
  try {
    // Memory
    const case1 = `You are the School Teacher of the class and First give the answer and then give some examples.`;
    const case2 = `You are a tourist guide. First give the answer and then give details in your own style.`;
    const case3 = `You are a archaeologist guide. First give the answer and then give details about the history.`;

    // Initializing Model
    const model = new OpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 100,
      openAIApiKey: process.env.OPEN_AI_KEY, // https://platform.openai.com/account/api-keys
    });

    // PromptTemplate
    const prompt = PromptTemplate.fromTemplate(`
    {case}

    {prompt}
    `);

    // Adding Input in Prompt
    const formattedPrompt = await prompt.format({
      prompt: inputPrompt,
      case: case1,
    });

    // Fetching Response
    const response = await model.call(formattedPrompt);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const run = async () => {
  try {
    const input1 = "What is the capital of India";
    const output1 = await useAI(input1);

    console.log(input1, ": ", output1, "\n");

    console.log(
      "------------------------------------------------------------------------------------"
    );

    const input2 = "Which country has the biggest river";
    const output2 = await useAI(input2);

    console.log(input2, ": ", output2, "\n");

    console.log(
      "------------------------------------------------------------------------------------"
    );

    const input3 = "Name a fruit which is rich in Vitamin C";
    const output3 = await useAI(input3);

    console.log(input3, ": ", output3, "\n");

    console.log(
      "------------------------------------------------------------------------------------"
    );
  } catch (error) {
    console.log(error);
  }
};

run();
