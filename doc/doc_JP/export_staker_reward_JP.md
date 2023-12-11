## export-staker-reward スクリプト

* 特定のstaker address に対して発生したrewardを出力するスクリプトです。
* アドレスとして、Staker Address を指定する必要があります。
* OASトークンの価格を出力したい場合はCOINGECKOのAPIキーを取得して、以下のコマンドを実行します。(APIキーはcoingeckoと各自が契約してユーザー自身が取得してください)
* APY(stakingした時の年間金利)は10%で、その内訳としては、staker reward(90%)とvalidator reward(10%)である

```bash
export COINGECKO_API_KEY=xx
```

### 基本コマンド

#### MacOS:

```bash
./oasfi-macos  export-staker-reward staker_addresses -c=chain_name

# example
# ./oasfi-macos  export-staker-reward staker_addresses -c=hub_mainnet 
```

#### windows:

```bash
./oasfi-win.exe  export-staker-reward staker_addresses -c=chain_name

# example
# ./oasfi-win.exe  export-staker-reward staker_addresses -c=hub_mainnet 
```

#### linux:

```bash
./oasfi-linux  export-staker-reward staker_addresses -c=chain_name

# example
# ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet 
```

### optional command:  

#### from_date, to_date

* --from_date、--to_dateを指定することで特定の期間のデータを取得できます。
* デフォルトはローカルタイムゾーンで、タイムゾーンを変更する場合は、--time_zone=timezone を使用できます。

```bash
./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet --from_date=2023-08-16T10:00:00 --to_date=2023-10-16T10:00:00
```

#### --price

* --price はエクスポートする通貨を指定します。それ以外の場合、--price のデフォルト フラグは [jpy,usd,krw,eur,sgd] になります。
* 通貨はcoingeckoに対応のものが利用できます

```bash
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet --price=jpy
```

#### --from_epoch, --to_epoch

* 特定のepochの範囲を指定して、その範囲のデータをcsvに出力する。

```bash
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet  --from_epoch=246 --to_epoch=247
```

#### --price_time

* --price_time は価格を取得する時間(UTC)を渡します。 --price_time フラグが設定されていない場合、デフォルトは 00:00:00 UTC になります。

```bash
 ./oasfi-linux  export-staker-reward staker_addresses --price_time=10:00:00
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
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet --export_csv_online=true
```

#### --output

* 出力するファイル先を指定
* デフォルトはstaker-reward.csv

```bash
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet -o=output.csv
```

### 参考

#### sheet API
* SPREADSHEET_IDの環境変数を取得するために使用
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* GOOGLE_APPLICATION_CREDENTIALSの環境変数を取得するために使用
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html