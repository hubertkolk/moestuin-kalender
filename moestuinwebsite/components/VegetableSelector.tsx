import { useState } from 'react'

const vegetables = [
  'Tomaten', 'Komkommers', 'Sla', 'Wortelen', 'Paprika', 'Courgette',
  'Bonen', 'Erwten', 'Uien', 'Knoflook', 'Aardappelen', 'Spinazie'
]

interface VegetableSelectorProps {
  selectedVegetables: string[]
  setSelectedVegetables: React.Dispatch<React.SetStateAction<string[]>>
}

export default function VegetableSelector({ selectedVegetables, setSelectedVegetables }: VegetableSelectorProps) {
  const toggleVegetable = (vegetable: string) => {
    if (selectedVegetables.includes(vegetable)) {
      setSelectedVegetables(selectedVegetables.filter(v => v !== vegetable))
    } else if (selectedVegetables.length < 10) {
      setSelectedVegetables([...selectedVegetables, vegetable])
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {vegetables.map((vegetable) => (
        <button
          key={vegetable}
          onClick={() => toggleVegetable(vegetable)}
          className={`p-2 rounded ${
            selectedVegetables.includes(vegetable)
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-800'
          } ${selectedVegetables.length >= 10 && !selectedVegetables.includes(vegetable) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={selectedVegetables.length >= 10 && !selectedVegetables.includes(vegetable)}
        >
          {vegetable}
        </button>
      ))}
    </div>
  )
}

