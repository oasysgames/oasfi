## correct-csv script

This script was created to correct errors in token transfer data obtained from Blockscout v5. It is primarily used for accounting purposes. To use the script, place the downloaded program, the token transfer data from Blockscout v5 (input.csv), and the file for the corrected data (output.csv) in the same directory. Then, run the following commands in that directory.

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
* You can specify chain. By default is hub mainnet.

```bash
export HUB_MAINNET_RPC_URL=xx

./oasfi-linux correct-csv -i=blockscoutV5.csv -o=correctTransferData.csv -c=hub_mainnet
```

Another chain url:
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

  