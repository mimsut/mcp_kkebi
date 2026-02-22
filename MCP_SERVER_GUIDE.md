# 🛠️ MCP 서버 만들기 - 완전 가이드

MCP(Model Context Protocol) 서버를 처음부터 만드는 방법을 단계별로 설명합니다.

## 📚 목차

1. [기본 개념](#기본-개념)
2. [1단계: 서버 초기화](#1단계-서버-초기화)
3. [2단계: 도구(Tools) 추가](#2단계-도구tools-추가)
4. [3단계: 리소스(Resources) 추가](#3단계-리소스resources-추가)
5. [4단계: 위젯 만들기](#4단계-위젯-만들기)
6. [실전 예제](#실전-예제)

---

## 기본 개념

### MCP 서버란?

MCP 서버는 AI 모델(ChatGPT, Claude 등)에게 **도구(Tools)**와 **리소스(Resources)**를 제공하는 프로그램입니다.

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Claude    │  ←───→  │ MCP Server  │  ←───→  │  External   │
│  (Client)   │   MCP   │  (Your App) │         │  Services   │
└─────────────┘         └─────────────┘         └─────────────┘
```

### 핵심 컴포넌트

1. **Server**: MCP 서버 인스턴스
2. **Transport**: 통신 방법 (Stdio, HTTP 등)
3. **Tools**: AI가 실행할 수 있는 함수
4. **Resources**: AI가 읽을 수 있는 데이터 (위젯 포함)

---

## 1단계: 서버 초기화

### 기본 서버 생성

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 1. 서버 인스턴스 생성
const server = new Server(
  {
    name: "my-mcp-server",      // 서버 이름
    version: "1.0.0",            // 버전
  },
  {
    capabilities: {
      tools: {},                 // 도구 기능 활성화
      resources: {},             // 리소스 기능 활성화
      prompts: {},               // 프롬프트 기능 (선택)
    },
  }
);

// 2. 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP 서버 시작!");
}

main().catch(console.error);
```

### 설명

- **Server**: MCP 서버의 핵심 클래스
- **StdioServerTransport**: stdin/stdout을 통한 통신
- **capabilities**: 서버가 제공하는 기능들

---

## 2단계: 도구(Tools) 추가

도구는 AI가 **실행할 수 있는 함수**입니다.

### 필수 import

```typescript
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
```

### 도구 목록 정의

```typescript
// AI가 "어떤 도구가 있나요?"라고 물을 때
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",              // 도구 이름 (unique)
        description: "날씨 정보를 가져옵니다",  // AI가 읽을 설명
        inputSchema: {                    // 입력 파라미터 스키마
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "도시 이름",
            },
            unit: {
              type: "string",
              enum: ["celsius", "fahrenheit"],
              description: "온도 단위",
            },
          },
          required: ["city"],             // 필수 파라미터
        },
      },
    ],
  };
});
```

### 도구 실행 핸들러

```typescript
// AI가 도구를 실행할 때
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_weather") {
    const city = String(args?.city);
    const unit = String(args?.unit || "celsius");

    // 실제 로직 (API 호출, 계산 등)
    const weather = await fetchWeatherFromAPI(city, unit);

    // 결과 반환
    return {
      content: [
        {
          type: "text",
          text: `${city}의 날씨: ${weather.temp}도, ${weather.condition}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});
```

### 도구 예제 모음

#### 1. 간단한 계산 도구

```typescript
{
  name: "calculate",
  description: "수식을 계산합니다",
  inputSchema: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "계산할 수식 (예: 2 + 2)",
      },
    },
    required: ["expression"],
  },
}

// 핸들러
if (name === "calculate") {
  const expr = String(args?.expression);
  const result = eval(expr); // ⚠️ 실제로는 안전한 파서 사용!
  return {
    content: [{ type: "text", text: `결과: ${result}` }],
  };
}
```

#### 2. API 호출 도구

```typescript
{
  name: "search_github",
  description: "GitHub 저장소를 검색합니다",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "검색어",
      },
      limit: {
        type: "number",
        description: "결과 개수",
        default: 10,
      },
    },
    required: ["query"],
  },
}

// 핸들러
if (name === "search_github") {
  const query = String(args?.query);
  const limit = Number(args?.limit || 10);
  
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${limit}`
  );
  const data = await response.json();
  
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data.items, null, 2),
      },
    ],
  };
}
```

#### 3. 데이터베이스 도구

```typescript
{
  name: "query_database",
  description: "데이터베이스를 조회합니다",
  inputSchema: {
    type: "object",
    properties: {
      sql: {
        type: "string",
        description: "SQL 쿼리",
      },
    },
    required: ["sql"],
  },
}

// 핸들러
if (name === "query_database") {
  const sql = String(args?.sql);
  
  // 실제로는 SQL 인젝션 방지 필요!
  const results = await db.query(sql);
  
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(results, null, 2),
      },
    ],
  };
}
```

---

## 3단계: 리소스(Resources) 추가

리소스는 AI가 **읽을 수 있는 데이터**입니다. 파일, 위젯, 문서 등이 될 수 있습니다.

### 필수 import

```typescript
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
```

### 리소스 목록 정의

```typescript
// AI가 "무슨 리소스가 있나요?"라고 물을 때
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "file://logs/app.log",      // 리소스 URI (unique)
        name: "Application Logs",         // 이름
        description: "앱 로그 파일",        // 설명
        mimeType: "text/plain",           // MIME 타입
      },
      {
        uri: "widget://dashboard",
        name: "Dashboard Widget",
        description: "대시보드 위젯",
        mimeType: "application/vnd.mcp.widget+json",
      },
    ],
  };
});
```

### 리소스 읽기 핸들러

```typescript
// AI가 리소스를 읽을 때
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "file://logs/app.log") {
    const logs = await fs.readFile("logs/app.log", "utf-8");
    return {
      contents: [
        {
          uri: uri,
          mimeType: "text/plain",
          text: logs,
        },
      ],
    };
  }

  if (uri === "widget://dashboard") {
    return {
      contents: [
        {
          uri: uri,
          mimeType: "application/vnd.mcp.widget+json",
          text: JSON.stringify({
            type: "dashboard-widget",
            props: {
              title: "Dashboard",
              data: { users: 100, revenue: 5000 },
            },
          }),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});
```

### 리소스 예제 모음

#### 1. 파일 시스템 리소스

```typescript
// 특정 디렉토리의 파일들을 리소스로 제공
const files = await fs.readdir("./data");
return {
  resources: files.map((file) => ({
    uri: `file://data/${file}`,
    name: file,
    description: `Data file: ${file}`,
    mimeType: "application/json",
  })),
};
```

#### 2. 동적 리소스

```typescript
// 현재 시스템 상태를 리소스로 제공
{
  uri: "system://status",
  name: "System Status",
  description: "현재 시스템 상태",
  mimeType: "application/json",
}

// 읽기 핸들러
if (uri === "system://status") {
  const status = {
    cpu: os.loadavg(),
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
    },
    uptime: os.uptime(),
  };
  
  return {
    contents: [{
      uri: uri,
      mimeType: "application/json",
      text: JSON.stringify(status, null, 2),
    }],
  };
}
```

---

## 4단계: 위젯 만들기

위젯은 **인터랙티브 UI 컴포넌트**입니다.

### 위젯 구조

```
resources/
└── my-widget/
    ├── widget.tsx    # React 컴포넌트
    └── types.ts      # TypeScript 타입
```

### 1. 타입 정의 (types.ts)

```typescript
export interface MyWidgetProps {
  title: string;
  count: number;
}
```

### 2. 위젯 컴포넌트 (widget.tsx)

```tsx
import React, { useState } from "react";
import type { MyWidgetProps } from "./types";

export default function MyWidget({ title, count }: MyWidgetProps) {
  const [value, setValue] = useState(count);

  return (
    <div style={{ padding: "20px", background: "#f0f0f0" }}>
      <h2>{title}</h2>
      <p>Count: {value}</p>
      <button onClick={() => setValue(value + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### 3. 서버에 위젯 등록

```typescript
// 리소스 목록에 추가
{
  uri: "widget://my-widget",
  name: "My Widget",
  description: "커스텀 위젯",
  mimeType: "application/vnd.mcp.widget+json",
}

// 읽기 핸들러에서 반환
if (uri === "widget://my-widget") {
  return {
    contents: [
      {
        uri: uri,
        mimeType: "application/vnd.mcp.widget+json",
        text: JSON.stringify({
          type: "my-widget",           // resources/my-widget/widget.tsx
          props: {                     // MyWidgetProps
            title: "Hello World",
            count: 0,
          },
        }),
      },
    ],
  };
}
```

---

## 실전 예제

### 완전한 날씨 앱 MCP 서버

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "weather-app", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {} } }
);

// 날씨 데이터 저장소 (간단한 예제)
let lastWeatherData: any = null;

// 도구: 날씨 가져오기
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_weather",
      description: "도시의 날씨를 가져옵니다",
      inputSchema: {
        type: "object",
        properties: {
          city: { type: "string", description: "도시 이름" },
        },
        required: ["city"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_weather") {
    const city = String(request.params.arguments?.city);
    
    // API 호출 (예제)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
    );
    const data = await response.json();
    
    // 데이터 저장
    lastWeatherData = {
      city,
      temp: Math.round(data.main.temp - 273.15),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
    };
    
    return {
      content: [
        {
          type: "text",
          text: `${city}: ${lastWeatherData.temp}°C, ${lastWeatherData.condition}`,
        },
      ],
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// 리소스: 날씨 위젯
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "widget://weather",
      name: "Weather Widget",
      description: "날씨 위젯",
      mimeType: "application/vnd.mcp.widget+json",
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "widget://weather") {
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/vnd.mcp.widget+json",
          text: JSON.stringify({
            type: "weather-widget",
            props: lastWeatherData || { city: "Unknown", temp: 0 },
          }),
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${request.params.uri}`);
});

// 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server started!");
}

main().catch(console.error);
```

---

## 🎯 핵심 패턴 요약

### 1. 서버 생성
```typescript
const server = new Server(
  { name, version },
  { capabilities: { tools: {}, resources: {} } }
);
```

### 2. 도구 추가
```typescript
// 목록
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{ name, description, inputSchema }],
}));

// 실행
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // 로직
  return { content: [{ type: "text", text: "..." }] };
});
```

### 3. 리소스 추가
```typescript
// 목록
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [{ uri, name, description, mimeType }],
}));

// 읽기
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  // 로직
  return { contents: [{ uri, mimeType, text: "..." }] };
});
```

### 4. 서버 시작
```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

---

## 🚀 다음 단계

1. **에러 처리 추가하기**
   ```typescript
   try {
     // 로직
   } catch (error) {
     return {
       content: [{ type: "text", text: `Error: ${error.message}` }],
       isError: true,
     };
   }
   ```

2. **환경 변수 사용하기**
   ```typescript
   const API_KEY = process.env.API_KEY;
   if (!API_KEY) throw new Error("API_KEY required");
   ```

3. **프롬프트 추가하기**
   ```typescript
   import { ListPromptsRequestSchema, GetPromptRequestSchema } from "@modelcontextprotocol/sdk/types.js";
   
   server.setRequestHandler(ListPromptsRequestSchema, async () => ({
     prompts: [
       {
         name: "code_review",
         description: "코드 리뷰를 수행합니다",
       },
     ],
   }));
   ```

4. **로깅 추가하기**
   ```typescript
   server.onclose = () => {
     console.error("Server closed");
   };
   ```

---

## 📚 추가 리소스

- [MCP 공식 문서](https://modelcontextprotocol.io)
- [SDK 레퍼런스](https://github.com/modelcontextprotocol/typescript-sdk)
- [예제 코드](https://github.com/mcp-use/mcp-use)

---

**이제 당신만의 MCP 서버를 만들 준비가 되었습니다!** 🎉
