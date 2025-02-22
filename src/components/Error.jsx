import PropTypes from "prop-types";

export default function Error({ error }) {
  return (
    <div className="w-96 bg-white shadow-xl rounded-xl p-4">
      <h2 className="text-lg font-semibold text-red-700">Error</h2>
      <p className="text-red-500 mt-3">{error}</p>
      <p className="text-gray-700 mt-3">How can I expose the Ollama server?</p>
      <p className="text-gray-700 mt-1">
        By default, Ollama allows cross origin requests from 127.0.0.1 and
        0.0.0.0.
      </p>
      <p className="text-gray-700 mt-1">
        To support more origins, you can use the OLLAMA_ORIGINS environment
        variable:
      </p>
      <code className="block bg-gray-200 p-2 rounded mt-2">
        OLLAMA_ORIGINS=chrome-extension://cmgdpmlhgjhoadnonobjeekmfcehffco
        ollama serve
      </code>
      <p className="text-gray-700 mt-3">
        Also see:{" "}
        <a
          href="https://github.com/jmorganca/ollama/blob/main/docs/faq.md"
          className="text-blue-500 underline"
        >
          https://github.com/jmorganca/ollama/blob/main/docs/faq.md
        </a>
      </p>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
