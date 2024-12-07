import React from 'react';
import { useCsvData } from './useCsvData';
import { calculateUsageTotals } from './calculateUsageTotals'

function UsageCard({ type }) {
  const { csv, loading, error } = useCsvData();

  if (loading) return <p>Loading CSV data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!csv || csv.length === 0) return <p>No data available.</p>;

  const { electricUsage, electricAllowance, gasUsage, gasAllowance } = calculateUsageTotals(csv);

  const totalUsage = type === 'Electric' ? electricUsage : gasUsage;
  const totalAllowance = type === 'Electric' ? electricAllowance : gasAllowance;
  const balance = Math.floor(totalUsage - totalAllowance);
  const debitCredit = balance > 0 ? 'Debit' : 'Credit';
  const overusePercent = (((totalUsage / totalAllowance) * 100) - 100).toFixed(2);

  return (
    <div className="bg-gray-50 p-2 rounded-xl shadow border border-purpleCustom text-sm">
      <div className="flex items-center">
        {type === 'Electric' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-purpleCustom w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-purpleCustom w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
        )}
        <h2 className="text-purpleCustom text-lg font-semibold pl-1">
          {type} Usage
        </h2>
      </div>
      <hr className="border-t-1 border-purpleCustom my-2" />
      <ul className="space-y-2">
        <li className="flex items-center justify-between border border-purpleCustom rounded-md">
          <span className="text-purpleCustom font-medium px-4 py-2">
            Actual Usage (kWh)
          </span>
          <span className="flex justify-center items-center w-36 h-12 bg-purpleCustom text-white px-6 py-2 rounded-r-md text-right">
            {totalUsage}
          </span>
        </li>
        <li className="flex items-center justify-between border border-purpleCustom rounded-md">
          <span className="text-purpleCustom font-medium px-4 py-1">
            Allowance (kWh)
          </span>
          <span className="flex justify-center items-center w-36 h-12 bg-purpleCustom text-white px-6 py-1 rounded-r-md text-right">
            {totalAllowance}
          </span>
        </li>
        <li className="flex items-center justify-between border border-purpleCustom rounded-md">
          <span className="text-purpleCustom font-medium px-4 py-1">
            Overall Balance
          </span>
          <span className="flex justify-center items-center w-36 h-12 bg-purpleCustom text-white px-6 py-1 rounded-r-md text-right">
            {balance} kWh
          </span>
        </li>
        <li className="flex items-center justify-between border border-purpleCustom rounded-md">
          <span className="text-purpleCustom font-medium px-4 py-1">
            Debit/Credit
          </span>
          <span className="flex justify-center items-center w-36 h-12 bg-purpleCustom text-white px-6 py-1 rounded-r-md text-right">
            {debitCredit}
          </span>
        </li>
        <li className="flex items-center justify-between border border-purpleCustom rounded-md">
          <span className="text-purpleCustom font-medium px-4 py-1">
            % Balance
          </span>
          <span className="flex justify-center items-center w-36 h-12 bg-purpleCustom text-white px-6 py-1 rounded-r-md text-right">
            {overusePercent}%
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UsageCard;
