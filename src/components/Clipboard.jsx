import { useState } from "react";

export default function Clipboard(props) {
  const [text, setText] = useState("Copy text");
  const copy = () => {
    window.navigator.clipboard
      // eslint-disable-next-line react/prop-types
      .writeText(props.data)
      .then(() => {
        setText("Text copied to clipboard!");
        console.log("Text copied to clipboard!");
        setTimeout(() => {
          setText("Copy text");
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <button
      onClick={copy}
      className="inline-flex m-0.5 items-center rounded-md bg-green-50 px-2 py-1 text-s font-medium text-green-700 ring-1 ring-green-600/20 ring-inset cursor-pointer"
    >
      <span id="default-message">
        <span className="inline-flex items-center">
          <svg
            className="w-3 h-3 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
          <span className="text-xs font-semibold pl-2">{text}</span>
        </span>
      </span>
      <span id="success-message" className="hidden">
        <span className="inline-flex items-center">
          <svg
            className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
