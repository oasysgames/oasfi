#!/bin/bash

# File paths
NEW_YORK_FILE="./output_csv/test_NewYork.csv"
SINGAPORE_FILE="./output_csv/test_Singapore.csv"

# Timezone offset in hours (Singapore is 13 hours ahead of New York)
TIMEZONE_OFFSET=13

# Check if both files exist
if [[ ! -f "$NEW_YORK_FILE" || ! -f "$SINGAPORE_FILE" ]]; then
  echo "Error: One or both CSV files do not exist."
  exit 1
fi

# Function to convert a timestamp to Unix time
convert_to_unix() {
  local timestamp=$1
  # Replace slashes with hyphens to convert the format YYYY/MM/DD to YYYY-MM-DD
  formatted_timestamp=$(echo "$timestamp" | sed 's#/#-#g')
  # Parse the formatted timestamp to Unix time
  date -d "$formatted_timestamp" +%s 2>/dev/null
}

# Skip the header row and process each line
echo "Comparing timestamps between $NEW_YORK_FILE and $SINGAPORE_FILE..."
paste -d ',' <(tail -n +2 "$NEW_YORK_FILE") <(tail -n +2 "$SINGAPORE_FILE") | while IFS=',' read -r ny_staker ny_epoch ny_block ny_timestamp ny_total ny_reward sg_staker sg_epoch sg_block sg_timestamp sg_total sg_reward; do
  # Convert timestamps to Unix time
  ny_unix=$(convert_to_unix "$ny_timestamp")
  sg_unix=$(convert_to_unix "$sg_timestamp")

  # Check if conversion was successful
  if [[ -z "$ny_unix" || -z "$sg_unix" ]]; then
    echo "Error: Failed to parse timestamps: NY=[$ny_timestamp], SG=[$sg_timestamp]"
    continue
  fi

  # Calculate the time difference in hours
  time_diff=$(( (sg_unix - ny_unix) / 3600 ))

  # Compare the time difference with the expected offset
  if [[ "$time_diff" -eq "$TIMEZONE_OFFSET" ]]; then
    echo "✔️  Timestamp match: NY [$ny_timestamp], SG [$sg_timestamp] (Offset: $time_diff hours)"
  else
    echo "❌  Timestamp mismatch: NY [$ny_timestamp], SG [$sg_timestamp] (Expected Offset: $TIMEZONE_OFFSET hours, Actual Offset: $time_diff hours)"
  fi
done
