import { NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

export async function GET() {
  try {
    const listData = await prisma.painel.findMany({
      include: {
        cards: {
          select: {
            curso: true,
            disciplinas: true,
          },
        },
      },
    })

    return NextResponse.json({ message: 'lista com todos os dados', listData }, { status: 200 })
  } catch (error) {
    console.error('erro na api de teste', error)
    return NextResponse.json({ message: 'erro na api de teste' }, { status: 500 })
  }
}

// 'SELECT
//     p.id AS painel_id,
//     p.statusAluno,
//     p.turno,
//     c.id AS card_id,
//     c.curso,
//     d.id AS disciplina_id,
//     d.disciplina,
//     d.professor,
//     d.sala
// FROM
//     Painel p
// LEFT JOIN
//     Card c ON c.painel_id = p.id
// LEFT JOIN
//     Disciplina d ON d.card_id = c.id
// ORDER BY
//     p.id, c.id, d.id;
// '
