### **ビルドと実行**

1. **Dockerイメージのビルド**
   以下のコマンドを使用してDockerイメージをビルドします。

   ```bash
   docker build -t oasfi-web-api -f Dockerfile .

   docker run -d --name redis -p 6379:6379 redis

   or 
   docker compose build
   ```


2. **コンテナの実行**
   コンテナを起動します。

   ```bash
   docker run -d --name oasfi-web-api --link redis:redis -p 3000:3000 oasfi-web-api
   
   or 
   docker compose up -d
   ```

3. **APIの確認**
   コンテナが起動したら、APIにリクエストを送って動作を確認します。

   - リクエスト例（`curl` を使用）:
     ```bash
     curl -X POST http://localhost:3000/api/run-export-staker-reward \
        -H "Content-Type: application/json" \
        -d '{
        "staker_addresses": "0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b",
        "from_date": "2024-11-11T10:00:00",
        "to_date": "2025-01-16T10:00:00",
        "time_zone": "Asia/Singapore"
        }'

    
    curl http://localhost:3000/api/job-status/<job_id>

     ```


