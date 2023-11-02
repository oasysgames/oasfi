# ユーザー向けガイド


## Downloadの仕方

- [releases](https://github.com/oasysgames/explorer-csv-cli/releases)から最新のものをダウンロードしてください。
- MaxOS, Windows, Linux 3つに対応しておりますのでご自身のosに合うものをお選びください。

## correct-csvスクリプト

blockscout v5から取得されるtoken transferのデータに誤りがあり、そのデータを修正するために作成されたスクリプトです。
主に会計をするときに用いるプログラムです。
ダウンロードしたプログラム、blockscout v5から取得したtoken transferのデータ（input.csv）、修正データを出力するファイル(output.csv)を同一ディレクトリに配置して、そのディレクトリ下で以下のようなコマンドを動かしてください。

#### MacOS:

```bash
./oasys-csv-cli-macos correct-csv -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasys-csv-cli-macos correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

#### Windows:

```bash
./oasys-csv-cli-win.exe correct-csv -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasys-csv-cli-win.exe correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

#### Linux:

```bash
./oasys-csv-cli-linux correct-csv -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasys-csv-cli-linux correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

## export-commission-rewardスクリプト

* 特定のaddressのvalidator報酬とstaking報酬によって生じたお金の記録を出力するスクリプトです。
* OASトークンの価格を出力したい場合はCOINGECKOのAPIキーを取得して、以下のコマンドを実行します。(APIキーはcoingeckoと各自が契約してユーザー自身が取得してください)

```bash
export COINGECKO_API_KEY=xx
```

###　基本コマンド

#### MacOS:

```bash
./oasys-csv-cli-macos  export-commission-reward address -c=chain_name

# example
# ./oasys-csv-cli-macos  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet 
```

#### windows:

```bash
./oasys-csv-cli-win.exe  export-commission-reward address -c=chain_name

# example
# ./oasys-csv-cli-win.exe  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet 
```

#### linux:

```bash
./oasys-csv-cli-linux  export-commission-reward address -c=chain_name

# example
# ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet 
```

### optional command:  

#### from_data, to_data

* --from_data、--to_dataを指定することで特定の期間のデータを取得するのに役立ちます。
* デフォルトはローカルタイムゾーンで、タイムゾーンを変更する場合は、--time_zone=timezone を使用できます。

```bash
./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet --from_data=2023-08-16T10:00:00 --to_data=2023-10-16T10:00:00
```

#### --price

* --price はエクスポートする通貨を指定します。それ以外の場合、--price のデフォルト フラグは [jpy,usd,krw,eur,sgd] になります。
* 通貨はcoingeckoに対応のものが利用できます

```bash
 ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet --price=jpy
```

#### --from_epoch, --to_epoch

* 特定のepochの範囲を指定して、その範囲のデータをcsvに出力する。

```bash
 ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet  --from_epoch=246 --to_epoch=247
```

#### --price_time

* --price_time は価格を取得する時間(UTC)を渡します。 --price_time フラグが設定されていない場合、デフォルトは 00:00:00 UTC になります。

```bash
 ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c --price_time=10:00:00
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
 ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet --export_csv_online=true
```

#### --output

* 出力するファイル先を指定
* デフォルトはcommision-reward-(address).csv

```bash
 ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet -o=output.csv
```

### 参考

#### sheet API
* SPREADSHEET_IDの環境変数を取得するために使用
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* GOOGLE_APPLICATION_CREDENTIALSの環境変数を取得するために使用
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html












