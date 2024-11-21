import { Turno, StatusAluno } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

// Mapeamento para Turno
const turnoMap: { [key: string]: Turno } = {
  MANHA: Turno.MANHA,
  TARDE: Turno.TARDE,
  NOITE: Turno.NOITE,
}

// Mapeamento para StatusAluno
const statusAlunoMap: { [key: string]: StatusAluno } = {
  CALOURO: StatusAluno.CALOURO,
  VETERANO: StatusAluno.VETERANO,
}

// Função para transformar Turno
function transformarTurno(valor: string): Turno | undefined {
  return turnoMap[valor]
}

// Função para transformar StatusAluno
function transformarStatusAluno(valor: string): StatusAluno | undefined {
  return statusAlunoMap[valor] // permite case-insensitive
}

export async function GET(request: NextRequest) {
  const statusAluno = request.nextUrl.searchParams.get('statusAluno')
  const turno = request.nextUrl.searchParams.get('turno')

  if (!statusAluno || !turno) {
    return NextResponse.json({ message: 'Dados invalidos' }, { status: 400 })
  }

  // Validação e formatação do turno
  const formatedTurno = transformarTurno(turno)

  if (!formatedTurno) {
    return NextResponse.json({ message: 'Turno inválido' }, { status: 400 })
  }

  // Validação e formatação do statusAluno
  const formatedStatusAluno = transformarStatusAluno(statusAluno)
  if (!formatedStatusAluno) {
    return NextResponse.json({ message: 'Status do aluno inválido' }, { status: 400 })
  }

  try {
    const painel = await prisma.painel.findFirst({
      where: {
        statusAluno: formatedStatusAluno,
        turno: formatedTurno,
      },
      include: {
        cards: {
          select: {
            disciplinas: true,
            curso: true,
            id: true,
          },
        },
      },
    })

    if (!painel) {
      return NextResponse.json({ message: 'Nenhuma informação encontrada' }, { status: 200 })
    }

    return NextResponse.json(painel, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Erro no servidor', { status: 500 })
  }
}
