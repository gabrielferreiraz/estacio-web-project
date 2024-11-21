import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/libs/prisma'

export async function DELETE(request: NextRequest) {
  const disciplineId = request.nextUrl.searchParams.get('disciplineId')
  const cardId = request.nextUrl.searchParams.get('cardId')

  if (!disciplineId || !cardId) {
    return NextResponse.json({ message: 'Verifique os dados e tente novamente' }, { status: 400 })
  }

  try {
    await prisma.disciplina.delete({
      where: {
        id: disciplineId,
      },
    })

    const verifyCard = await prisma.disciplina.findFirst({
      where: {
        cardId,
      },
    })

    if (!verifyCard) {
      await prisma.card.delete({
        where: {
          id: cardId,
        },
      })
    }

    return NextResponse.json('Disciplina deletada', { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Erro na api DELETE', { status: 500 })
  }
}
