import axios from 'axios'

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT || ''

export async function uploadJSONToIPFS(data: any) {
  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
    })
    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
  } catch (err) {
    console.error('IPFS upload error:', err)
    return null
  }
}