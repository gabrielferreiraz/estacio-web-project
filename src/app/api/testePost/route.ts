import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const dadosRecebidosDoFront = await request.json()
  console.log('estou no back-end', dadosRecebidosDoFront)

  const objetoJavascript = {
    nome: 'Elias',
  }

  const objetoJson = {
    nome: 'Elias',
  }

  return NextResponse.json({ message: 'Fui no back e voltei' }, { status: 200 })
}
