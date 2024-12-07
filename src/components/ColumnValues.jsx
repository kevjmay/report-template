import React from 'react'

const initial = 'Initial Read'
const latest = 'Latest Read'
const status = 'Read Status' 
const usage = 'Usage (kWh)'
const allowance = 'Allowance (kWh)'
const balance = 'Balance Usage (%)'
const previousRead = 'Days Since Read'  

function ColumnValues() {
  return (
    <div className="bg-purpleCustom w-full rounded-xl p-2">
      <div className="flex justify-end h-full justify-center items-center">
      <img className='w-60 h-auto' src="./src/assets/logo.png" alt="logo" />
        <ul className="grid grid-cols-7 gap-4 w-2/3 text-xs text-white font-bold p-3">
          <li className="flex items-center text-center">{initial}</li>
          <li className="flex items-center text-center">{latest}</li>
          <li className="flex items-center text-center">{status}</li>
          <li className="flex items-center text-center">{usage}</li>
          <li className="flex items-center text-center">{allowance}</li>
          <li className="flex items-center text-center">{balance}</li>
          <li className="flex items-center text-center">{previousRead}</li>
        </ul>
      </div>
    </div>
  )
}

export default ColumnValues
