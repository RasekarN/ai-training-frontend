// src/App.jsx
import React, { useState } from "react";
import "./style.css";

import ChartBox from "./components/ChartBox";
import SignalForm from "./components/SignalForm";
import SignalResult from "./components/SignalResult";
import TrainingMonitor from "./components/TrainingMonitor";

const styles = {
  app: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #192437 0, #050814 45%, #02030a 100%)",
    color: "#f5f7ff",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
    padding: "16px 24px 32px",
  },
  shell: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  appTitle: {
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9aa4c6",
  },
  badgeRow: {
    display: "flex",
    gap: 8,
    fontSize: "11px",
    color: "#a6b4e0",
  },
  badge: {
    borderRadius: "999px",
    padding: "4px 10px",
    border: "1px solid rgba(114,137,218,0.6)",
    background: "linear-gradient(135deg, rgba(88,101,242,0.18), rgba(12,16,40,0.6))",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1.3fr)",
    gap: "18px",
  },
  leftCard: {
    background: "radial-gradient(circle at top left, #1b2236, #050716)",
    borderRadius: "16px",
    border: "1px solid rgba(116,130,210,0.25)",
    boxShadow: "0 18px 45px rgba(0,0,0,0.65)",
    padding: "14px 14px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingInline: "4px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: 600,
  },
  chip: {
    fontSize: "11px",
    color: "#a5b4ff",
    padding: "2px 9px",
    borderRadius: "999px",
    background: "rgba(15,169,120,0.12)",
    border: "1px solid rgba(56,189,148,0.4)",
  },
  symbolInfo: {
    fontSize: "12px",
    color: "#8c95c5",
    marginTop: 2,
  },
  chartWrapper: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(40,51,110,0.95)",
    backgroundColor: "#02030b",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  panel: {
    background: "radial-gradient(circle at top left, #181f2f, #060712)",
    borderRadius: "16px",
    border: "1px solid rgba(64,76,148,0.6)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.7)",
    padding: "14px 16px 16px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: "14px",
    fontWeight: 600,
  },
  panelTag: {
    fontSize: "10px",
    color: "#9ca3ff",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  aiCard: {
    marginTop: "14px",
    padding: "12px 14px 14px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,64,175,0.45))",
    border: "1px solid rgba(129,140,248,0.7)",
  },
  aiTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  aiTitle: {
    fontSize: "14px",
    fontWeight: 600,
  },
  aiMeta: {
    fontSize: "11px",
    color: "#cbd5ff",
  },
};

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState("NIFTY");
  const [timeframe, setTimeframe] = useState("1D");
  const [signalResult, setSignalResult] = useState(null);
  const [trainingLogs, setTrainingLogs] = useState([]);

  const handleResult = (result) => {
    setSignalResult(result);
  };

  const handleLogs = (logMsg) => {
    if (!logMsg) return;
    setTrainingLogs((prev) => [
      `${new Date().toLocaleTimeString()} — ${logMsg}`,
      ...prev,
    ]);
  };

  return (
    <div style={styles.app}>
      <div style={styles.shell}>
        {/* HEADER */}
        <div style={styles.headerRow}>
          <div style={styles.titleBlock}>
            <h1 style={styles.appTitle}>AI Trading Engine</h1>
            <p style={styles.subtitle}>
              Multi-asset ML engine with TradingView charting
            </p>
            <div style={styles.badgeRow}>
              <span style={styles.badge}>NIFTY · BANKNIFTY · CRUDE · NG</span>
              <span style={styles.badge}>Hybrid XGBoost + Transformer</span>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div style={styles.layout}>
          {/* LEFT: CHART */}
          <section style={styles.leftCard}>
            <div style={styles.cardHeaderRow}>
              <div>
                <div style={styles.cardTitle}>
                  Chart – {selectedSymbol} ({timeframe})
                </div>
                <div style={styles.symbolInfo}>
                  Live TradingView chart for quick visual confirmation
                </div>
              </div>
              <span style={styles.chip}>Market View</span>
            </div>

            <div style={styles.chartWrapper}>
              {/* Chart component (unchanged under the hood) */}
              <ChartBox symbol={selectedSymbol} timeframe={timeframe} />
            </div>
          </section>

          {/* RIGHT: CONTROLS & OUTPUT */}
          <div style={styles.rightColumn}>
            {/* Request AI Signal */}
            <section style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Request AI Signal</h2>
                <span style={styles.panelTag}>Signal Engine</span>
              </div>

              <SignalForm
                selectedSymbol={selectedSymbol}
                timeframe={timeframe}
                onSymbolChange={setSelectedSymbol}
                onTimeframeChange={setTimeframe}
                onResult={handleResult}
                onLogs={handleLogs}
              />
            </section>

            {/* AI Prediction */}
            <section style={styles.aiCard}>
              <div style={styles.aiTitleRow}>
                <h2 style={styles.aiTitle}>AI Prediction</h2>
                <span style={styles.aiMeta}>
                  {signalResult
                    ? `Last run • ${signalResult.timeframe || timeframe}`
                    : "Awaiting request"}
                </span>
              </div>
              <SignalResult result={signalResult} />
            </section>

            {/* Training Monitor */}
            <section style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Training Monitor</h2>
                <span style={styles.panelTag}>Model Logs</span>
              </div>
              <TrainingMonitor logs={trainingLogs} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
