
import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function translateText(text, sourceLang = "français", targetLang = "anglais") {
  const prompt = `Traduits ce texte du ${sourceLang} vers le ${targetLang}:\n\n${text}`;

  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Tu es un traducteur précis et concis." },
      { role: "user", content: prompt }
    ],
    temperature: 0.3,
  });

  return response.data.choices[0].message.content.trim();
}

async function main() {
  const frFilePath = path.resolve("./src/i18n/locales/fr/translation.json");
  const enFilePath = path.resolve("./src/i18n/locales/en/translation.json");

  const frContent = JSON.parse(fs.readFileSync(frFilePath, "utf-8"));
  const enContent = {};

  for (const [key, value] of Object.entries(frContent)) {
    console.log(`Traduction: ${key}`);
    enContent[key] = await translateText(value);
  }

  fs.writeFileSync(enFilePath, JSON.stringify(enContent, null, 2));
  console.log("Traductions anglaises générées avec succès !");
}

main().catch(console.error);
