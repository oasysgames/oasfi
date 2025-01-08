import { getEpoches } from './RewardStakes';
import { Subgraph } from '../utils/subgraph';
import { stakerRewardArgs } from '../types';
import moment from 'moment-timezone';

describe('getEpoches date handling with actual The Graph', () => {
  let subgraph: Subgraph;

  beforeEach(() => {
    subgraph = new Subgraph('hub_mainnet');
  });

  const testCase = async (fromDate: string, description: string, expectedFrom: number, expectedTo: number) => {
    it(`${description}の場合のエポック計算の詳細確認`, async () => {
      const args: stakerRewardArgs = {
        staker_addresses: '0x272d6bd040c2b8454f4f6f43115758fbe318ee2c,0x4e5e774d3837bd9302b83cad94a112575411f07b',
        from_date: fromDate,
        to_date: '2024-01-16T10:00:00',
        chain: 'hub_mainnet',
        from_epoch: 0,
        to_epoch: 0,
        time_zone: 'UTC',
        price: 'usd',
        export_csv_online: 'false',
        output: 'test.csv'
      };

      console.log('\n=== Test Details ===');
      console.log('Input dates:');
      console.log('  from_date:', args.from_date);
      console.log('  to_date:', args.to_date);

      const from_time = moment(args.from_date);
      const to_time = moment(args.to_date);
      console.log('\nTimestamps:');
      console.log('  from_timestamp:', from_time.utc().unix());
      console.log('  to_timestamp:', to_time.utc().unix());

      const result = await getEpoches(args, subgraph);
      console.log('\nFinal Result:', result);
      console.log('==================\n');

      expect(result.from).toBe(expectedFrom);
      expect(result.to).toBe(expectedTo);
    });
  };

  testCase('2023-01-04T10:00:00', '2023-01-04', 98, 473);
  testCase('2023-01-05T10:00:00', '2023-01-05', 99, 473);
  testCase('2023-01-06T10:00:00', '2023-01-06', 100, 473);

  jest.setTimeout(30000);
}); 