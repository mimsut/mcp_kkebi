#!/bin/bash

echo "🚀 GitHub에 푸시 중..."
echo ""

# 원격 리포지토리가 이미 있다면 제거
git remote remove origin 2>/dev/null

# 새로 추가
git remote add origin https://github.com/mimsut/my-mcp-app.git

# 브랜치 설정
git branch -M main

# 푸시
echo "📤 푸시 시작..."
git push -u origin main

echo ""
echo "✅ 완료!"
echo ""
echo "🔗 링크:"
echo "   📦 https://github.com/mimsut/my-mcp-app"
echo "   📚 https://github.com/mimsut/my-mcp-app#readme"
echo ""
