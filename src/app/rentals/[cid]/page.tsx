'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchFromIPFS } from '@/utils/ipfs'
import { useWallet } from '@solana/wallet-adapter-react'
import { mintRentalNFT } from '@/utils/mintNFT'

const mockReviews = [
  { user: '0xA3...D1', text: 'Great place! Very clean and nice host.', rating: 5 },
  { user: '0xF8...C9', text: 'Good value. Had some issues with WiFi.', rating: 4 },
  { user: '0xB2...E3', text: 'Owner was unresponsive. Would not book again.', rating: 2 },
]

const averageRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length

export default function RentalDetails() {
  const params = useParams()
  const cid = params.cid as string
  const [rental, setRental] = useState<any>(null)
  const wallet = useWallet()

  useEffect(() => {
    const loadRentals = async () => {
      const data = await fetchFromIPFS(cid)
      setRental(data)
    }

    loadRentals()
  }, [cid])

  const handleBooking = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet first")
      return
    }

    try {
      const nft = await mintRentalNFT(wallet, {
        name: `Rental: ${rental.title}`,
        description: `Rental booked by ${wallet.publicKey.toBase58()} from ${rental.owner}`,
      })

      alert(`🎉 Rental booked! NFT minted: ${nft.address.toBase58()}`)
    } catch (err) {
      console.error('Mint failed', err)
      alert('❌ Minting failed. Check console for details.')
    }
  }

  if (!rental) return <p className="text-center py-10">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img src={rental.image} alt={rental.title} className="w-full h-64 object-cover rounded-xl" />
      <h1 className="text-3xl font-bold mt-4">{rental.title}</h1>
      <p className="text-gray-600 mt-2">{rental.description}</p>
      <p className="text-xl mt-4">💰 {rental.price} USDC</p>

      <button
        onClick={handleBooking}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        Book Now
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Reputation & Reviews</h2>
        <p className="text-yellow-600 font-medium mb-4">
          ⭐ {averageRating.toFixed(1)} / 5 ({mockReviews.length} reviews)
        </p>
        <ul className="space-y-3">
          {mockReviews.map((rev, i) => (
            <li key={i} className="border rounded p-4 bg-gray-50">
              <p className="text-sm text-gray-500">{rev.user}</p>
              <p className="text-gray-700">{rev.text}</p>
              <p className="text-yellow-500">Rating: {'⭐'.repeat(rev.rating)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}