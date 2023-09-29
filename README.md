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
./oasys-csv-cli-macos input.csv output.csv chain_name

# example
# ./oasys-csv-cli-macos foo.csv bar.csv hub_mainnet
```

#### Windows:

```bash
oasys-csv-cli-win.exe input.csv output.csv chain_name
```

#### Linux:

```bash
./oasys-csv-cli-linux input.csv output.csv  chain_name
```

ここで、input.csvは読み込むCSVファイルのパス、output.csvは出力されるCSVファイルのパスを指定します。

---

### for developer
#### 実行ファイル作成

```bash
git clone https://github.com/oasysgames/explorer-csv-cli.git
cd explorer-csv-cli
npm i
npm i -g pkg
npm run compile
```

#### 使い方

上記「使い方」と同上
