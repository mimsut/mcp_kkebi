import React, { useState } from "react";
import type { CounterWidgetProps } from "./types";

/**
 * 인터랙티브 카운터 위젯
 * 사용자 상호작용을 보여주는 예제
 */
export default function CounterWidget({ initialCount }: CounterWidgetProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div style={{
      padding: "24px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif",
      textAlign: "center",
    }}>
      <h2 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>
        🔢 인터랙티브 카운터
      </h2>
      
      <div style={{
        fontSize: "48px",
        fontWeight: "bold",
        margin: "20px 0",
        textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      }}>
        {count}
      </div>

      <div style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px",
      }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.3)",
            color: "white",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          −
        </button>

        <button
          onClick={() => setCount(initialCount)}
          style={{
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.25)",
            color: "white",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.35)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
          }}
        >
          초기화
        </button>

        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.3)",
            color: "white",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          +
        </button>
      </div>

      <div style={{
        marginTop: "20px",
        fontSize: "12px",
        opacity: 0.8,
      }}>
        클릭해서 카운터를 조작하세요!
      </div>
    </div>
  );
}
