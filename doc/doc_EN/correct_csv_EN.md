## correct-csv script

This script was created to correct errors in token transfer data obtained from Blockscout v5. It is primarily used for accounting purposes. To use the script, place the downloaded program, the token transfer data from Blockscout v5 (input.csv), and the file for the corrected data (output.csv) in the same directory. Then, run the following commands in that directory.

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
