import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 bg-cover bg-center">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:flex md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 font-fredoka text-green-600">Zet al je groenten in je kalender! 🌱📅</h2>
            <p className="mb-4 text-lg">Wanneer je moet zaaien, verpoten en wanneer je kan oogsten. Zo vergeet je niets meer! 🥕🍅🥬</p>
            <p className="mb-4 text-lg">Hoe werkt het? Je kiest de groenten uit die je gaat verbouwen. En dan druk je op 'Maak mijn kalender'. De kalender wordt gemaakt, en jij kunt 'm dan downloaden en in je eigen Google of Apple kalender laden. Simpel toch? 😊</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/iphone-calendar.png"
              alt="iPhone Calendar"
              width={200}
              height={400}
              className="transform rotate-3 shadow-lg rounded-lg"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/selecteer-groenten" className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Dat wil ik! 🌟
          </Link>
        </div>
      </div>
    </main>
  )
}

