"use client";

import { ApiCall } from "@/app/utils/ApiCall";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import admin from "../../../../public/asset/images/admin profile.jpg";
import { Button } from "@/app/shared/ui/Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Posts() {
  type PostType = {
    id: number;
    title: string;
    body: string;
    userId: number;
    image: string;
  };

  const [data, setData] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [online, setOnline] = useState(true);

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await ApiCall(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`,
        "GET"
      );

      if (response?.data?.length) {
        const formattedData = response.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
          image: admin || post.image,
        }));

        setData((prevData) => [...prevData, ...formattedData]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
      console.log(data);

    setLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {

      fetchData();
      
    }
  };

  const Network = () =>{
    window.addEventListener("online", () => {
      setOnline(true);
    });
    window.addEventListener("offline", () => {
      setOnline(false);
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    fetchData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="bg-main-color min-h-screen">
      <div className="mx-auto container px-4 py-6">
        <div className="flex flex-col gap-4 mt-20">
          {data.map((post, index) => (
            <div
              key={`${post.id}-${post.userId}-${index}`}
              className="bg-card-color shadow-md rounded-lg p-4 border border-border-color"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 mr-3">
                  <Image
                    src={post.image}
                    alt="Admin Profile"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-300">
                    User {post.userId}
                  </h4>
                  <p className="text-sm text-gray-500">2 hrs ago</p>
                </div>
              </div>
              <div>
                <h3 className="bg-text-gradient bg-clip-text text-lg font-semibold text-transparent">
                  {post.title}
                </h3>
                <p className="text-slate-200 mt-2">{post.body}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button theme="primary" classname="w-full">
                  Chat
                </Button>
              </div>
            </div>
          ))}

          {loading &&
            Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-card-color shadow-md rounded-lg p-4 border-[1px] border-border-color"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-[48px] h-[48px] mr-3 border-[1px] border-border-color rounded-full overflow-hidden">
                      <Skeleton circle={true} width={48} height={48} />
                    </div>
                    <div>
                      <Skeleton width={120} height={20} className="mb-2" />
                      <Skeleton width={80} height={16} />
                    </div>
                  </div>
                  <div>
                    <Skeleton width="70%" height={24} className="mb-2 border-[1px] border-border-color" />
                    <Skeleton width="100%" height={16} />
                    <Skeleton width="95%" height={16} />
                  </div>
                  <div className="mt-4 border-[1px] border-border-color p-2 rounded-xl">
                    <Skeleton width="100%" height={36} />
                  </div>
                </div>
              ))}



{online &&
            Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-card-color shadow-md rounded-lg p-4 border-[1px] border-border-color"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-[48px] h-[48px] mr-3 border-[1px] border-border-color rounded-full overflow-hidden">
                      <Skeleton circle={true} width={48} height={48} />
                    </div>
                  </div>
                  <div>
                    <Skeleton width="70%" height={24} className="mb-2 border-none" />
                    <Skeleton width="100%" height={16} />
                    <Skeleton width="95%" height={16} />
                  </div>
                  <div className="mt-4 border-[1px] border-border-color p-2 rounded-xl">
                    <Skeleton width="100%" height={36} />
                  </div>
                </div>
              ))}

          {!hasMore && (
            <div className="text-center my-4">
              <p>No more posts to load.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
