# 🚀 빠른 시작 가이드

## 5분 안에 MCP 앱 실행하기!

### Step 1: 의존성 설치 & 빌드
```bash
npm install
npm run build
```

### Step 2: Claude Desktop 설정

#### macOS
```bash
# Claude Desktop 설정 파일 열기
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### 다음 내용을 추가하세요:
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

⚠️ **주의**: 경로를 실제 프로젝트 경로로 변경하세요!

```bash
# 현재 디렉토리의 절대 경로 확인
pwd
```

### Step 3: Claude Desktop 재시작
Claude Desktop을 완전히 종료하고 다시 시작하세요.

### Step 4: Claude에서 테스트

Claude Desktop에서 다음과 같이 테스트해보세요:

#### 도구 테스트
```
greet 도구를 사용해서 나를 환영해줘. 내 이름은 지수야.
```

예상 응답:
```
안녕하세요, 지수님! MCP 앱에 오신 것을 환영합니다! 🎉
```

#### 위젯 테스트
```
example 위젯을 보여줘
```

또는

```
counter 위젯을 표시해줘
```

## 🐛 문제 해결

### 1. Claude Desktop에 MCP 서버가 표시되지 않음
- Claude Desktop을 완전히 재시작했는지 확인
- 설정 파일 경로가 올바른지 확인
- JSON 형식이 올바른지 확인 (쉼표, 괄호 등)

### 2. "command not found" 오류
- `npm run build`를 실행했는지 확인
- `dist/index.js` 파일이 존재하는지 확인
- Node.js가 설치되어 있는지 확인: `node --version`

### 3. 위젯이 표시되지 않음
- Claude가 MCP Apps SDK를 지원하는 버전인지 확인
- 리소스 URI가 올바른지 확인: `widget://example` 또는 `widget://counter`

### 4. 개발 중 코드 변경사항이 반영되지 않음
```bash
# 다시 빌드
npm run build

# Claude Desktop 재시작
```

또는 개발 모드 사용:
```bash
npm run dev
```

## 📝 다음 단계

1. **새로운 위젯 만들기**
   - `resources/` 폴더에 새 위젯 추가
   - `src/index.ts`에 리소스 핸들러 추가

2. **새로운 도구 추가하기**
   - `ListToolsRequestSchema` 핸들러에 도구 정의 추가
   - `CallToolRequestSchema` 핸들러에 실행 로직 추가

3. **외부 API 연동하기**
   - 날씨, 뉴스, 데이터베이스 등 외부 서비스 연동
   - 환경 변수로 API 키 관리

4. **배포하기**
   - GitHub에 푸시
   - Manufact Cloud에 연결
   - 자동 배포 설정

## 🎯 해커톤 팁

### 높은 점수를 받기 위한 전략:

1. **독창성 (30점)**
   - 기존에 없던 독특한 사용 사례 찾기
   - AI와 위젯의 협업으로만 가능한 기능

2. **실용성 (30점)**
   - 실제 업무나 일상에서 사용할 수 있는 기능
   - 명확한 문제 해결

3. **상호작용 (20점)**
   - 위젯에서 도구 호출: `useCallTool()`
   - AI에게 메시지 전송: `sendFollowUpMessage()`
   - 상태 관리: `useState()`, `setState()`

4. **UI/UX (10점)**
   - 깔끔하고 직관적인 디자인
   - 반응형 레이아웃
   - 애니메이션과 피드백

5. **프로덕션 준비 (10점)**
   - OAuth 인증 구현
   - 온보딩 플로우
   - 에러 처리 및 로딩 상태

## 🌟 예제 아이디어

- 📊 **데이터 시각화 대시보드**: AI가 분석하고 위젯이 차트 표시
- 🎵 **음악 플레이어**: AI가 추천하고 위젯에서 재생
- 📝 **코드 에디터**: AI가 생성한 코드를 위젯에서 편집
- 🎨 **디자인 도구**: AI가 제안하고 위젯에서 커스터마이징
- 📅 **일정 관리**: AI가 이해하고 위젯에서 시각화
- 🗺️ **맵 인터페이스**: AI가 장소를 찾고 위젯에서 지도 표시

---

**질문이나 도움이 필요하면 언제든지 물어보세요!** 🚀
