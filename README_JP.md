# 概要

この CLI ツールには以下の機能を持ついくつかのコマンドがあります。
- [staker reward のhistoricalな報酬計算](./doc/doc_JP/export_staker_reward_JP.md)
- [validator rewardのhistoricalな報酬計算](./doc/doc_JP/export_validator_reward_JP.md)
- [token transfer のcsvデータ修正](./doc/doc_JP/correct_csv_JP.md)

# Downloadの仕方

- [releases](https://github.com/oasysgames/oasfi/releases)から最新のものをダウンロードしてください。
- MaxOS, Windows, Linux 3つに対応しておりますのでご自身のosに合うものをお選びください。
- macの場合は、プライバシー設定からアプリの実行を許可する必要があります

# for developer

## 実行ファイル作成

* nodeはv18を利用してください

```bash
nvm use 18
git clone https://github.com/oasysgames/oasfi.git
cd oasfi
npm i
npm i -g pkg
npm run compile
```

* 上記のコマンドを打つとローカルに実行ファイルが生成されます。


# 注意

- reorg中に動かすと固まるので、しばらく待ってから再実行すると問題なく動きます。

# linuxでの動作確認
- compileしたバイナリをdocker上にcopyして実行する
`./test-linux.sh`