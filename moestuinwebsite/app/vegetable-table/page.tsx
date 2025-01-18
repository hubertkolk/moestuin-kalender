"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

interface VegetableData {
  id: number
  groente: string
  actie: string
  datum: string
  details: string
}

export default function VegetableTable() {
  const [tableData, setTableData] = useState<VegetableData[]>([])
  const searchParams = useSearchParams()
  const vegetables = searchParams.get('vegetables')?.split(',') || []

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/vegetable-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vegetables }),
      })
      if (response.ok) {
        const data = await response.json()
        setTableData(data)
      }
    }
    fetchData()
  }, [vegetables])

  const handleRemoveRow = (id: number) => {
    setTableData(tableData.filter(row => row.id !== id))
  }

  const handleEditCell = (id: number, field: keyof VegetableData, value: string) => {
    setTableData(tableData.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ))
  }

  const handleGenerateCalendar = async () => {
    const response = await fetch('/api/generate-ics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableData }),
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'zaaikalender.ics'
      document.body.appendChild(a)
      a.click()
      a.remove()
    } else {
      alert('Er is een fout opgetreden bij het genereren van de kalender.')
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 font-fredoka text-green-600">Je moestuin planning 🌱📅</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="py-2 px-4 border-b">Datum</th>
              <th className="py-2 px-4 border-b">Actie</th>
              <th className="py-2 px-4 border-b">Groente</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Acties</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <input
                    type="date"
                    value={row.datum}
                    onChange={(e) => handleEditCell(row.id, 'datum', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={row.actie}
                    onChange={(e) => handleEditCell(row.id, 'actie', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={row.groente}
                    onChange={(e) => handleEditCell(row.id, 'groente', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={row.details}
                    onChange={(e) => handleEditCell(row.id, 'details', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleRemoveRow(row.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Verwijder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleGenerateCalendar}
          className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Maak kalender 📅
        </button>
      </div>
    </main>
  )
}

