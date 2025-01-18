import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { vegetables } = await req.json()

  // This is a dummy prompt. Replace it with your actual prompt later.
  const prompt = `Maak een zaaikalender voor de volgende groenten: ${vegetables.join(', ')}, waarbij je rekening houdt met de volgende voorwaarden:

* De groenten worden geteeld in een buitenmoestuin.
* Er is ook de mogelijkheid om binnen te zaaien en voor te trekken in potjes.
* Neem de volgende acties op, indien van toepassing:
--Uitleggen zaad: Specificeer wanneer en hoe zaden voorbereid moeten worden.
--Zaaien: Zowel in potjes (binnen) als direct in volle grond.
--Verspenen: Wanneer jonge plantjes verplaatst of uitgedund moeten worden.
--Poten in volle grond: Specificeer de juiste tijd om jonge plantjes uit te planten in de tuin.
--Eerste verwachte oogst: Geef een indicatie van wanneer de oogst kan worden verwacht.
* Baseer de zaaikalender op de meest gangbare klimaatomstandigheden in Nederland (gematigd zeeklimaat).
* Formatteer de zaaikalender als een iCalendar-bestand (.ics) met gebeurtenissen voor elke actie. Gebruik de volgende specificaties:
--Titel van de gebeurtenis: [Groente] - [Actie].
--Begintijd: 09:00.
--Duur: 1 uur.
--Notities: Voeg details toe over de actie, zoals zaaimethode of tips.
Genereer de .ics-inhoud zodat ik het bestand direct kan gebruiken.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {"role": "system", "content": "Je bent een expert in moestuinieren en in het maken van zaaikalenders voor verschillende groenten."},
        {"role": "user", content: prompt }],
    })

    const iCalendarData = completion.choices[0].message.content

    return new NextResponse(iCalendarData, {
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

