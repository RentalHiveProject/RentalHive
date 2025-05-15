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
          <Link key={item.id} href={`/rentals/${item.id}`}>
            <div className="rounded-2xl shadow hover:shadow-lg transition overflow-hidden bg-white">
              <img src={item.image} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-blue-600 mt-1">{item.price} USDC</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}