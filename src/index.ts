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
    ],
  };
});

/**
 * 도구 실행 핸들러
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "greet") {
    const name = String(request.params.arguments?.name || "사용자");
    return {
      content: [
        {
          type: "text",
          text: `안녕하세요, ${name}님! MCP 앱에 오신 것을 환영합니다! 🎉`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
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
