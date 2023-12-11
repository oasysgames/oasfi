## export-staker-reward script

* This script outputs the rewards generated for a specific staker address.
* You need to specify the Staker Address as the address.
* If you want to output the price of OAS tokens, obtain the COINGECKO API key and execute the following command. (Please obtain the API key individually by contracting with coingecko)
* The APY (Annual Percentage Yield) for staking is 10%, which comprises staker rewards (90%) and validator rewards (10%).

```bash
export COINGECKO_API_KEY=xx
```

### basic command

#### MacOS:

```bash
./oasfi-macos  export-staker-reward staker_addresses -c=chain_name

# example
# ./oasfi-macos  export-staker-reward staker_addresses -c=hub_mainnet 
```

#### windows:

```bash
./oasfi-win.exe  export-staker-reward staker_addresses -c=chain_name

# example
# ./oasfi-win.exe  export-staker-reward staker_addresses -c=hub_mainnet 
```

#### linux:

```bash
./oasfi-linux  export-staker-reward staker_addresses -c=chain_name

# example
# ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet 
```

### optional command:  

#### from_date, to_date

* You can retrieve data for a specific period by specifying --from_date and --to_date.
* The default is set to the local timezone. If you need to change the timezone, you can use --time_zone=timezone.

```bash
./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet --from_date=2023-08-16T10:00:00 --to_date=2023-10-16T10:00:00
```

#### --price

* --price specifies the currency to be exported. If not specified, the default flag for --price will be [jpy, usd, krw, eur, sgd].
* The currencies available are those supported by Coingecko.

```bash
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet --price=jpy
```

#### --from_epoch, --to_epoch

* Specify a range of specific epochs to export the data for that range into a CSV file.

```bash
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet  --from_epoch=246 --to_epoch=247
```

#### --price_time

* --price_time passes the time (UTC) for fetching the price. If the --price_time flag is not set, the default will be at 00:00:00 UTC.

```bash
 ./oasfi-linux  export-staker-reward staker_addresses --price_time=10:00:00
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
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet --export_csv_online=true
```

#### --output

* Specifies the destination file for output
* Default is staker-reward.csv

```bash
 ./oasfi-linux  export-staker-reward staker_addresses -c=hub_mainnet -o=output.csv
```

### 参考

#### sheet API
* Used to retrieve the SPREADSHEET_ID environment variable
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* Used to retrieve the GOOGLE_APPLICATION_CREDENTIALS environment variable
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html