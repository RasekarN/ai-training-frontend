import { useState } from "react";
import { getSignal } from "../api/backend";

export default function SignalForm({ onResult, onLogs }) {
  const [symbol, setSymbol] = useState("NIFTY");
  const [timeframe, setTimeframe] = useState("1D");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    onLogs([]);

    const payload = {
      symbol: symbol,
      timeframe: timeframe,
    };

    const logs = [];
    const oldLog = console.log;
    console.log = (...msg) => {
      logs.push(msg.join(" "));
      onLogs([...logs]);
      oldLog(...msg);
    };

    try {
      const res = await getSignal(payload);
      onResult(res);
    } catch (e) {
      onResult({ error: e.message });
    } finally {
      console.log = oldLog;
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Request AI Signal</h3>

      <label>Index / Commodity</label>
      <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
        <option value="NIFTY">NIFTY</option>
        <option value="BANKNIFTY">BANKNIFTY</option>
        <option value="CRUDE">Crude Oil</option>
        <option value="NG">Natural Gas</option>
      </select>

      <label>Timeframe</label>
      <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
        <option value="1D">1 Day</option>
        <option value="1H">1 Hour</option>
        <option value="15m">15 min</option>
        <option value="5m">5 min</option>
      </select>

      <button onClick={submit} disabled={loading}>
        {loading ? "Analyzing..." : "Get Signal"}
      </button>
    </div>
  );
}
