import React from 'react';
import Header from './Header';
import PortfolioSummary from './PortfolioSummary';
import UsageCard from './UsageCard';
import UsageGraph from './UsageGraph';
import ContactDetails from './ContactDetails';
import HouseUsage from './HouseUsage';
import ColumnValues from './ColumnValues';

function Report() {
  return (
    <div className='page-container'>
      {/* Summary Page */}
      <div className='m-2 w-[794px] h-[1123px] bg-white rounded-lg shadow-lg p-4 overflow-hidden page'>
        <Header />
        <PortfolioSummary />
        <div className='grid grid-cols-2 gap-4 mt-4 mb-4'>
          <UsageCard type="Electric" />
          <div className='flex justify-center items-center'>
            <UsageGraph type="Electric" />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4 mb-4'>
          <UsageCard type="Gas" />
          <div className='flex justify-center items-center'>
            <UsageGraph type="Gas" />
          </div>
        </div>
        <ContactDetails />
      </div>
      
      {/* Usage Page/s */}
      <div className='m-2 w-[794px] h-[1123px] bg-white rounded-lg shadow-lg p-4 overflow-hidden page'>
        <ColumnValues />
        <div className="house-usage-page">
          <HouseUsage />
        </div>
        <ContactDetails />
      </div>
    </div>
  );
}

export default Report;
