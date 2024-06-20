import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 flex justify-between items-center shadow-md border'>
        <Image alt='logo' src={"./logo.svg"} width={130} height={130}/>
        <Button>Get Started</Button>
    </div>
  )
}

export default Header