import React, { useEffect, useRef } from "react";

const TV_HARDWIRED_SYMBOLS = {
  NIFTY: "NSE:NIFTY",
  BANKNIFTY: "NSE:BANKNIFTY",
  CRUDE: "TVC:USOIL",
  NG: "TVC:NATGAS",
};

export default function ChartBox({ selectedSymbol, timeframe }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.innerHTML = ""; // Clear chart

    // 100% valid TradingView symbols
    const tvSymbol = TV_HARDWIRED_SYMBOLS[selectedSymbol] || "NSE:NIFTY";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tv_chart",
        width: "100%",
        height: 500,
        symbol: tvSymbol, // 100% guaranteed valid
        interval:
          timeframe === "1D" ? "D" :
          timeframe === "1H" ? "60" :
          timeframe === "15m" ? "15" :
          timeframe === "5m" ? "5" : "D",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1",
        toolbar_bg: "#000",
        hide_top_toolbar: false,
        hide_side_toolbar: false,
      });
    };

    containerRef.current.appendChild(script);
  }, [selectedSymbol, timeframe]);

  return (
    <div
      id="tv_chart"
      ref={containerRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
}
