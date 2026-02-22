#!/bin/bash

# GitHub 리포지토리 푸시 스크립트
# 사용법: ./push-to-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
  echo "❌ 사용법: ./push-to-github.sh YOUR_GITHUB_USERNAME"
  echo "예: ./push-to-github.sh john"
  exit 1
fi

USERNAME=$1
REPO_NAME="my-mcp-app"

echo "🚀 GitHub에 푸시 시작..."
echo "📦 리포지토리: https://github.com/$USERNAME/$REPO_NAME"
echo ""

# 원격 리포지토리 추가
echo "1️⃣ 원격 리포지토리 연결 중..."
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git" 2>/dev/null || \
git remote set-url origin "https://github.com/$USERNAME/$REPO_NAME.git"

# 브랜치 이름을 main으로 변경
echo "2️⃣ 브랜치를 main으로 설정 중..."
git branch -M main

# 푸시
echo "3️⃣ GitHub에 푸시 중..."
git push -u origin main

echo ""
echo "✅ 완료!"
echo ""
echo "🔗 링크:"
echo "   리포지토리: https://github.com/$USERNAME/$REPO_NAME"
echo "   README: https://github.com/$USERNAME/$REPO_NAME#readme"
echo "   Clone: git clone https://github.com/$USERNAME/$REPO_NAME.git"
echo ""
echo "🎉 이제 Manufact에 배포할 수 있습니다:"
echo "   👉 https://manufact.com"
echo ""
