'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  const features = [
    {
      title: '🛡️ Trustless Payments',
      desc: 'Funds are locked in escrow smart contracts until rental ends.',
    },
    {
      title: '📄 NFT Agreements',
      desc: 'Each rental is backed by an on-chain NFT contract agreement.',
    },
    {
      title: '🏛️ DAO Reputation',
      desc: 'User ratings are stored on-chain for transparent credibility.',
    },
  ]

  return (
    <section className="text-center py-20">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-6"
      >
        Welcome to <span className="text-indigo-600">RentalHive</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-600 text-lg mb-8 max-w-xl mx-auto"
      >
        The decentralized marketplace for short-term rentals. Backed by NFTs, smart contracts, and DAO reputation.
      </motion.p>

      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/rentals" className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
          Explore Listings
        </Link>
        <Link href="/create" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50">
          List Your Property
        </Link>
      </motion.div>

      <motion.img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="hero"
        className="mx-auto mt-12 rounded-2xl shadow-lg w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feat, idx) => (
          <motion.div
            key={feat.title}
            className="p-6 border rounded-xl bg-white shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + idx * 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className="text-gray-600 text-sm">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
