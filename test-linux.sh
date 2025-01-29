#!/bin/bash

# バイナリのビルド
echo "Building binaries..."
npm run compile

# Docker Composeでテスト実行 (Singapore)
echo "Running the Asia/Singapore case..."
docker-compose up --build oasfi_singapore

# Docker Composeでテスト実行 (New York)
echo "Running the America/New_York case..."
docker-compose up --build oasfi_newyork

# 終了後にクリーンアップ
echo "Cleaning up resources..."
docker-compose down

echo "Test cases completed successfully."