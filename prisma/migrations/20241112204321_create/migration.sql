-- CreateEnum
CREATE TYPE "StatusAluno" AS ENUM ('CALOURO', 'VETERANO');

-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- CreateTable
CREATE TABLE "Painel" (
    "id" TEXT NOT NULL,
    "statusAluno" "StatusAluno" NOT NULL,
    "turno" "Turno" NOT NULL,

    CONSTRAINT "Painel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "painelId" TEXT NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "sala" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
