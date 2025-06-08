'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchFromIPFS } from '@/utils/ipfs'
import { useWallet } from '@solana/wallet-adapter-react'

export default function Dashboard() {
  const [myListings, setMyListings] = useState<any[]>([])
  const { publicKey } = useWallet()

  useEffect(() => {
    const loadListings = async () => {
      const cids = JSON.parse(localStorage.getItem('rentalCIDs') || '[]')
      const listings = await Promise.all(
        cids.map(async (cid: string) => {
          const data = await fetchFromIPFS(cid)
          return data ? { ...data, id: cid } : null
        })
      )

      const filtered = listings.filter(
        (item) => item && item.owner === publicKey?.toBase58()
      )

      setMyListings(filtered)
    }

    if (publicKey) loadListings()
  }, [publicKey])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      {myListings.length === 0 && <p>No listings yet</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {myListings.map((item) => (
          <Link key={item.id} href={`/rentals/${item.id}`} className="border rounded-xl p-4">
            <img src={item.image} className="w-full h-40 object-cover rounded" alt={item.title} />
            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}