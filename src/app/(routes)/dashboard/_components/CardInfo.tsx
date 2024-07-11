"use client";
import { FullBudget } from '@/app/types';
import { PiggyBank, Wallet } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface CardInfoProps {
  budget: FullBudget[];
}

const CardInfo: React.FC<CardInfoProps> = ({ budget }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [spendTotal, setTotalSpend] = useState(0);


  const calculateCardInfo = useCallback(() => {
    console.log(budget);
    let total = 0;
    let totalSpend = 0;
    budget.forEach((item) => {
      total += item?.amount || 0;
      totalSpend += item?.totalSpend || 0;
    });
    console.log(total, totalSpend);
    setTotalBudget(total);
    setTotalSpend(totalSpend);
  },[budget]);

  useEffect(() => {
    if (budget?.length > 0) {
      calculateCardInfo();
    }
  }, [budget,calculateCardInfo]);

  

  return (
    <div>
      {budget?.length>0 ? (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Budget</h2>
              <h2 className='font-bold text-2xl'>${totalBudget}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>Total Spend</h2>
              <h2 className='font-bold text-2xl'>${spendTotal}</h2>
            </div>
            <Wallet className='bg-primary p-3 h-12 w-12 rounded-full' />
          </div>
          <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
              <h2 className='text-sm'>No. Of Budgets</h2>
              <h2 className='font-bold text-2xl'>{budget.length}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full' />
          </div>
        </div>
      ) : (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3].map((item, index) => (
            <div key={index} className='h-[160px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
