import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-4 bg-purpleCustom rounded-t-xl mt-2'>
        <img className='w-60 h-auto' src="./src/assets/logo.png" alt="logo" />
        <div className='text-white text-right'>
            <p>0113 880 0853</p>
            <p>agents@huddle.uk.com</p>
            <p>Gable House, 239 Regents Park Road, N3 3LF</p>
        </div>
    </div>
  )
}

export default Header