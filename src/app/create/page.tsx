'use client'
import { uploadJSONToIPFS } from '@/utils/pinata';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react'

export default function CreatePage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });
  const wallet = useWallet();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const rental = {
    ...form,
    owner: wallet.publicKey?.toBase58() || 'anonymous',
    }

    const ipfsUrl = await uploadJSONToIPFS(rental)

    if (ipfsUrl) {
      const cid = ipfsUrl.split('/').pop()
      if (cid) {
        const existingCIDs = JSON.parse(localStorage.getItem('rentalCIDs') || '[]')
        localStorage.setItem('rentalCIDs', JSON.stringify([...existingCIDs, cid]))
      }

      alert('Rental uploaded to IPFS successfully!')
    } else {
      alert('Failed to upload to IPFS')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Create Rental Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            placeholder="e.g. Cozy apartment in Barcelona"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Describe the place, rules, etc."
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price (USDC)</label>
            <input
              name="price"
              placeholder="e.g. 120"
              onChange={handleChange}
              required
              type="number"
              min="0"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Image URL</label>
            <input
              name="image"
              placeholder="e.g. https://..."
              onChange={handleChange}
              required
              type="url"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-lg transition"
        >
          Submit Listing
        </button>
      </form>
    </div>
  )
}