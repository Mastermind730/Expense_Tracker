-- CreateTable
CREATE TABLE "Expenses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amount" VARCHAR(255) NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "createdAt" VARCHAR(255) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
