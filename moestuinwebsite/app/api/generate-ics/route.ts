import { NextResponse } from 'next/server'
import ical from 'ical-generator'

export async function POST(req: Request) {
  const { tableData } = await req.json()

  try {
    const calendar = ical({ name: 'Moestuin Kalender' })

    tableData.forEach((row: any) => {
      calendar.createEvent({
        start: new Date(row.datum),
        end: new Date(new Date(row.datum).getTime() + 60 * 60 * 1000), // 1 hour duration
        summary: `${row.groente} - ${row.actie}`,
        description: row.details,
      })
    })

    const icsContent = calendar.toString()

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename=zaaikalender.ics',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Er is een fout opgetreden bij het genereren van de kalender.', { status: 500 })
  }
}

