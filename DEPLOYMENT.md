# 🚀 MCP 서버 배포 가이드

## 현재 상태 ✅

- ✅ Git 리포지토리 초기화 완료
- ✅ 모든 파일 커밋 완료
- ✅ 로컬 빌드 완료

## 📦 배포 옵션

---

## 방법 1: GitHub에 올리기 (가장 빠름!)

### Step 1: GitHub에서 새 리포지토리 생성

1. [github.com](https://github.com/new)에 접속
2. Repository name: `my-mcp-app` (원하는 이름)
3. Public으로 설정
4. **"Add a README file" 체크 해제** (이미 있음)
5. "Create repository" 클릭

### Step 2: 리포지토리 연결 & 푸시

```bash
cd /Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app

# GitHub 리포지토리 연결 (YOUR_USERNAME을 실제 계정으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/my-mcp-app.git

# 푸시
git branch -M main
git push -u origin main
```

### Step 3: GitHub 링크 공유

푸시 후 다음 링크들을 사용할 수 있습니다:

```
리포지토리: https://github.com/YOUR_USERNAME/my-mcp-app
README: https://github.com/YOUR_USERNAME/my-mcp-app#readme
```

---

## 방법 2: Manufact Cloud에 배포 (프로덕션용)

### 장점
- ✅ 자동 배포
- ✅ 무료 호스팅
- ✅ ChatGPT/Claude에서 바로 사용 가능
- ✅ 24/7 실행

### Step 1: GitHub에 먼저 올리기
위의 "방법 1" 완료

### Step 2: Manufact 배포

#### 옵션 A: CLI 사용
```bash
cd /Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app

# Manufact CLI 배포
npx @mcp-use/cli deploy
```

#### 옵션 B: 웹 인터페이스 사용

1. [manufact.com](https://manufact.com)에 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 리포지토리 선택: `my-mcp-app`
5. "Deploy" 클릭

### Step 3: 배포 완료!

배포 후 다음 링크를 받을 수 있습니다:

```
배포 URL: https://your-app.mcp-cloud.com
대시보드: https://manufact.com/dashboard/your-app
```

---

## 방법 3: 로컬에서 실행 (개발용)

### Claude Desktop에 연결

```bash
# 1. 빌드 확인
cd /Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app
npm run build

# 2. Claude Desktop 설정 열기
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# 3. 다음 내용 추가:
```

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

```bash
# 4. Claude Desktop 재시작
```

### 로컬 URL
로컬에서 실행 중일 때:
```
로컬 경로: /Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app
```

---

## 🔗 링크 정리

### GitHub에 올린 후:
- **리포지토리**: `https://github.com/YOUR_USERNAME/my-mcp-app`
- **README**: `https://github.com/YOUR_USERNAME/my-mcp-app#readme`
- **Clone**: `git clone https://github.com/YOUR_USERNAME/my-mcp-app.git`

### Manufact에 배포 후:
- **앱 URL**: `https://your-app.mcp-cloud.com`
- **대시보드**: `https://manufact.com/dashboard/your-app`
- **API 엔드포인트**: `https://api.mcp-cloud.com/your-app`

### 로컬 실행:
- **프로젝트 경로**: `/Users/user/Downloads/b_ru8Xi2QdWzH-1771717682115/my-mcp-app`
- **서버 실행**: `npm start` 또는 `npm run dev`

---

## ✅ 다음 단계 (추천 순서)

1. **GitHub에 올리기** ⭐️ (5분)
   ```bash
   # GitHub에서 리포지토리 생성 후
   git remote add origin https://github.com/YOUR_USERNAME/my-mcp-app.git
   git push -u origin main
   ```

2. **Manufact에 배포** (10분)
   - manufact.com에서 GitHub 연결
   - 자동 배포 설정

3. **링크 공유**
   - GitHub 리포지토리 링크
   - Manufact 배포 URL
   - README 문서

---

## 🎉 완료!

이제 다른 사람들과 공유할 수 있습니다:

```
🔗 내 MCP 앱: https://github.com/YOUR_USERNAME/my-mcp-app
📚 가이드: https://github.com/YOUR_USERNAME/my-mcp-app#readme
🚀 데모: https://your-app.mcp-cloud.com
```

---

## 💡 팁

### README 뱃지 추가
GitHub README에 멋진 뱃지를 추가하세요:

```markdown
![MCP](https://img.shields.io/badge/MCP-Compatible-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
```

### GitHub Topics 추가
리포지토리 설정에서 다음 토픽 추가:
- `mcp`
- `mcp-server`
- `mcp-apps`
- `chatgpt`
- `claude`
- `ai-tools`

### 자동 배포 설정
Manufact에서 GitHub Actions를 통한 자동 배포:
- main 브랜치에 push → 자동 배포
- PR 생성 → 미리보기 배포

---

## 🆘 문제 해결

### "Permission denied" 오류
```bash
git remote set-url origin https://YOUR_USERNAME@github.com/YOUR_USERNAME/my-mcp-app.git
```

### GitHub 인증 필요
```bash
# GitHub CLI 사용
gh auth login

# 또는 Personal Access Token 사용
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/my-mcp-app.git
```

### Manufact 배포 실패
1. `package.json`에 `start` 스크립트 확인
2. Node.js 버전 확인 (v18 이상)
3. 빌드 스크립트 확인

---

**질문이나 도움이 필요하면 언제든 물어보세요!** 🚀
