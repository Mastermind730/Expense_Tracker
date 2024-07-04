import { FullBudget } from '@/app/types';
import Link from 'next/link';
import React from 'react';

interface BudgetItemProps {
    budget: FullBudget;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget }) => {
  if (!budget) {
    return null; // or return some placeholder UI
  }
//   console.log(budget);
  return (
    <Link href={`/dashboard/expenses/${budget.id}`} className='p-5 border rounded-lg h-[170px] gap-2 hover:shadow-md cursor-pointer'>
        <div className='flex gap-2 items-center justify-between mb-3'>
            <div className='flex gap-2 items-center'>
                <h2 className='text-2xl p-3 bg-slate-100 rounded-full'>{budget.icon}</h2>
                <div>
                    <h2 className='font-bold'>{budget.name}</h2>
                    <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                </div>
            </div>
            <h2 className='font-bold text-primary text-lg'>{budget.amount}</h2>
        </div>

        <div className='mt-5'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xs text-slate-400'>${budget.totalSpend ? budget.totalSpend : 0} Spend</h2>
                <h2 className='text-xs text-slate-400'>${budget.amount && budget.totalSpend?budget.amount - budget.totalSpend: 0} Remaining</h2>
            </div>

            <div className='w-full bg-slate-300 h-2 rounded-full'>
                <div className='w-[40%] bg-primary h-2 rounded-full'></div>
            </div>
        </div>
    </Link>
  );
};

export default BudgetItem;
