#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * MCP 앱 서버
 * ChatGPT와 Claude에서 실행되는 인터랙티브 UI 애플리케이션
 */
const server = new Server(
  {
    name: "my-mcp-app",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

/**
 * 도구 목록 제공
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "greet",
        description: "사용자에게 환영 메시지를 표시합니다",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "사용자 이름",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "get_time",
        description: "현재 시간을 알려줍니다",
        inputSchema: {
          type: "object",
          properties: {
            timezone: {
              type: "string",
              description: "시간대 (예: Asia/Seoul, America/New_York)",
              default: "Asia/Seoul",
            },
          },
        },
      },
      {
        name: "calculate",
        description: "간단한 수학 계산을 수행합니다",
        inputSchema: {
          type: "object",
          properties: {
            expression: {
              type: "string",
              description: "계산할 수식 (예: 2 + 2, 10 * 5)",
            },
          },
          required: ["expression"],
        },
      },
    ],
  };
});

/**
 * 도구 실행 핸들러
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "greet") {
    const userName = String(args?.name || "사용자");
    return {
      content: [
        {
          type: "text",
          text: `안녕하세요, ${userName}님! MCP Kkebi에 오신 것을 환영합니다! 🎉\n\n사용 가능한 도구:\n- greet: 환영 메시지\n- get_time: 현재 시간\n- calculate: 계산기\n\n사용 가능한 위젯:\n- widget://example: 예제 위젯\n- widget://counter: 카운터 위젯`,
        },
      ],
    };
  }

  if (name === "get_time") {
    const timezone = String(args?.timezone || "Asia/Seoul");
    try {
      const now = new Date();
      const time = now.toLocaleString("ko-KR", { timeZone: timezone });
      const isoTime = now.toISOString();
      
      return {
        content: [
          {
            type: "text",
            text: `⏰ 현재 시간 (${timezone}):\n\n📅 ${time}\n🌐 UTC: ${isoTime}\n⏱️ Timestamp: ${now.getTime()}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ 오류: 잘못된 시간대입니다. (${timezone})\n예시: Asia/Seoul, America/New_York, Europe/London`,
          },
        ],
        isError: true,
      };
    }
  }

  if (name === "calculate") {
    const expression = String(args?.expression || "");
    try {
      // 안전한 수식만 허용 (숫자와 기본 연산자만)
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, "");
      if (sanitized !== expression) {
        throw new Error("잘못된 문자가 포함되어 있습니다");
      }
      
      // Function을 사용한 안전한 계산
      const result = new Function(`return ${sanitized}`)();
      
      return {
        content: [
          {
            type: "text",
            text: `🧮 계산 결과:\n\n${expression} = ${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ 계산 오류: ${expression}\n\n올바른 수식을 입력해주세요.\n예시: 2 + 2, 10 * 5, (3 + 4) * 2`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

/**
 * 리소스 목록 제공
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "widget://example",
        name: "Example Widget",
        description: "인터랙티브 예제 위젯",
        mimeType: "application/vnd.mcp.widget+json",
      },
      {
        uri: "widget://counter",
        name: "Counter Widget",
        description: "인터랙티브 카운터 위젯",
        mimeType: "application/vnd.mcp.widget+json",
      },
    ],
  };
});

/**
 * 리소스 읽기 핸들러
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "widget://example") {
    return {
      contents: [
        {
          uri: "widget://example",
          mimeType: "application/vnd.mcp.widget+json",
          text: JSON.stringify({
            type: "example-widget",
            props: {
              title: "환영합니다!",
              message: "MCP 앱이 성공적으로 설정되었습니다.",
            },
          }),
        },
      ],
    };
  }

  if (uri === "widget://counter") {
    return {
      contents: [
        {
          uri: "widget://counter",
          mimeType: "application/vnd.mcp.widget+json",
          text: JSON.stringify({
            type: "counter-widget",
            props: {
              initialCount: 0,
            },
          }),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

/**
 * 서버 시작
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP 앱 서버가 시작되었습니다.");
}

main().catch((error) => {
  console.error("서버 시작 중 오류:", error);
  process.exit(1);
});
