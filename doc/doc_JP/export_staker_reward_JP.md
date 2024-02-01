## export-staker-reward スクリプト

* 特定のstaker address に対して発生したrewardを出力するスクリプトです。
* アドレスとして、Staker Address を指定する必要があります。
* OASトークンの価格を出力したい場合はCOINGECKOのAPIキーを取得して、以下のコマンドを実行します。(APIキーはcoingeckoと各自が契約してユーザー自身が取得してください)
* APY(stakingした時の年間金利)は10%で、その内訳としては、staker reward(90%)とvalidator reward(10%)である

```bash
export COINGECKO_API_KEY=xx
```

### 基本コマンド

**必須: スペースは入力しないでください.
正しい: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
正しくない: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,  0x4e5e774d3837bd9302b83cad94a112575411f07b  

#### MacOS:

```bash
./oasfi-macos  export-staker-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-macos  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b 
```

#### windows:

```bash
./oasfi-win.exe  export-staker-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-win.exe  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b 
```

#### linux:

```bash
./oasfi-linux  export-staker-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b 
```

### optional command:  

#### --from_date, --to_date

* --from_date、--to_dateを指定することで特定の期間のデータを取得できます。
* デフォルトはローカルタイムゾーンで、タイムゾーンを変更する場合は、--time_zone=timezone を使用できます。

#### --time_zone 
タイムゾーンの省略名を指定せず、タイムゾーンのIDをご指定してください。 
例: --time_zone=Asia/Tokyo（JSTではなく） 
参照先： https://timezonedb.com/time-zones

```bash
./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b --from_date=2023-08-16T10:00:00 --to_date=2023-10-16T10:00:00
```

#### --price

* --price はエクスポートする通貨を指定します。それ以外の場合、--price のデフォルト フラグは [jpy,usd,krw,eur,sgd] になります。
* 通貨はcoingeckoに対応のものが利用できます

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b --price=jpy
```

#### --from_epoch, --to_epoch

* 特定のepochの範囲を指定して、その範囲のデータをcsvに出力する。

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --from_epoch=246 --to_epoch=247
```

#### --export_csv_online

* --export_csv_online=trueを指定しているとオンラインでエクスポートされます。--export_csv_online フラグを設定しない場合、デフォルトはローカルにエクスポートされます。 

* 但し、--export_csv_online=trueを指定していても、SPREADSHEET_IDとGOOGLE_APPLICATION_CREDENTIALSが環境変数として入っていないとオンラインにエクスポートされないので、
* GOOGLE_APPLICATION_CREDENTIALSは各自Google Cloud Platformから取得してください
```
export SPREADSHEET_ID=xx
export GOOGLE_APPLICATION_CREDENTIALS=xx
```
を実行してください。

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b --export_csv_online=true
```

#### --output

* 出力するファイル先を指定
* デフォルトはstaker-reward.csv

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b -o=output.csv
```

#### --chain
* チェーンを指定する可能です。指定されていない場合、デフォルトはhub_mainnetで指定されます。

```bash
export HUB_MAINNET_GRAPH_URL=xx

./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b -c=hub_mainnet
```

他のチェーンのURLは以下となります:
```
  export HUB_MAINNET_GRAPH_URL=xx
  export HUB_TESTNET_GRAPH_URL=xx
  export TCGV_MAINNET_GRAPH_URL=xx
  export TCGV_TESTNET_GRAPH_URL=xx
  export SANDV_TESTNET_GRAPH_URL=xx
  export SANDV_MAINNET_GRAPH_URL=xx
  export MCH_MAINNET_GRAPH_URL=xx
  export MCH_TESTNET_GRAPH_URL=xx
  export HOME_MAINNET_GRAPH_URL=xx
  export HOME_TESTNET_GRAPH_URL=xx
  export SAAKURU_MAINNET_GRAPH_URL=xx
  export SAAKURU_TESTNET_GRAPH_URL=xx ```

### 参考

#### sheet API
* SPREADSHEET_IDの環境変数を取得するために使用
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* GOOGLE_APPLICATION_CREDENTIALSの環境変数を取得するために使用
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html