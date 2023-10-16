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
git clone https://github.com/oasysgames/explorer-csv-cli.git
cd explorer-csv-cli
npm i
npm i -g pkg
npm run compile
```

#### 使い方

上記「使い方」と同上



ts-node index.ts  export-commission-reward fdsffd --chain=hub_mainnet


2023-10-16T10:30:00

--time_zone=Asia/Tokyo --from_data=2023-10-16T10:30:00