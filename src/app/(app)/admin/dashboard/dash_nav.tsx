"use client";
import Image from "next/image";
import logo from "../../../../../public/asset/images/logo.svg";
import person from "../../../../../public/asset/images/admin profile.jpg";
import { useState, useEffect } from "react";

export default function DashNav() {
  const [show, setShow] = useState<boolean>(true); 
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY || lastScrollY===0) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <section
        className={`bg-bg-dash-board border-[1px] border-gray-500 shadow-xl fixed  w-full transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex justify-between  container mx-auto items-center p-2">
          <div className="logo ">
            <Image src={logo} alt="logo" width={150}
            className="sm:w-[80px] md:w-[200px] lg:w-[150px]"
            />
          </div>

          <div className="profile flex items-center gap-2 rounded-[34px] p-3  justify-center">

            <div>
              <Image
                src={person}
                alt="person"
                className="rounded-full w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]"
              />
            </div>
            
          </div>
        </nav>
      </section>
    </>
  );
}
