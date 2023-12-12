## export-validator-rewardスクリプト

* 特定のaddressのstaker rewardの記録を出力するスクリプトです。
* アドレスとして、Validator Ownerを指定する必要があります
  * Validator Ownerについて https://docs.oasys.games/docs/architecture/hub-layer/validator-account#validator-owner

* OASトークンの価格を出力したい場合はCOINGECKOのAPIキーを取得して、以下のコマンドを実行します。(APIキーはcoingeckoと各自が契約してユーザー自身が取得してください)
```bash
export COINGECKO_API_KEY=xx
```

### 基本コマンド

**必須: スペースは入力しないでください.
正しい: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
正しくない: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,  0x4e5e774d3837bd9302b83cad94a112575411f07b  

#### MacOS:

```bash
./oasfi-macos  export-validator-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-macos  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

#### windows:

```bash
./oasfi-win.exe  export-validator-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-win.exe  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

#### linux:

```bash
./oasfi-linux  export-validator-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

### optional command:  

#### from_date, to_date

* --from_date、--to_dateを指定することで特定の期間のデータを取得するのに役立ちます。
* デフォルトはローカルタイムゾーンで、タイムゾーンを変更する場合は、--time_zone=timezone を使用できます。

```bash
./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --from_date=2023-08-16T10:00:00 --to_date=2023-10-16T10:00:00
```

#### --price

* --price はエクスポートする通貨を指定します。それ以外の場合、--price のデフォルト フラグは [jpy,usd,krw,eur,sgd] になります。
* 通貨はcoingeckoに対応のものが利用できます

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --price=jpy
```

#### --from_epoch, --to_epoch

* 特定のepochの範囲を指定して、その範囲のデータをcsvに出力する。

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b   --from_epoch=246 --to_epoch=247
```

#### --price_time

* --price_time は価格を取得する時間(UTC)を渡します。 --price_time フラグが設定されていない場合、デフォルトは 00:00:00 UTC になります。

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b --price_time=10:00:00
```

#### --export_csv_online

* --export_csv_online=trueを指定しているとオンラインでエクスポートされます。--export_csv_online フラグを設定しない場合、デフォルトはローカルにエクスポートされます。 

* 但し、--export_csv_online=trueを指定していても、SPREADSHEET_IDとGOOGLE_APPLICATION_CREDENTIALSが環境変数として入っていないとオンラインにエクスポートされないので、
* GOOGLE_APPLICATION_CREDENTIALSは各自Google Cloud Platformから取得してください
```
export SPREADSHEET_ID=xx
export GOOGLE_APPLICATION_CREDENTIALS=xx
```
を実行しましょう。

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --export_csv_online=true
```

#### --output

* 出力するファイル先を指定
* デフォルトはcommission-reward.csv　(validator rewardはcommission-rewardと同義)

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  -o=output.csv
```

### 参考

#### sheet API
* SPREADSHEET_IDの環境変数を取得するために使用
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* GOOGLE_APPLICATION_CREDENTIALSの環境変数を取得するために使用
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html


