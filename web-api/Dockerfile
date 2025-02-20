# ベースイメージとしてUbuntuを使用
FROM ubuntu:22.04

# 必要なパッケージをインストール（Node.jsを含む）
RUN apt-get update && apt-get install -y \
    curl \
    jq \
    bash \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /app

# oasfi バイナリをコピー
COPY ./oasfi-linux /app/oasfi
RUN chmod +x /app/oasfi

# Node.jsアプリケーションの依存関係をインストール
COPY package.json package-lock.json /app/
RUN npm install

# アプリケーションコードをコピー
COPY . /app

# サーバーポートを公開
EXPOSE 3000

# コンテナ起動時にAPIサーバーを実行
CMD ["node", "app.js"]
