import { useState, useEffect } from "react";
import Clipboard from "./Clipboard";
import { CorrectText, ideaExc, RewriteText } from "../utils/Services";
// import Error from "./Error";
// ("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");
// ("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");
const LocalUI = () => {
  const Tones = [
    { text: "Confident", emojie: "😎" },
    { text: "Witty", emojie: "😏" },
    { text: "Personable", emojie: "🤗" },
    { text: "Empathetic", emojie: "😇" },
    { text: "Engaging", emojie: "🤩" },
    { text: "Direct", emojie: "🎯" },
  ];
  const Formality = [
    { text: "Nutral", emojie: "👕" },
    { text: "Formal", emojie: "💼" },
    { text: "Casual", emojie: "😐" },
  ];
  const [inputText, setInputText] = useState();
  const [output, setOutputtext] = useState();
  const [loader, setLoader] = useState(false);
  const [improveLoader, setImproveLoader] = useState(false);
  const [rewriteLoader, setRewriteLoader] = useState(false);
  const [formality, setFormality] = useState(Tones[0].text);
  const [tone, setTone] = useState(Formality[0].text);

  useEffect(() => {
    setFormality(Formality[0].text);
    setTone(Tones[0].text);
  }, []);

  const clickHandeler = async () => {
    setLoader(true);
    setRewriteLoader(true);
    try {
      const res = await RewriteText(inputText, tone, formality);
      setOutputtext(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
      setRewriteLoader(false);
    }
  };

  const clickImproveHandeler = async () => {
    setImproveLoader(true);
    setLoader(true);
    try {
      const res = await CorrectText(inputText.trim());
      setOutputtext(res);
    } catch (err) {
      console.error(err);
    } finally {
      setImproveLoader(false);
      setLoader(false);
    }
  };

  const generateIdea = async (type) => {
    try {
      setLoader(true);
      const res = await ideaExc(type);
      setOutputtext(res);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {/* Title */}
      <h2 className="text-lg font-semibold">How do you want to get started?</h2>
      {/* Suggestions */}
      <div className="mt-3 space-y-3">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => {
            generateIdea(" ");
          }}
        >
          <span className="text-yellow-500">💡</span>
          <p className="text-gray-700">Generate ideas for a blog post</p>
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => {
            generateIdea("leave");
          }}
        >
          <span className="text-blue-500">✏️</span>
          <p className="text-gray-700">
            Write a email format for Leave application
          </p>
        </div>
      </div>
      {loader && (
        <div role="status" className="flex justify-center mt-[30px] mb-[30px]">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-green-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {/* Start Output */}
      {output && (
        <div className="mt-3 space-y-3 ">
          <div className="flex justify-end mr-2">
            <Clipboard data={output}></Clipboard>
          </div>
          <div>{output}</div>
        </div>
      )}
      {/* End Output */}
      <div className="mt-3 space-y-3">
        <h2 className="text-lg font-semibold">Formality</h2>
        {Formality.map((data) => {
          return (
            <>
              <span
                onClick={() => {
                  setFormality(data.text);
                }}
                className="inline-flex m-1 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset cursor-pointer"
              >
                {data.emojie} {data.text}
                {data.text == formality && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current ml-1.5 text-black"
                    viewBox="0 0 18 18"
                    width="16"
                    height="16"
                  >
                    <path d="M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"></path>
                    <path
                      fillRule="evenodd"
                      d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                    ></path>
                  </svg>
                )}
              </span>
            </>
          );
        })}
      </div>
      <div className="mt-3 space-y-3">
        <h2 className="text-lg font-semibold">Tone</h2>
        {Tones.map((data) => {
          return (
            <>
              <span
                onClick={() => {
                  setTone(data.text);
                }}
                className="inline-flex m-1 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset cursor-pointer"
              >
                {data.emojie} {data.text}
                {data.text === tone && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current ml-1.5 text-black"
                    viewBox="0 0 18 18"
                    width="16"
                    height="16"
                  >
                    <path d="M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"></path>
                    <path
                      fillRule="evenodd"
                      d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                    ></path>
                  </svg>
                )}
              </span>
            </>
          );
        })}
      </div>
      {/* Input Box */}
      <div className="mt-4">
        <textarea
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          type="textarea"
          placeholder='Try "Write an ode to the em dash"'
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>
      </div>
      {/* Correct Text button  */}
      <button
        disabled={improveLoader}
        onClick={clickImproveHandeler}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
        {!improveLoader && <>Correct Text</>}
        {improveLoader && (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </>
        )}
      </button>
      {/* Reright Text button  */}
      <button
        disabled={rewriteLoader}
        onClick={clickHandeler}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
        {!rewriteLoader && <>Rewrite</>}
        {rewriteLoader && (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </>
        )}
      </button>
    </>
  );
};

export default LocalUI;
