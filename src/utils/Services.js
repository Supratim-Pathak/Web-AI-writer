import axios from "axios";
import {
  BlogAndReportPrompt,
  ImprovePrompt,
  LeaveApplicationPrompt,
  Rewrite,
} from "../Systemprompt/Correction";

const MODEL_NAME = "mistralai/mistral-small-24b-instruct-2501:free";
const API_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

async function getApiKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("apiKey", (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.apiKey || false);
      }
    });
  });
}

export const ideaExc = async (type) => {
  let prompt;
  if (type == "leave") {
    prompt = LeaveApplicationPrompt;
  } else {
    prompt = BlogAndReportPrompt;
  }
  try {
    // const API_KEY = "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";
    const API_KEY = await getApiKey();
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: MODEL_NAME,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    alert(err.message);
    console.log(err.message);
    throw new Error(err.message);
  }
};

export const RewriteText = async (inputText, tone, formality) => {
  let prompt = "";
  prompt = Rewrite.replace("{{user_input}}", inputText.trim());
  prompt = prompt.replace("{{selected_tones}}", tone);
  prompt = prompt.replace("{{selected_formality}}", formality);
  const API_KEY = await getApiKey();
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: MODEL_NAME,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const CorrectText = async (inputText) => {
  let prompt = "";
  prompt = ImprovePrompt.replace("{{user_input}}", inputText.trim());
  const API_KEY = await getApiKey();
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: MODEL_NAME, // Default model
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (err) {
    throw new Error(err.message);
  }
};
