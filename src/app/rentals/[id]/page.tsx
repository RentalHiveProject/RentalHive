'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function RentalDetails() {
  const { id } = useParams()
  const [rental, setRental] = useState<any>(null)

  useEffect(() => {
    const rentals = JSON.parse(localStorage.getItem('rentals') || '[]')
    const found = rentals.find((item: any) => item.id === id)
    setRental(found)
  }, [id])

  if (!rental) return <p>Loading...</p>

  return (
    <div className="max-w-2xl mx-auto">
      <img src={rental.image} alt={rental.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{rental.title}</h1>
      <p className="text-gray-600 mt-2">{rental.description}</p>
      <p className="text-xl mt-4">💰 {rental.price} USDC</p>
      <button className="mt-6 bg-green-600 text-white py-2 px-4 rounded">Simulate Booking</button>
    </div>
  )
}