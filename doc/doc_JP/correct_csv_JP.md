## correct-csvスクリプト

blockscout v5から取得されるtoken transferのデータに誤りがあり、そのデータを修正するために作成されたスクリプトです。
主に会計をするときに用いるプログラムです。
ダウンロードしたプログラム、blockscout v5から取得したtoken transferのデータ（input.csv）、修正データを出力するファイル(output.csv)を同一ディレクトリに配置して、そのディレクトリ下で以下のようなコマンドを動かしてください。

#### MacOS:

```bash
./oasfi-macos correct-csv -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasfi-macos correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

#### Windows:

```bash
./oasfi-win.exe correct-csv -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasfi-win.exe correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

#### Linux:

```bash
./oasfi-linux correct-csv -i=input.csv -o=output.csv -c=chain_name

# example
# ./oasfi-linux correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```
