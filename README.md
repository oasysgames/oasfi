## 使い方

### Download

- [releases](https://github.com/oasysgames/explorer-csv-cli/releases) から latest の oasys-csv-cli-* を Download
- MaxOS, Windows, Linux のうちどれか
- DLする箇所: 任意（ここでは Downloads とする）
- csv は同一ディレクトリにあるとする

### Terminal から実行

- cmd + space で 「terminal」→ enter で実行
- Terminal で `cd Download` → enter
- 環境に合わせて以下を実行

#### MacOS:

```bash
./oasys-csv-cli-macos -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasys-csv-cli-macos -i=foo.csv -o=bar.csv -c=hub_mainnet
```

#### Windows:

```bash
oasys-csv-cli-win.exe -i=input.csv -o=output.csv -c=chain_name
```

#### Linux:

```bash
./oasys-csv-cli-linux -i=input.csv -o=output.csv -c=chain_name
```

ここで、input.csvは読み込むCSVファイルのパス、output.csvは出力されるCSVファイルのパスを指定します。

---

### for developer
#### 実行ファイル作成

```bash
nvm use 18
git clone https://github.com/oasysgames/explorer-csv-cli.git
cd explorer-csv-cli
npm i
npm i -g pkg
npm run compile
```

# sheet API
https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

# service account
https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html

# export
```
export SPREADSHEET_ID=xx
export GOOGLE_APPLICATION_CREDENTIALS=xx
```

#### 使い方

上記「使い方」と同上



 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet
 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet --from_epoch=100
 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet --to_epoch=100
 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet --from_epoch=100 --to_epoch=200
 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet --from_data=2023-10-16T10:00:00
 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet --to_data=2023-10-16T10:00:00
 ./oasys-csv-cli-linux  export-commission-reward 0x15f41edfe3556b853d79f96edbae4b68c0217673 -c=hub_mainnet --from_data=2023-08-16T10:00:00 --to_data=2023-10-16T10:00:00
 ./oasys-csv-cli-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet  --from_epoch=246 --to_epoch=247 --price_time=10:00:00 --price=jpy