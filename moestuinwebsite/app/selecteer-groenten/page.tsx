"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VegetableSelector from '../components/VegetableSelector'

export default function SelecteerGroenten() {
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([])
  const router = useRouter()

  const handleShowTable = async () => {
    if (selectedVegetables.length > 0) {
      const queryString = selectedVegetables.join(',')
      router.push(`/vegetable-table?vegetables=${queryString}`)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 font-fredoka text-green-600">Selecteer je groenten (maximaal 10)</h2>
      <VegetableSelector
        selectedVegetables={selectedVegetables}
        setSelectedVegetables={setSelectedVegetables}
      />
      <div className="mt-8 text-center">
        <button
          onClick={handleShowTable}
          disabled={selectedVegetables.length === 0}
          className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Toon planning 🌱
        </button>
      </div>
    </main>
  )
}

