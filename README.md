## 使い方 (How to use)

#### 実行ファイル作成（ファイル共有用のため仮に記載）

(You have to execute below due to file size limitation for sharing files.)

```bash
npm i
npm i -g pkg
npx tsc
pkg .
```


#### MacOS:

```bash
./oasys-csv-cli-macos input.csv address output.csv
```

#### Windows:

```bash
oasys-csv-cli-win.exe distinct  input.csv address output.csv
```

#### Linux:

```bash
./oasys-csv-cli-linux distinct  input.csv address output.csv 
```

ここで、input.csvは読み込むCSVファイルのパス、output.csvは出力されるCSVファイルのパスを指定します。

#### example:
npm run compile &&./oasys-csv-cli-linux distinct target_csv/token-transfers.csv  0x0456bA3D973dF5723eB2F99F621736110BF1d66d  output_csv/token-transfers.converted.csv hub_mainnet