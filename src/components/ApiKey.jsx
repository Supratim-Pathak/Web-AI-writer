import { useState, useEffect } from "react";

export default function ApiKey(props) {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");

  // Load API key from storage when the component mounts
  useEffect(() => {
    chrome.storage.sync.get("apiKey", (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
        setSavedKey(result.apiKey); 
      }
    });
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim() === "") {
      alert("Please enter an API key.");
      return;
    }

    chrome.storage.sync.set({ apiKey }, () => {
      setSavedKey(apiKey); 
      props.setReload(!props.reload);
      alert("API key saved successfully!");
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Enter OpenRouter API Key</h2>

      {savedKey && (
        <p className="text-sm text-gray-600 mt-1">
          ✅ Saved API Key
          {/* <strong>{savedKey}</strong> */}
        </p>
      )}

      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API key"
        className="border p-2 rounded w-full mt-2"
      />
      <button
        onClick={handleSaveApiKey}
        className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
      >
        Save API Key
      </button>
      {/* Help Link */}
      <p className="text-sm text-blue-500 mt-2">
        Need help?{" "}
        <a
          href="https://supratim-pathak.github.io/ext-helpdoc/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Read the API Key Guide
        </a>
      </p>
    </div>
  );
}
