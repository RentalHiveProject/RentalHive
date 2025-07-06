'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchFromIPFS } from '@/utils/ipfs'

const ITEMS_PER_PAGE = 4

export default function RentalsPage() {
  const [listings, setListings] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadRentals = async () => {
      const cids: string[] = JSON.parse(localStorage.getItem('rentalCIDs') || '[]')

      const all = await Promise.all(
        cids.map(async (cid) => {
          const data = await fetchFromIPFS(cid)
          return data ? { ...data, cid } : null
        })
      )

      setListings(all.filter(Boolean))
    }

    loadRentals()
  }, [])

  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const visibleListings = listings.slice(startIdx, endIdx)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏠 Rental Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleListings.map((item) => (
          <Link key={item.cid} href={`/rentals/${item.cid}`}>
            <div className="rounded-2xl shadow hover:shadow-lg transition overflow-hidden bg-white">
              <img src={item.image} className="w-full h-48 object-cover" alt={item.title} />
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-blue-600 mt-1">{item.price} USDC</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {listings.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Back
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} из {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
