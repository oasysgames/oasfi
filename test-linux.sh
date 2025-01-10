#!/bin/bash

# バイナリのビルド
npm run compile

# Docker Composeでテスト実行
docker-compose up --build

# 終了後にクリーンアップ
docker-compose down 