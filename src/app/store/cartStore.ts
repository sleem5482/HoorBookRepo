import { create } from 'zustand'
import axios from 'axios'
import { BaseUrl, headers } from '@/app/components/Baseurl'
import { CartResponse } from '@/app/lib/type'

type CartStore = {
  cartCount: number
  setCartCount: (count: number) => void
  refreshCartCount: () => Promise<void>
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  refreshCartCount: async () => {
    try {
      const res = await axios.get<CartResponse>(`${BaseUrl}api/carts`, { headers })
      const count = res.data.data.data.data.length
      set({ cartCount: count })
    } catch (error) {
      console.error('❌ فشل جلب عدد السلة:', error)
      set({ cartCount: 0 })
    }
  },
}))
