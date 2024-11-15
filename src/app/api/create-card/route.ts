import { StatusAluno, Turno } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { FormCardProps } from '@/app/editor/FormCard'
import { prisma } from '@/libs/prisma'

// Mapeamento para Turno
const turnoMap: { [key: string]: Turno } = {
  Manhã: Turno.MANHA,
  Tarde: Turno.TARDE,
  Noite: Turno.NOITE,
}

// Mapeamento para StatusAluno
const statusAlunoMap: { [key: string]: StatusAluno } = {
  calouros: StatusAluno.CALOURO,
  veteranos: StatusAluno.VETERANO,
}

// Função para transformar Turno
function transformarTurno(valor: string): Turno | undefined {
  return turnoMap[valor]
}

// Função para transformar StatusAluno
function transformarStatusAluno(valor: string): StatusAluno | undefined {
  return statusAlunoMap[valor.toLowerCase()] // permite case-insensitive
}

export async function POST(request: NextRequest) {
  const req: FormCardProps = await request.json()

  if (!req) {
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }

  // Validação e formatação do turno
  const formatedTurno = transformarTurno(req.turno)

  if (!formatedTurno) {
    return NextResponse.json({ message: 'Turno inválido' }, { status: 400 })
  }

  // Validação e formatação do statusAluno
  const formatedStatusAluno = transformarStatusAluno(req.statusAluno)
  if (!formatedStatusAluno) {
    return NextResponse.json({ message: 'Status do aluno inválido' }, { status: 400 })
  }

  try {
    const hasCard = await prisma.painel.findFirst({
      where: {
        turno: formatedTurno,
        statusAluno: formatedStatusAluno,
        cards: {
          some: {
            curso: req.curso,
          },
        },
      },
      select: {
        cards: {
          include: {
            disciplinas: true,
          },
        },
      },
    })

    if (hasCard) {
      const getCardHas = await prisma.card.findFirst({
        where: {
          curso: req.curso,
        },
      })

      if (!getCardHas) {
        return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
      }

      await prisma.card.update({
        where: {
          id: getCardHas.id,
        },
        data: {
          disciplinas: {
            create: {
              disciplina: req.disciplina,
              professor: req.professor,
              sala: req.sala,
            },
          },
        },
      })
      // Criar uma nova disciplina associada ao primeiro card encontrado
      // const primeiroCard = hasCard.cards[0] // Seleciona o primeiro card
      // const createDisciplina = await prisma.disciplina.create({
      //   data: {
      //     disciplina: req.disciplina,
      //     professor: req.professor,
      //     sala: req.sala,
      //     cardId: primeiroCard.id, // Associa a nova disciplina ao card encontrado
      //   },
      // })

      return NextResponse.json({ message: 'Disciplina criada' }, { status: 200 })
    }

    const getTurno = await prisma.painel.findFirst({
      where: {
        statusAluno: formatedStatusAluno,
        turno: formatedTurno,
      },
    })

    if (!getTurno) {
      return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
    }

    // const createCard = await prisma.card.create({
    //   data: {
    //     curso: req.curso,
    //     disciplinas: {
    //       create: {
    //         disciplina: req.disciplina,
    //         professor: req.professor,
    //         sala: req.sala,
    //       },
    //     },
    //   },
    //   where: {

    //   }
    // })

    // Criar um novo painel, card, e disciplina se nenhum registro foi encontrado
    await prisma.painel.update({
      where: {
        id: getTurno.id,
      },
      data: {
        cards: {
          create: {
            curso: req.curso,
            disciplinas: {
              create: {
                disciplina: req.disciplina,
                professor: req.professor,
                sala: req.sala,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ message: 'Painel e card criados com disciplina' }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

/// FUNCAO ABAIXO É PARA RETORNAR OS CARDS SEPARADOS PRONTOS PARA APRESENTAÇÃO NA PAGE PRINCIPAL
// async function obterCardsPaginados(pagina: number) {
//   const quantidadePorPagina = 6;
//   const offset = (pagina - 1) * quantidadePorPagina;

//   const painel = await prisma.painel.findMany({
//     select: {
//       statusAluno: true,
//       turno: true,
//       cards: {
//         take: quantidadePorPagina,  // Limita a busca a 6 cards
//         skip: offset,               // Controla o deslocamento para a página atual
//         select: {
//           curso: true,
//           disciplinas: {
//             select: {
//               disciplina: true,
//               professor: true,
//               sala: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   return painel;
// }

// // Exemplo de uso: obter a primeira página (6 primeiros cards)
// const pagina1 = await obterCardsPaginados(1);

// // Exemplo de uso: obter a segunda página (próximos 6 cards)
// const pagina2 = await obterCardsPaginados(2);
