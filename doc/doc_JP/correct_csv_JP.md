## correct-csvスクリプト

blockscout v5から取得されるtoken transferのデータに誤りがあり、そのデータを修正するために作成されたスクリプトです。
主に会計をするときに用いるプログラムです。
ダウンロードしたプログラム、blockscout v5から取得したtoken transferのデータ（input.csv）、修正データを出力するファイル(output.csv)を同一ディレクトリに配置して、そのディレクトリ下で以下のようなコマンドを動かしてください。

#### MacOS:

```bash
./oasfi-macos correct-csv -i=input.csv -o=output.csv

# example
# ./oasfi-macos correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv
```

#### Windows:

```bash
./oasfi-win.exe correct-csv -i=input.csv -o=output.csv

# example
# ./oasfi-win.exe correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv
```

#### Linux:

```bash
./oasfi-linux correct-csv -i=input.csv -o=output.csv

# example
# ./oasfi-linux correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv
```

### optional command:  

#### --chain
* チェーンを指定する可能です。指定されていない場合、デフォルトはhub_mainnetで指定されます。

```bash
export HUB_MAINNET_RPC_URL=xx

./oasfi-linux correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

他のチェーンのURLは以下となります:
```
  export HUB_MAINNET_RPC_URL=xx
  export HUB_TESTNET_RPC_URL=xx
  export TCGV_MAINNET_RPC_URL=xx
  export TCGV_TESTNET_RPC_URL=xx
  export SANDV_TESTNET_RPC_URL=xx
  export SANDV_MAINNET_RPC_URL=xx
  export MCH_MAINNET_RPC_URL=xx
  export MCH_TESTNET_RPC_URL=xx
  export HOME_MAINNET_RPC_URL=xx
  export HOME_TESTNET_RPC_URL=xx
  export SAAKURU_MAINNET_RPC_URL=xx
  export SAAKURU_TESTNET_RPC_URL=xx ```