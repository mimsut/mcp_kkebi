# 🎉 MCP Kkebi - 모든 링크 & 정보

## 🔗 주요 링크

### GitHub 리포지토리
```
https://github.com/mimsut/mcp_kkebi
```

### Clone 명령어
```bash
git clone https://github.com/mimsut/mcp_kkebi.git
```

### README
```
https://github.com/mimsut/mcp_kkebi#readme
```

---

## 📦 설치 방법

### 방법 1: 원클릭 설치 (추천!)
```bash
git clone https://github.com/mimsut/mcp_kkebi.git
cd mcp_kkebi
./install.sh
```

### 방법 2: 수동 설치
```bash
git clone https://github.com/mimsut/mcp_kkebi.git
cd mcp_kkebi
npm install
npm run build
```

---

## 🎯 사용 가능한 도구 (Tools)

### 1. greet
사용자를 환영하는 메시지

**사용 예시:**
```
"greet 도구를 사용해서 나를 환영해줘. 내 이름은 지수야."
```

### 2. get_time
현재 시간을 알려줌

**사용 예시:**
```
"get_time 도구로 현재 서울 시간 알려줘"
"뉴욕의 현재 시간은?"
```

### 3. calculate
수학 계산

**사용 예시:**
```
"calculate 도구로 123 * 456을 계산해줘"
"(10 + 20) * 3은 얼마야?"
```

---

## 🎨 사용 가능한 위젯 (Widgets)

### 1. Example Widget
```
widget://example
```
환영 메시지를 보여주는 예제 위젯

**사용 예시:**
```
"example 위젯을 보여줘"
```

### 2. Counter Widget
```
widget://counter
```
인터랙티브 카운터 위젯 (클릭 가능!)

**사용 예시:**
```
"counter 위젯을 표시해줘"
```

---

## 🖥️ Claude Desktop 연결

### 1. 설정 파일 열기
```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### 2. 다음 내용 추가
```json
{
  "mcpServers": {
    "mcp_kkebi": {
      "command": "node",
      "args": [
        "/Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app/dist/index.js"
      ]
    }
  }
}
```

### 3. Claude Desktop 재시작

### 4. 테스트
Claude에서 다음과 같이 테스트:
```
"greet 도구로 나를 환영해줘"
"현재 시간 알려줘"
"2 + 2를 계산해줘"
"counter 위젯 보여줘"
```

---

## 🚀 Manufact Cloud 배포

### 웹에서 배포
1. 👉 [manufact.com](https://manufact.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. `mimsut/mcp_kkebi` 선택
5. "Deploy" 클릭

### CLI로 배포
```bash
cd /Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app
npx @mcp-use/cli deploy
```

---

## 📚 문서

리포지토리에 포함된 문서들:

- **README.md** - 전체 가이드
- **QUICKSTART.md** - 5분 빠른 시작
- **MCP_SERVER_GUIDE.md** - MCP 서버 만들기 완전 가이드
- **DEPLOYMENT.md** - 배포 가이드
- **CONTRIBUTING.md** - 기여 가이드

---

## 🎁 포함된 기능

✅ **3개의 도구**
- greet (환영 메시지)
- get_time (시간 조회)
- calculate (계산기)

✅ **2개의 위젯**
- Example Widget (환영 위젯)
- Counter Widget (인터랙티브 카운터)

✅ **완벽한 문서**
- 사용법, 설치법, 개발 가이드

✅ **배포 준비 완료**
- GitHub Actions
- Manufact Cloud 지원

✅ **오픈소스**
- MIT License
- 기여 환영!

---

## 🎊 완료!

모든 설정이 완료되었습니다!

### 다음 할 일:

1. ✅ GitHub에 업로드 완료
2. ✅ 3개의 도구 추가 완료
3. ✅ 2개의 위젯 준비 완료
4. ✅ 문서 작성 완료
5. ⏳ Claude Desktop에서 테스트 (당신이 할 차례!)
6. ⏳ Manufact에 배포 (선택사항)

---

## 🔗 공유하기

다른 사람들과 공유할 때:

```
🎉 MCP 앱을 만들었어요!
👉 https://github.com/mimsut/mcp_kkebi

ChatGPT & Claude에서 사용할 수 있는 인터랙티브 위젯과 도구들!
- 계산기 도구
- 시간 조회
- 인터랙티브 카운터

#MCP #ChatGPT #Claude #AI
```

---

## 📧 문의

- GitHub Issues: https://github.com/mimsut/mcp_kkebi/issues
- Repository: https://github.com/mimsut/mcp_kkebi

---

**🎉 축하합니다! MCP Kkebi가 완성되었습니다!**
