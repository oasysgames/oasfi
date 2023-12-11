# Overview

This CLI (Command Line Interface) tool contains several commands with the following functionalities:
    
- [Calculating historical rewards for staker rewards](./doc/doc_EN/export_staker_reward_EN.md)
- [Computing historical rewards for validator rewards](./doc/doc_EN/export_validator_reward_EN.md)
- [Correcting CSV data for token transfers](./doc/doc_EN/correct_csv_EN.md)

# How to Download

- Please download the latest version from [releases](https://github.com/oasysgames/oasfi/releases).
- It is compatible with macOS, Windows, and Linux, so please choose the one that matches your OS.
- For macOS users, you need to allow the app to run in the privacy settings.

# For Developers

## Creating Executable Files

* Please use node version 18

```bash
nvm use 18
git clone https://github.com/oasysgames/oasfi.git
cd oasfi
npm i
npm i -g pkg
npm run compile
```

* Executing the above commands will generate executable files locally.

# Caution

- If you run it during a reorganization, it may freeze. Therefore, it's advisable to wait for some time and then re-execute the commands, which should then work without any issues.

