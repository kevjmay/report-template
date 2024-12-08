import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-4 bg-redCustom rounded-t-xl mt-2'>
        <img className='w-60 h-auto fill-current text-red-500' src="./src/assets/BundlrText.svg" alt="logo" />
        <div className='font-sans text-white text-right'>
            <p>01273 736436</p>
            <p>team@bundlr.com</p>
            <p>63 Western Road, Brighton & Hove, BN3 1JD</p>
        </div>
    </div>
  )
}

export default Header