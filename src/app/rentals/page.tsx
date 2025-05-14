'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function RentalsPage() {
  const [listings, setListings] = useState<any[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rentals') || '[]')
    setListings(saved)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏠 Объявления</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {listings.map((item) => (
          <Link key={item.id} href={`/rentals/${item.id}`} className="border rounded-xl p-4 hover:shadow-md transition">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
            <p className="text-gray-600">{item.price} USDC</p>
          </Link>
        ))}
      </div>
    </div>
  )
}