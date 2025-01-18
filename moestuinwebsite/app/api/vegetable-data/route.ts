import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function POST(req: Request) {
  const { vegetables } = await req.json()

  try {
    const vegetableData = await prisma.vegetable.findMany({
      where: {
        groente: {
          in: vegetables,
        },
      },
    })

    return NextResponse.json(vegetableData)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Er is een fout opgetreden bij het ophalen van de gegevens.', { status: 500 })
  }
}

