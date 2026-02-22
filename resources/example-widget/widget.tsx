import React from "react";
import type { ExampleWidgetProps } from "./types";

/**
 * 예제 위젯 컴포넌트
 * ChatGPT와 Claude에서 렌더링됩니다
 */
export default function ExampleWidget({ title, message }: ExampleWidgetProps) {
  return (
    <div style={{
      padding: "20px",
      borderRadius: "8px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>{title}</h2>
      <p style={{ margin: 0, fontSize: "16px", opacity: 0.9 }}>{message}</p>
      <div style={{
        marginTop: "15px",
        padding: "10px",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "4px",
        fontSize: "14px",
      }}>
        ✨ MCP 앱이 성공적으로 실행 중입니다!
      </div>
    </div>
  );
}
