import { NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

export async function GET() {
  try {
    const painel = await prisma.painel.create({
      data: {
        statusAluno: 'CALOURO',
        turno: 'MANHA',
        cards: {
          create: [
            {
              curso: 'Engenharia de Software',
              disciplinas: {
                create: [
                  { disciplina: 'Algoritmos', professor: 'Prof. João Silva', sala: 'Sala 101' },
                  { disciplina: 'Estruturas de Dados', professor: 'Prof. Maria Souza', sala: 'Sala 102' },
                  { disciplina: 'Introdução à Programação', professor: 'Prof. Carlos Lima', sala: 'Sala 103' },
                ],
              },
            },
            {
              curso: 'Administração',
              disciplinas: {
                create: [
                  { disciplina: 'Gestão Financeira', professor: 'Prof. Ana Torres', sala: 'Sala 201' },
                  { disciplina: 'Marketing', professor: 'Prof. Luiz Carvalho', sala: 'Sala 202' },
                  { disciplina: 'Contabilidade', professor: 'Prof. Clara Mendes', sala: 'Sala 203' },
                ],
              },
            },
          ],
        },
      },
    })

    console.log('Painel criado:', painel)
    return NextResponse.json({ painel }, { status: 200 })
  } catch (error) {
    console.error('erro na api de teste', error)
    return NextResponse.json({ message: 'erro na api de teste' }, { status: 500 })
  }
}
