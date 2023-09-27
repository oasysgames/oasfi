## 使い方 (How to use)

### 実行方法

#### MacOS:

```bash
./oasys-csv-cli-macos input.csv address output.csv
```

#### Windows:

```bash
oasys-csv-cli-win.exe input.csv address output.csv
```

#### Linux:

```bash
./oasys-csv-cli-linux input.csv address output.csv 
```

ここで、input.csvは読み込むCSVファイルのパス、output.csvは出力されるCSVファイルのパスを指定します。

---

### tool 開発者向け

#### 実行ファイル作成

```bash
npm i
npm i -g pkg
npx tsc
pkg .
```
