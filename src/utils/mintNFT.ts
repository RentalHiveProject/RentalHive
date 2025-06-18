import {
  Metaplex,
  irysStorage,
  walletAdapterIdentity,
} from '@metaplex-foundation/js'
import { Connection } from '@solana/web3.js'
import { WalletContextState } from '@solana/wallet-adapter-react'

export async function mintRentalNFT(wallet: WalletContextState, metadata: {
  name: string
  description: string
}) {
  if (!wallet.connected || !wallet.publicKey) throw new Error('Wallet not connected')

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(irysStorage())

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: metadata.name,
    description: metadata.description,
  })

  const { nft } = await metaplex.nfts().create({
    uri,
    name: metadata.name,
    sellerFeeBasisPoints: 0,
    symbol: 'RENT',
  })

  return nft
}