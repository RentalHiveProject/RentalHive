'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const listings = JSON.parse(localStorage.getItem('rentals') || '[]')
    const newListing = { ...form, id: Date.now().toString() }
    localStorage.setItem('rentals', JSON.stringify([...listings, newListing]))
    router.push('/rentals')
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Rental Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" onChange={handleChange} required className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="border p-2 rounded" />
        <input name="price" placeholder="Price in USDC" onChange={handleChange} required className="border p-2 rounded" />
        <input name="image" placeholder="Image URL" onChange={handleChange} required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  )
}