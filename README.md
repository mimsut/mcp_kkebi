# My MCP App 🚀

ChatGPT와 Claude에서 실행되는 인터랙티브 UI 애플리케이션을 구축하는 MCP 앱입니다.

## 📦 프로젝트 구조

```
my-mcp-app/
├── src/
│   └── index.ts              # MCP 서버 진입점 (TypeScript)
├── dist/
│   └── index.js              # 빌드된 서버 (JavaScript)
├── resources/
│   ├── example-widget/       # 예제 위젯
│   │   ├── widget.tsx        # React 컴포넌트
│   │   └── types.ts          # Props 타입
│   └── counter-widget/       # 인터랙티브 카운터 위젯
│       ├── widget.tsx
│       └── types.ts
├── package.json
├── tsconfig.json
├── mcp-config.json           # MCP 설정 파일
└── README.md
```

## 🏗️ 아키텍처

- **Server**: MCP 도구(tools)와 리소스(resources) 정의 (`src/index.ts`)
- **Widget**: `resources/` 폴더의 React 컴포넌트로 클라이언트에서 렌더링
- **Protocol**: MCP가 자동으로 통신 처리

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 빌드

```bash
npm run build
```

### 3. 개발 모드 실행 (핫 리로드)

```bash
npm run dev
```

### 4. 프로덕션 실행

```bash
npm start
```

## 🔧 Claude Desktop에 연결하기

### macOS

1. Claude Desktop 설정 파일 열기:
```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. 다음 설정 추가:
```json
{
  "mcpServers": {
    "my-mcp-app": {
      "command": "node",
      "args": [
        "/Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app/dist/index.js"
      ]
    }
  }
}
```

3. Claude Desktop 재시작

### Windows

설정 파일 위치: `%APPDATA%\Claude\claude_desktop_config.json`

## 💬 ChatGPT에 연결하기

1. ChatGPT 설정에서 "Custom Actions" 또는 "GPT" 섹션으로 이동
2. MCP 서버 추가:
   - 서버 URL: 로컬 또는 배포된 URL
   - 프로토콜: MCP (Model Context Protocol)

## 🎨 위젯 사용하기

### Example Widget
환영 메시지와 기본 정보를 표시하는 간단한 위젯입니다.

**사용법:**
```
widget://example
```

**특징:**
- 그라디언트 배경
- 환영 메시지
- 상태 표시

### Counter Widget
사용자 상호작용을 보여주는 인터랙티브 카운터 위젯입니다.

**사용법:**
```
widget://counter
```

**특징:**
- 증가/감소 버튼
- 초기화 기능
- 실시간 상태 업데이트
- 부드러운 애니메이션

## 🛠️ 도구 (Tools)

### greet
사용자에게 환영 메시지를 표시합니다.

**파라미터:**
- `name` (string, 필수): 사용자 이름

**예제:**
```json
{
  "name": "홍길동"
}
```

**응답:**
```
안녕하세요, 홍길동님! MCP 앱에 오신 것을 환영합니다! 🎉
```

## 🧪 테스트하기

### 로컬 테스트

```bash
# 개발 모드로 실행
npm run dev

# 다른 터미널에서 MCP Inspector 사용
npx @modelcontextprotocol/inspector node dist/index.js
```

### Inspector에서 확인

MCP Inspector를 사용하면 다음을 할 수 있습니다:
- 모든 도구와 리소스 목록 확인
- 테스트 입력으로 도구 호출
- 위젯 미리보기 라이브로 확인
- 코드 변경 시 즉시 핫 리로드

## 📝 새로운 위젯 추가하기

1. `resources/` 폴더에 새 디렉토리 생성:
```bash
mkdir resources/my-widget
```

2. `types.ts` 파일 생성:
```typescript
export interface MyWidgetProps {
  // props 정의
}
```

3. `widget.tsx` 파일 생성:
```tsx
import React from "react";
import type { MyWidgetProps } from "./types";

export default function MyWidget(props: MyWidgetProps) {
  return <div>{/* 위젯 UI */}</div>;
}
```

4. `src/index.ts`에 리소스 핸들러 추가:
```typescript
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  // ...
  if (uri === "widget://my-widget") {
    return {
      contents: [{
        uri: "widget://my-widget",
        mimeType: "application/vnd.mcp.widget+json",
        text: JSON.stringify({
          type: "my-widget",
          props: { /* props */ },
        }),
      }],
    };
  }
  // ...
});
```

## 🌐 배포하기

### Manufact Cloud에 배포

1. [manufact.com](https://manufact.com) 접속
2. GitHub 리포지토리 연결
3. `main` 브랜치에 push → 자동 배포

또는 CLI 사용:

```bash
npx @mcp-use/cli deploy
```

### 환경 변수 설정

프로덕션 환경에서 필요한 환경 변수가 있다면 `.env` 파일 생성:

```bash
# .env
API_KEY=your_api_key
DATABASE_URL=your_database_url
```

## 🎯 평가 기준 (해커톤)

프로젝트는 다음 기준으로 평가됩니다:

### 1. 독창성 (30점) 🌟
- 새로운 개념의 창의성
- "이런 것도 MCP 앱으로 만들 수 있구나!" 하는 놀라움

### 2. 실용성 (30점) 💡
- 실제 문제 해결 또는 워크플로우 개선
- 사용자에게 실질적인 가치 제공

### 3. 위젯-모델 상호작용 (20점) 🔄
- `useCallTool()`, `sendFollowUpMessage()` 등 양방향 통신 활용
- `state()`, `setState()` 활용
- 위젯과 AI 모델 간의 효과적인 상호작용

### 4. UI/UX (10점) 🎨
- 세련되고 직관적인 경험
- 반응형 디자인
- 접근성

### 5. 프로덕션 준비 (10점) 🚀
- OAuth 인증
- 온보딩 플로우
- 에러 처리
- 사용자 설정 관리

## 📚 추가 리소스

- [mcp-use 문서](https://docs.mcp-use.com)
- [GitHub 리포지토리](https://github.com/mcp-use/mcp-use)
- [해커톤 스타터 레포](https://github.com/mcp-use/hack-y)
- [Inspector (온라인)](https://inspector.mcp-use.com)
- [MCP 공식 문서](https://modelcontextprotocol.io)

## 🤝 기여하기

이슈나 PR은 언제나 환영합니다!

## 📄 라이센스

MIT License

---

## 🎉 빠른 시작 요약

```bash
# 1. 의존성 설치
npm install

# 2. 빌드
npm run build

# 3. Claude Desktop에 연결
# ~/Library/Application Support/Claude/claude_desktop_config.json 편집

# 4. Claude Desktop 재시작

# 5. Claude에서 테스트
# "greet" 도구 호출하거나 위젯 표시 요청
```

이제 ChatGPT와 Claude에서 실행되는 멋진 인터랙티브 MCP 앱을 만들 준비가 되었습니다! 🚀✨
