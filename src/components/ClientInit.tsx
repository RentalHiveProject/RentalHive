'use client'
import { useEffect } from 'react'

const defaultListings = [
      "QmNQ992utg1hP1AJPFqQoVX9ywKtdfMr8Qgc24UY4AfMFK",
      "QmYazoDvDiKXvh4z2babNCCG5Yz4LZu2tPQqiTXFoWKSFV",
      "QmeXkY3fKsvV8swQGBEXWmKXK8KsrYHatCBDr6dPL9qqJq",
      "QmUtbATzPi4whMZDiipCZqDhLY2B1cVR6q2m5uVEfsNChV"
    ]

export default function ClientInit() {
  useEffect(() => {
    if (!localStorage.getItem('rentalCIDs')) {
      localStorage.setItem('rentalCIDs', JSON.stringify(defaultListings))
    }
  }, [])

  return null
}
