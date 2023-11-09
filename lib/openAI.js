/*
 *Code By ArdianTdR
 */
const { Configuration, OpenAIApi } = require("openai");
const chalk = require("chalk");

//setup buat konfig nya
const key = require("../key.json");
const configApi = new Configuration({
   apiKey: key.keyopenai,
});
const openai = new OpenAIApi(configApi);
const ai = async (text) => {
   try {
      const responAi = await openai.createChatCompletion({
         model: "gpt-3.5-turbo",
         messages: [{ content: text, role: "user" }],
         temperature: 0.5,
      });
      console.log(chalk.orange("Response Ai Created"));
      return await responAi["data"]["choices"][0]["message"]["content"];
   } catch (error) {
      console.log("ERROR WOY : %s", error);
      return false;
   }
};

module.exports = ai;
