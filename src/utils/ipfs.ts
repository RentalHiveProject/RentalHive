export async function fetchFromIPFS(cid: string) {
  try {
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`)
    if (!res.ok) throw new Error('Failed to fetch IPFS content')
    return await res.json()
  } catch (err) {
    console.error('IPFS fetch error:', err)
    return null
  }
}