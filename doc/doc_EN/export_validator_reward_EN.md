## export-validator-reward Script

* This script outputs a reward generated by validator rewards for a specific address.
* You need to specify the Validator Owner as the address.
  * More about Validator Owner: [Oasys Games Documentation](https://docs.oasys.games/docs/architecture/hub-layer/validator-account#validator-owner)

* If you want to output the price of OAS tokens, obtain the COINGECKO API key and run the following command. (Please obtain the API key individually by contracting with Coingecko)

```bash
export COINGECKO_API_KEY=xx
```

### Basic Command

**Require: Do not enter spaces.
Correct: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
Incorrect: 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,  0x4e5e774d3837bd9302b83cad94a112575411f07b  

#### MacOS:

```bash
./oasfi-macos  export-validator-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-macos  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

#### windows:

```bash
./oasfi-win.exe  export-validator-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-win.exe  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

#### linux:

```bash
./oasfi-linux  export-validator-reward 0xXX..XX,0xYY..YY

# example
# ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  
```

### optional command:  

#### from_date, to_date

* Specifying --from_date and --to_date helps to retrieve data for a specific period.
* The default is the local timezone, and if you need to change the timezone, you can use --time_zone=timezone.

```bash
./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --from_date=2023-08-16T10:00:00 --to_date=2023-10-16T10:00:00
```

#### --price

* --price specifies the currency to be exported. Otherwise, the default flag for --price is [jpy,usd,krw,eur,sgd].
* Currencies supported by Coingecko can be used.

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --price=jpy
```

#### --from_epoch, --to_epoch

* Specify a range of specific epochs to export the data for that range into a CSV file.

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b   --from_epoch=246 --to_epoch=247
```

#### --price_time

* --price_time passes the time (UTC) to fetch the price. If the --price_time flag is not set, the default will be at 00:00:00 UTC.

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b --price_time=10:00:00
```

#### --export_csv_online

* Specifying `--export_csv_online=true` will export the data online. If the `--export_csv_online` flag is not set, the default is to export locally.
* However, even if `--export_csv_online=true` is specified, the data will not be exported online unless `SPREADSHEET_ID` and `GOOGLE_APPLICATION_CREDENTIALS` are set as environment variables.
* Please obtain `GOOGLE_APPLICATION_CREDENTIALS` individually from Google Cloud Platform.
```
export SPREADSHEET_ID=xx
export GOOGLE_APPLICATION_CREDENTIALS=xx
```

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  --export_csv_online=true
```

#### --output

* Specifies the destination file for output.
* The default is commission-reward.csv (commission reward is synonymous with validator reward).

```bash
 ./oasfi-linux  export-validator-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b  -o=output.csv
```

### References

#### sheet API
* Used to retrieve the SPREADSHEET_ID environment variable.
* https://console.cloud.google.com/apis/library/browse?hl=ja&project=nftwars-357707&q=sheet

#### service account
* Used to retrieve the GOOGLE_APPLICATION_CREDENTIALS environment variable.
* https://firebase.google.com/docs/app-distribution/authenticate-service-account?hl=ja&platform=ios
* https://docs.biztex.co.jp/cobit-docs/google_spreadsheet_settings/for_serviceaccount.html

