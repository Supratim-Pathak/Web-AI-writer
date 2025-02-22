import ApiKey from "./components/ApiKey";
import LocalUI from "./components/LocalUI";
import { useEffect, useState } from "react";
// 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
function App() {
  const [apikey, setApikey] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get("apiKey", (result) => {
      if (result.apiKey) {
        setApikey(result.apiKey);
      }
    });
    // let apiKey =
    //   "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";
    // setApikey(apiKey);
  }, [reload]);

  return (
    <>
      <div className="w-96 bg-white shadow-xl rounded-xl p-4">
        {apikey ? (
          <LocalUI></LocalUI>
        ) : (
          <ApiKey setReload={setReload} reload={reload}></ApiKey>
        )}
      </div>
    </>
  );
}

export default App;
