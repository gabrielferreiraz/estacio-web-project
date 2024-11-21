import { StatusAluno, Turno } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { FormCardProps } from '@/app/editor/FormCard'
import { prisma } from '@/libs/prisma'

// Mapeamento para Turno
const turnoMap: { [key: string]: Turno } = {
  MANHA: Turno.MANHA,
  TARDE: Turno.TARDE,
  NOITE: Turno.NOITE,
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
    const hasPainel = await prisma.painel.findFirst({
      where: {
        statusAluno: formatedStatusAluno,
        turno: formatedTurno,
      },
    })

    if (!hasPainel) {
      await prisma.painel.create({
        data: {
          turno: formatedTurno,
          statusAluno: formatedStatusAluno,
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

      return NextResponse.json({ message: 'Painel criada' }, { status: 201 })
    }

    const hasCard = await prisma.card.findFirst({
      where: {
        painelId: hasPainel.id,
        curso: req.curso,
      },
    })

    if (!hasCard) {
      await prisma.painel.update({
        where: {
          id: hasPainel.id,
          statusAluno: hasPainel.statusAluno,
          turno: hasPainel.turno,
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

      return NextResponse.json({ message: 'Card criado' }, { status: 201 })
    }

    const hasDiscipline = await prisma.disciplina.findFirst({
      where: {
        cardId: hasCard.id,
        disciplina: req.disciplina,
      },
    })

    if (!hasDiscipline) {
      await prisma.painel.update({
        where: {
          id: hasPainel.id,
          statusAluno: hasPainel.statusAluno,
          turno: hasPainel.turno,
        },
        data: {
          cards: {
            update: {
              where: {
                id: hasCard.id,
                curso: hasCard.curso,
                painelId: hasCard.painelId,
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
            },
          },
        },
      })
      return NextResponse.json({ message: 'Disciplina criada' }, { status: 201 })
    }

    return NextResponse.json({ message: 'Disciplina já criada' }, { status: 400 })
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
