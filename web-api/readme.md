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
     curl -X POST http://localhost:3000/api/export-staker-reward \
        -H "Content-Type: application/json" \
        -d '{
        "staker_addresses": "0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b",
        "from_date": "2024-11-11T10:00:00",
        "to_date": "2025-01-16T10:00:00",
        "time_zone": "Asia/Singapore"
        }'

    
    curl http://localhost:3000/api/job-status/<job_id>

     ```


### **動作確認**

#### **リクエスト例 (Staker Reward)**
```bash
curl -X POST http://localhost:3000/api/export-staker-reward \
-H "Content-Type: application/json" \
-d '{
  "staker_addresses": "0x123456789abcdef",
  "from_date": "2023-01-01",
  "to_date": "2023-01-31",
  "time_zone": "UTC"
}'
```

#### **リクエスト例 (Validator Reward)**
```bash
curl -X POST http://localhost:3000/api/export-validator-reward \
-H "Content-Type: application/json" \
-d '{
  "validator_addresses": "0x272d6bd040c2b8454f4f6f43115758fbe318ee2c",
  "from_epoch": 1,
  "to_epoch": 10,
  "from_date": "2023-01-01",
  "to_date": "2023-01-31",
  "time_zone": "UTC"
}'
```

#### **2. リクエスト例**
以下のようにクエリパラメータで `filename` を指定してリクエストを送信します。

```bash
curl -X GET "http://localhost:3000/api/download-csv?filename=staker-reward_7a5fd5f967b77a481c92743d1668b8089b3a840e2e637b2156320227424203be.csv" -o output.csv
```

- **`filename`**: S3 に保存されているファイル名を指定します。
- **`-o output.csv`**: ダウンロードしたファイルを `output.csv` として保存します。

#### **3. 正常時のレスポンス**
S3 にファイルが存在する場合、指定したファイルがレスポンスとして送信され、クライアントにダウンロードされます。

---

### **エラーハンドリングの例**

#### **1. ファイル名が指定されていない場合**
リクエスト:

```bash
curl -X GET "http://localhost:3000/api/download-csv"
```

レスポンス:

```json
{
  "status": "error",
  "message": "Filename is required."
}
```

#### **2. S3 にファイルが存在しない場合**
リクエスト:

```bash
curl -X GET "http://localhost:3000/api/download-csv?filename=non-existent-file.csv"
```

レスポンス:

```json
{
  "status": "error",
  "message": "Failed to download file from S3."
}
```


