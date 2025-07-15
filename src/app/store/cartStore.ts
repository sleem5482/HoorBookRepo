import { create } from 'zustand'
import axios from 'axios'
import { BaseUrl, headers } from '@/app/components/Baseurl'
import { CartResponse } from '@/app/lib/type'
import toast from 'react-hot-toast'

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
      toast.error('❌ فشل جلب عدد السلة')
      set({ cartCount: 0 })
    }
  },
}))
