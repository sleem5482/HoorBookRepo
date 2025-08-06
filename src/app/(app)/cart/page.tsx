'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'
import { Trash2, Pencil } from 'lucide-react'
import { BaseUrl, headers } from '@/app/components/Baseurl'
import Container from '@/app/components/Container'
import {  CartItem, CartResponse, FieldForm } from '@/app/lib/type'
import SmartNavbar from '@/app/components/ui/Navbar'
import toast from 'react-hot-toast'
import { useCartStore } from '@/app/store/cartStore'
import Cookies from "js-cookie";
import { LoginRequiredModal} from '@/app/components/ui/Pop-up-login'
import FormField from '@/app/components/ui/Formfield'
import { Cash } from '@/app/components/FeatureComponent/Modelcash'
import Link from 'next/link';
const EditModal = ({
  item,
  onClose,
  onSave,
}: {
  item: CartItem
  onClose: () => void
  onSave: (newQty: number) => void,
}) => {
  const [newQty, setNewQty] = useState(item.qty);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
          aria-label="إغلاق"
        >
          ×
        </button>
        <div className="w-32 h-32 relative mx-auto mb-4 rounded-xl overflow-hidden shadow-md">
          <Image
            src={`${BaseUrl}${item.product.image}`}
            alt={item.product.name}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>
        <h2 className="text-center font-bold text-xl text-gray-800 mb-1">{item.product.name}</h2>
        <p className="text-center text-green-700 font-semibold text-sm mb-4">
          السعر بعد الخصم: {item.price_after_discount} ج.م <span className='text-gray-400 text-sm'>{item.price_before_discount}</span>
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">اختر الكمية:</label>
          <select
            value={newQty}
            onChange={e => setNewQty(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[...Array(item.product.stock)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => onSave(newQty)}
          className="w-full mt-2 bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          حفظ التعديل
        </button>
      </div>
    </div>
  )
}

export default function Cart() {
  const token = Cookies.get("access_token_login");
  const [login,setlogin]=useState<boolean>(true);
  const [items, setItems] = useState<CartItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [editingItem, setEditingItem] = useState<CartItem | null>(null)
  const { refreshCartCount } = useCartStore()
  const [cartInfo, setCartInfo] = useState<any>(null)
  const [code, setcode] = useState<Record<string, any>>({});
  const [open,setopen]=useState<boolean>(false)
  const [verificatio,setverification]=useState(false);
  const discount=`${BaseUrl}api/check-valid-copoun`;
  const fields:FieldForm[]=[
    {
      label: "كود الخصم ",
      name: "code",
      type: "text",
      requierd: false,
      placeholder:"ادخل كود الخصم"
    },
  ]

  const fetchData = async (pageNum: number) => {
    try {
      if(!token){
        setlogin(true);
      }
      else{
        setlogin(false)
        const res = await axios.get<CartResponse>(
          `${BaseUrl}api/carts?page=${pageNum}`,
          { headers }
      )

      const newItems = res.data.data.data.data
      const info=res.data.data.info
      
      
      const currentPage = res.data.data.data.meta.current_page
      const lastPage = res.data.data.data.meta.last_page
      setCartInfo(info)
      setItems(prev => {
        const ids = new Set(prev.map(p => p.id));
        const filtered = newItems.filter(p => !ids.has(p.id));
        return [...prev, ...filtered];
      });
      setHasMore(currentPage < lastPage)
    }
    } catch (error) {
      console.error('حدث خطأ أثناء تحميل البيانات:', error)
    }
  }

useEffect(() => {
  if (token) {
    setlogin(false);
    fetchData(1);
  } else {
    setlogin(true);
  }
}, [token]);


  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchData(nextPage)
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BaseUrl}api/carts/${id}`, { headers })
      setItems(prev => prev.filter(item => item.id !== id))
      refreshCartCount()
      toast.success('🗑️ تم حذف المنتج بنجاح')
       fetchData(1)
    } catch (error) {
      console.error('فشل حذف العنصر:', error)
      toast.error('حدث خطأ أثناء حذف المنتج')
    }
  }

  const handleEdit = (id: number) => {
    const item = items.find(item => item.id === id)
    if (item) {
      setEditingItem(item)
    }
  }

  const handleSaveEdit = async (newQty: number) => {
    if (!editingItem) return

    try {
      await axios.put(`${BaseUrl}api/carts/${editingItem.id}`, {
        qty: newQty
      }, { headers })

      setItems(prev =>
        prev.map(item =>
          item.id === editingItem.id ? { ...item, qty: newQty } : item
        )
      )

      refreshCartCount() 
      toast.success('🎉 تم تعديل المنتج بنجاح')
      setEditingItem(null)
      fetchData(1);
    } catch (error) {
      toast.error('❌ حدث خطأ أثناء التعديل')
    }
  }
const handelcode = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post(discount, code, { headers });

    const status = res.data.status;

    if (status.status === false ) {
      toast.error("❌ خطأ في الكود");
      setverification(false)
      return;
    }
    
    toast.success("✅ تم تفعيل الكود بنجاح");
    setverification(true)
    const discountData = res.data;
  

    if (!discountData) {
      toast.error("حدث خطأ في قراءة بيانات الخصم");
      return;
    }

    let updatedTotal = Number( (cartInfo.total));

    if (discountData.data.type === 'percentage') {
      updatedTotal = updatedTotal - (updatedTotal * (discountData.data.value / 100));
    } else {
      updatedTotal -=   discountData.data.value;
      console.log(updatedTotal);
      
    }

    updatedTotal = Math.max(0, updatedTotal);

    setCartInfo((prev: any) => ({
      ...prev,
      total: String(updatedTotal),
    }));

  } catch (error: any) {
    console.error(error);
    toast.error("حدث خطأ أثناء التفعيل");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
      <SmartNavbar />

      <Container>
        <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<p className="text-center text-gray-600 mt-4 animate-pulse">جارٍ التحميل...</p>}
          endMessage={
            <>
            </>
          }
        >
          <div className="text-center font-bold text-gray-800 text-3xl mt-24 mb-6">
            🛒 سلة المشتريات
          </div>


          {cartInfo && (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center text-sm sm:text-base">
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">💰 السعر الإجمالي</p>
      <p className="text-green-700 text-lg font-bold">{cartInfo.total} ج.م</p>
    </div>

    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">🚚 خصم التوصيل</p>
      <p className="text-orange-600 text-lg font-bold">{cartInfo.delivery_discount}%</p>
    </div>

    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-200">
      <p className="text-gray-700 font-semibold mb-1">⭐ نقاطك</p>
      <p className="text-purple-700 text-lg font-bold">
        {cartInfo.points_settings.points} نقطة = {cartInfo.points_settings.price} ج.م
      </p>
      <p className="text-gray-500 text-xs mt-1">سعر النقطة: {cartInfo.points_settings.point_price} ج.م</p>
    </div>
  </div>
)}
<div className="code mb-7">
<form onSubmit={handelcode} className="w-full">
  <div className="flex justify-center items-center gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow border border-gray-200">
    
    <div className="flex-1">
      <FormField fields={fields} data={code} onChange={setcode} />
    </div>
<div className='mt-11'>

    <button
      type="submit"
      className="p-4  bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
      >
      تفعيل
    </button>
      </div>
  </div>
</form>

</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-10">
            {items.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border border-gray-200 p-5 rounded-3xl shadow-xl bg-white/50 backdrop-blur-md transition-all duration-300"
              >
                <Link href={`/details/${item.product_id}`} className="w-28 h-28 relative rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
                  <Image
                    src={`${BaseUrl}${item.product.image}`}
                    alt={item.product.name}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                </Link>

                <Link href={`/details/${item.product_id}`} className="flex-1 text-center sm:text-right">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.product.name}</h3>
                  { ((item.product_type)=== "Piece")?(

                    <p className="text-sm text-gray-700 mb-1">الكمية: {item.qty}  قطعه</p>
                  ):
                  (
                    <p className="text-sm text-gray-700 mb-1">الكمية: {item.qty} دسته</p>
                  )}
                  <div className='flex items-center'>

                  <p className="text-sm text-green-700 font-semibold">
                    السعر بعد الخصم: {item.price_after_discount} ج.م
                  </p>
                    <p className='text-gray-400 text-sm line-through mr-4'> {item.price_before_discount} ج .م</p>
                  </div>
                </Link>

                <div className="flex flex-row sm:flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-700 shadow transition"
                    title="تعديل"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full bg-red-200 hover:bg-red-300 text-red-700 shadow transition"
                    title="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
      </div>


<div className="sale">
        <button
      type="submit"
      onClick={()=>{
        setopen(true)
      }}
      className="p-4  w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
      >
      اتمام الشراء
    </button>
      </div>
        </InfiniteScroll>

  <Cash
  show={open}
  id={1}
  code={(verificatio)?code.code:undefined}
  items={items}
  oncheckout={() => {
    console.log("🚀 بيانات الطلب:");
  }}
  close={() => setopen(false)} 
/>




   </Container>

      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}
      <LoginRequiredModal show={login}/>
    </div>
  )
}
