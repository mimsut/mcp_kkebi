#!/bin/bash

echo "🚀 MCP Kkebi 설치 시작..."
echo ""

# Node.js 버전 확인
NODE_VERSION=$(node -v 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
    echo "❌ Node.js가 설치되어 있지 않습니다."
    echo "👉 https://nodejs.org에서 Node.js를 설치해주세요."
    exit 1
fi

echo "✅ Node.js 버전: $NODE_VERSION"
echo ""

# 의존성 설치
echo "📦 의존성 설치 중..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 설치 실패"
    exit 1
fi

echo ""
echo "🔨 빌드 중..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패"
    exit 1
fi

echo ""
echo "✅ 설치 완료!"
echo ""
echo "🎯 다음 단계:"
echo ""
echo "1️⃣ Claude Desktop 설정:"
echo "   code ~/Library/Application\\ Support/Claude/claude_desktop_config.json"
echo ""
echo "2️⃣ 다음 내용 추가:"
echo '   {
     "mcpServers": {
       "mcp_kkebi": {
         "command": "node",
         "args": ["'$(pwd)'/dist/index.js"]
       }
     }
   }'
echo ""
echo "3️⃣ Claude Desktop 재시작"
echo ""
echo "4️⃣ Claude에서 테스트:"
echo '   "greet 도구를 사용해서 나를 환영해줘"'
echo ""
echo "🎉 완료!"
