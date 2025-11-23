import React from "react";

export default function SignalResult({ result, loading }) {
  if (loading)
    return <div className="mt-6 text-yellow-400">Running prediction...</div>;

  if (!result)
    return <div className="mt-6 text-gray-500">No prediction yet.</div>;

  const up = (result.ai_prob_up * 100).toFixed(2);
  const down = (result.ai_prob_down * 100).toFixed(2);

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-bold text-blue-400 mb-4">AI Prediction</h3>

      <p className="text-gray-300 mb-2">
        Signal: <span className="text-white font-bold">{result.ai_signal}</span>
      </p>

      <div className="mt-4">
        <p className="text-gray-400 mb-1">Probability UP: {up}%</p>
        <div className="w-full h-2 bg-gray-700 rounded">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: `${up}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-400 mb-1">Probability DOWN: {down}%</p>
        <div className="w-full h-2 bg-gray-700 rounded">
          <div
            className="h-2 bg-red-500 rounded"
            style={{ width: `${down}%` }}
          />
        </div>
      </div>
    </div>
  );
}
