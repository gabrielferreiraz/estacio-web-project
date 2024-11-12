'use server'

import { NextResponse } from 'next/server'

export async function GET() {
  console.log('estou no back-end')
  return NextResponse.json({ message: 'Fui no back e voltei' }, { status: 200 })
}