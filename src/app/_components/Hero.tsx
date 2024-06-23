import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
<section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
Manage Your Expense        <strong className="font-extrabold text-blue-700 sm:block"> Control Your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start creating your budget and save ton of Money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </Link>

      
      </div>
    </div>
  </div>
</section>  )
}

export default Hero