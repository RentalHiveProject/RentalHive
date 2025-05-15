import Link from 'next/link'

export default function Home() {
return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to <span className="text-indigo-600">RentalHive</span></h1>
      <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
        The decentralized marketplace for short-term rentals. Backed by NFTs, smart contracts, and DAO reputation.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/rentals" className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Explore Listings</Link>
        <Link href="/create" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50">List Your Property</Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="hero"
        className="mx-auto mt-12 rounded-2xl shadow-lg w-full max-w-4xl"
      />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="p-6 border rounded-xl bg-white shadow">
          <h3 className="text-xl font-semibold mb-2">🛡️ Trustless Payments</h3>
          <p className="text-gray-600 text-sm">Funds are locked in escrow smart contracts until rental ends.</p>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow">
          <h3 className="text-xl font-semibold mb-2">📄 NFT Agreements</h3>
          <p className="text-gray-600 text-sm">Each rental is backed by an on-chain NFT contract agreement.</p>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow">
          <h3 className="text-xl font-semibold mb-2">🏛️ DAO Reputation</h3>
          <p className="text-gray-600 text-sm">User ratings are stored on-chain for transparent credibility.</p>
        </div>
      </div>
    </section>
  )
}