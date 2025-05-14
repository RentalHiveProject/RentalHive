'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const WalletButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

const links = [
  { href: '/', label: 'Home' },
  { href: '/rentals', label: 'Rentals' },
  { href: '/create', label: 'Create' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold">🏠 RentalHive</span>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium ${pathname === href ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500`}
          >
            {label}
          </Link>
        ))}
      </div>
      <WalletButton />
    </nav>
  )
}