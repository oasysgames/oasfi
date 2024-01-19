## export-staker-reward script

* This script outputs the rewards generated for a specific staker address.
* You need to specify the Staker Address as the address.
* If you want to output the price of OAS tokens, obtain the COINGECKO API key and execute the following command. (Please obtain the API key individually by contracting with coingecko)
* The APY (Annual Percentage Yield) for staking is 10%, which comprises staker rewards (90%) and validator rewards (10%).

```bash
export COINGECKO_API_KEY=xx
```

### basic command

**Require: Do not enter spaces.
Correct: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
Incorrect: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,  0x4e5e774d3837bd9302b83cad94a112575411f07b  

#### MacOS:

```bash
./oasfi-macos  export-staker-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-macos  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

#### windows:

```bash
./oasfi-win.exe  export-staker-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-win.exe  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

#### linux:

```bash
./oasfi-linux  export-staker-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

### optional command:  

#### --from_date, --to_date

* You can retrieve data for a specific period by specifying --from_date and --to_date.
* The default is set to the local timezone. If you need to change the timezone, you can use --time_zone=timezone.


#### --time_zone
* Do not specify timezone abbreviation, please specify timezoneID
  example: --time_zone=Asia/Tokyo (not JST)
reference: https://timezonedb.cơm/time-zones

```bash
./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --from_date=2023-08-16T10:00:00 --to_date=2023-10-16T10:00:00
```

#### --price

* --price specifies the currency to be exported. If not specified, the default flag for --price will be [jpy, usd, krw, eur, sgd].
* The currencies available are those supported by Coingecko.

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --price=jpy
```

#### --from_epoch, --to_epoch

* Specify a range of specific epochs to export the data for that range into a CSV file.

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b   --from_epoch=246 --to_epoch=247
```

#### --price_time

* --price_time passes the time (UTC) for fetching the price. If the --price_time flag is not set, the default will be at 00:00:00 UTC.

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b --price_time=10:00:00
```

#### --export_csv_online

* Specifying --export_csv_online=true will export the data online. If the --export_csv_online flag is not set, the default is to export locally.
* However, even if you specify --export_csv_online=true, the data will not be exported online unless SPREADSHEET_ID and GOOGLE_APPLICATION_CREDENTIALS are set as environment variables.
* Please obtain GOOGLE_APPLICATION_CREDENTIALS individually from Google Cloud Platform.
```
export SPREADSHEET_ID=xx
export GOOGLE_APPLICATION_CREDENTIALS=xx
```

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --export_csv_online=true
```

#### --output

* Specifies the destination file for output
* Default is staker-reward.csv

```bash
 ./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  -o=output.csv
```

#### --chain
* You can specify chain. By default is hub mainnet.

```bash
export HUB_MAINNET_GRAPH_URL=xx

./oasfi-linux  export-staker-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b -c=hub_mainnet
```

Another chain url:
```
  export HUB_MAINNET_GRAPH_URL=xx
  export HUB_TESTNET_GRAPH_URL=xx
  export TCGV_MAINNET_GRAPH_URL=xx
  export TCGV_TESTNET_GRAPH_URL=xx
  export SANDV_TESTNET_GRAPH_URL=xx
  export SANDV_MAINNET_GRAPH_URL=xx
  export MCH_MAINNET_GRAPH_URL=xx
  export MCH_TESTNET_GRAPH_URL=xx
  export HOME_MAINNET_GRAPH_URL=xx
  export HOME_TESTNET_GRAPH_URL=xx
  export SAAKURU_MAINNET_GRAPH_URL=xx
  export SAAKURU_TESTNET_GRAPH_URL=xx ```

### 参考

#### sheet API
* Used to retrieve the SPREADSHEET_ID environment variable
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* Used to retrieve the GOOGLE_APPLICATION_CREDENTIALS environment variable
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html
