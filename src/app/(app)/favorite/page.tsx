"use client";

import { BaseUrl, headers } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { ApiResponse, CardProps, PaginatedResponse } from "@/app/lib/type";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Card } from "@/app/components/ui/Card";
import SmartNavbar from "@/app/components/ui/Navbar";

export default function Favorite() {
  const [product, setProduct] = useState<CardProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

const fetchFavorit = async () => {
  type ProductsResponse = ApiResponse<PaginatedResponse<CardProps>>;
  try {
    const url = `${BaseUrl}api/products?page=${page}&favourite=1`;
    const res = await axios.get<ProductsResponse>(url, {
      headers: headers,
    });

setProduct(prev => {
  const ids = new Set(prev.map(p => p.id));
  const newProducts = res.data.data.data?.filter(p => !ids.has(p.id)) || [];
  return [...prev, ...newProducts];
});

    setHasMore(!!res.data.data.links?.next);
    setPage(prev => prev + 1);
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};


  useEffect(() => {
    fetchFavorit();
  }, []);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchFavorit();
      }
    });

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loaderRef.current, hasMore]);

  return (
    <div>
<SmartNavbar/>
    <Container>
      
      <h2 className="text-2xl font-bold mb-4 ">المفضلة</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
      {product.map((p, index) => (
        <Card key={`${p.id}-${index}`} {...p} love={true}/>
      ))}

      </div>

      {hasMore && <div ref={loaderRef} className="h-10" />}
    </Container>
      </div>
  );
}
