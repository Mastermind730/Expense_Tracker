-- CreateTable
CREATE TABLE "Budgets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "amount" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255),
    "createdBy" VARCHAR(255) NOT NULL,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);
