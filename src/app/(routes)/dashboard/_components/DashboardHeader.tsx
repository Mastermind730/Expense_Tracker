import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-sm flex  justify-between border-b'>
        <div>
{/* SearchBar */}
        </div>
        <div>
<UserButton/>
        </div>
    </div>
  )
}

export default DashboardHeader