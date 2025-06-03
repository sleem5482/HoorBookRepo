"use client"
import React, { useRef } from "react";
import table from "../../public/asset/images/table.png";
import application from "../../public/asset/images/Image Wrapper.png";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import email from "../../public/asset/images/mail.png";
import event from "../../public/asset/images/calender.svg";
import files from "../../public/asset/images/files.svg";
import doc from "../../public/asset/images/doc.svg";
import exit from "../../public/asset/images/Group 26.svg";
import down from "../../public/asset/images/Group 27.svg";
import up from "../../public/asset/images/Group 28.svg";
import dire from "../../public/asset/images/Group 29.svg";
import dire2 from "../../public/asset/images/Group 30.svg";
import dire3 from "../../public/asset/images/Group 31.svg";
import user1 from "../../public/asset/images/user1.svg";
import user2 from "../../public/asset/images/user2.svg";
import imgcontainer from "../../public/asset/images/Hero image.png";
import { Button } from "./shared/ui/Button";
import FeaturesCard from "./shared/components/FeacherCard";
import discord from '../../public/asset/images/discord.png'
import section4 from '../../public/asset/images/section4.png'
import ProductNews from "./shared/components/ProductNews";
import Footer from "./shared/components/Footer";
import Nav from "./shared/ui/Nav";
interface CardItem {
  src: StaticImageData;
  label: string;
  width: number;
}

export default function HomePage() {
 
  const cards: CardItem[] = [
    { src: email, label: "Email,", width: 43 },
    { src: event , label: "Events,", width: 31 },
    { src: files , label: "Files", width: 37 },
    { src: doc , label: "Documents", width: 22 },
  ];
  return (
    // <section className="bg-main-color">
    //   <section>
    //     <Nav/>
    //   </section>
    //   <section className="relative bg-main-color p-14">
    //     {/* Content Container */}
    //     <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-9">
    //       {/* Header Section */}
    //       <div className="flex flex-col justify-center gap-3 text-center">
    //         <h1 className="bg-text-gradient bg-clip-text text-5xl font-semibold text-transparent">
    //           Streamline Your Engineering Operations with Our Comprehensive ERP
    //           Solution
    //         </h1>
    //         <p className="bg-text-gradient bg-clip-text text-center text-lg text-transparent">
    //           Optimize your engineering projects with our ERP system—precision,
    //           collaboration, and efficiency unified in one platform.
    //         </p>
    //       </div>

    //       {/* Call-to-Action Buttons */}
    //       <div className="flex gap-9">
    //         <Button theme="primary">
    //           Get a demo
    //         </Button>
    //         <Button theme="Second"  >
    //           View pricing
    //         </Button>
    //       </div>

    //       {/* Hero Image */}
    //       <figure className="flex items-center justify-center">
    //         <Image
    //           src={imgcontainer}
    //           alt="CRM Dashboard Overview"
    //           width={808}
    //         />
    //       </figure>
    //     </div>

    //     {/* Decorative Elements */}
    //     <div
    //       className="absolute left-[-30px] top-32 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-[#32CAFD26] to-transparent blur-[50px]"
    //       aria-hidden="true"
    //     />
    //     <div
    //       className="absolute right-[10px] top-32 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-[#7214FF26] to-transparent blur-[50px]"
    //       aria-hidden="true"
    //     />
    //   </section>
    //   <section className="bg-main-color p-12">
    //     <div className="container mx-auto flex flex-col items-center justify-center">
    //       {/* Header Section */}
    //       <header className="text-feature flex w-[1238px] items-center justify-between">
    //         <h2 className="powerful w-[712px] bg-text-gradient bg-clip-text text-5xl font-semibold text-transparent">
    //           Powerful features to help you manage all your leads
    //         </h2>
    //         <p className="text-of-powershell w-[392px] bg-text-gradient bg-clip-text text-left text-[16px] text-transparent">
    //           Apsum dolor sit amet consectetur. Aliquam elementum elementum in
    //           ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet
    //           vel.
    //         </p>
    //       </header>

    //       {/* Features Section */}
    //       <div className="feature-boxes m-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    //         {Array.from({ length: 6 }).map((_, idx) => (
    //           <FeaturesCard key={idx} />
    //         ))}
    //       </div>
    //     </div>
    //   </section>
    //   <section className="relative bg-main-color py-12">
    //     <div className="container mx-auto flex flex-col items-center gap-9">
    //       <div className="text-center">
    //         <h2 className="bg-text-gradient bg-clip-text text-[40px] font-bold text-transparent md:text-[56px]">
    //           Essential apps that protect your
    //         </h2>
    //       </div>

    //       {/* Icons Section */}
    //       <div className="icons flex flex-wrap justify-center gap-12">
    //         {cards.map((icon, index) => (
    //           <div key={index} className="flex items-center gap-5">
    //             <Image
    //               src={icon.src}
    //               width={icon.width}
    //               alt={`${icon.label}-icon`}
    //             />
    //             <h3 className="bg-text-gradient bg-clip-text text-[24px] font-semibold text-transparent md:text-[42px]">
    //               {icon.label}
    //             </h3>
    //           </div>
    //         ))}
    //       </div>

    //       <div className="relative flex h-[513px] w-full max-w-[1224px] items-center justify-center gap-20 rounded-[10px] border-[1px] border-[#8F9BB7] bg-gradient-custom p-8">
    //         <div className="absolute -left-10 top-0 z-0 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-[#7214FF26] to-transparent blur-[45px]"></div>
    //         <div className="absolute -left-10 bottom-0 z-0 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-[#7214FF26] to-transparent blur-[45px]"></div>
    //         <div className="relative z-10 w-full max-w-[465px] text-left">
    //           <h3 className="text-[24px] font-bold text-[#F6F6F7] md:text-[30px]">
    //             End-to-end encrypted inbox and messages
    //           </h3>
    //           <p className="mt-4 bg-text-gradient bg-clip-text text-[14px] leading-relaxed text-transparent md:text-[16px]">
    //             Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor
    //             mauris viverra sed volutpat mauris. Amet nisi amet commodo
    //             adipiscing ut imperdiet nunc.
    //           </p>
    //           <button className="mt-6 w-[135px] rounded-[36px] border-[1px] border-white bg-[#282D45] p-3 text-white transition-all hover:bg-white hover:text-[#282D45]">
    //             Learn more
    //           </button>
    //         </div>

    //         {/* User Section */}
    //         <div className="user h-[373px] w-[515px] rounded-[10px] border-[1px] border-[#918e8e] bg-transparent p-6">
    //           <div className="header-of-icon flex items-center justify-between">
    //             <div className="left flex gap-3">
    //               <div className="w-[40px] border-r-[1px] border-r-black">
    //                 <Image
    //                   src={exit }
    //                   alt="exit"
    //                   width={23}
    //                 />
    //               </div>
    //               <div className="flex gap-2">
    //                 <Image
    //                   src={down }
    //                   alt="exit"
    //                   width={23}
    //                 />
    //                 <Image src={up } alt="exit" width={23} />
    //               </div>
    //             </div>

    //             <div className="right">
    //               <div className="flex gap-2">
    //                 <Image
    //                   src={dire }
    //                   alt="exit"
    //                   width={23}
    //                 />
    //                 <Image
    //                   src={dire2 }
    //                   alt="exit"
    //                   width={23}
    //                 />
    //                 <Image
    //                   src={dire3 }
    //                   alt="exit"
    //                   width={23}
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           <div className="title-user pt-5">
    //             <div className="head text-[18px] font-bold text-[#F6F6F7]">
    //               <h2>Invitation to present at Bsides</h2>
    //             </div>
    //             <div className="flex flex-col items-center justify-between">
    //               {/* User 1 Card */}
    //               <div className="user1 mt-4 w-[469px] rounded-[6px] border-[1px] border-[#8F9BB7] bg-card-color p-2">
    //                 <div className="mail-and-date flex items-center justify-between">
    //                   <div className="info flex items-center gap-2">
    //                     <div className="img">
    //                       <Image
    //                         src={user1 }
    //                         alt="user"
    //                         width={30}
    //                       />
    //                     </div>

    //                     <div className="name">
    //                       <h4 className="text-[14px] font-bold text-white">
    //                         R. Baynham
    //                       </h4>
    //                       <p className="email text-[12px] text-[#8F9BB7]">
    //                         tranthuy.nute@gmail.com
    //                       </p>
    //                     </div>
    //                   </div>

    //                   <div className="date">
    //                     <p className="date text-[12px] text-[#8F9BB7]">
    //                       Feb 8, 2023
    //                     </p>
    //                   </div>
    //                 </div>

    //                 <div className="details">
    //                   <p className="date mt-2 text-left text-[12px] text-[#8F9BB7]">
    //                     Lorem ipsum dolor sit amet consectetur. Non eget
    //                     facilisis justo euismod ante mauris orci cursus.
    //                   </p>
    //                 </div>
    //               </div>

    //               {/* User 2 Card */}
    //               <div className="user2 mt-4 rounded-[10px] border-[1px] border-[#8F9BB7] bg-card-color p-2">
    //                 <div className="mail-and-date flex items-center justify-between">
    //                   <div className="info flex items-center gap-2">
    //                     <div className="img">
    //                       <Image
    //                         src={user2 }
    //                         alt="user"
    //                         width={30}
    //                       />
    //                     </div>

    //                     <div className="name">
    //                       <h4 className="text-[14px] font-bold text-white">
    //                         R. Baynham
    //                       </h4>
    //                       <p className="email text-[12px] text-[#8F9BB7]">
    //                         tranthuy.nute@gmail.com
    //                       </p>
    //                     </div>
    //                   </div>

    //                   <div className="date">
    //                     <p className="date text-[12px] text-[#8F9BB7]">
    //                       Feb 8, 2023
    //                     </p>
    //                   </div>
    //                 </div>

    //                 <div className="details">
    //                   <p className="date mt-2 text-left text-[12px] text-[#8F9BB7]">
    //                     Lorem ipsum dolor sit amet consectetur. Non eget
    //                     facilisis justo euismod ante mauris orci cursus.
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="relative bg-main-color p-12 mb-20">
    //     <div className="container mx-auto">
    //       <div className="relative flex flex-row-reverse justify-center gap-7">
    //         {/* Main Section for Uploading Files */}
    //         <article className="share-and-upload relative flex h-[576px] w-[690px] flex-col items-center justify-center rounded-[10px] border-[1px] border-[#8F9BB7] bg-gradient-custom">
    //           <div className="absolute -right-[50px] top-0 z-0 h-[400px] w-[500px] rounded-full bg-gradient-to-t from-[#7214FF26] to-transparent blur-[45px]"></div>

    //           <div className="relative z-10 w-[578px] p-2">
    //             <h3 className="text-[24px] font-bold text-[#F6F6F7] md:text-[30px]">
    //               Upload, share, and preview any file
    //             </h3>
    //             <p className="mt-4 bg-text-gradient bg-clip-text text-[14px] leading-relaxed text-transparent md:text-[16px]">
    //               Tellus et adipiscing sit sit mauris pharetra bibendum. Ligula
    //               massa netus nulla ultricies purus.
    //             </p>
    //           </div>

    //           {/* Table Image */}
    //           <figure className="mt-2 table rounded-[6px] border-[1px] border-[#8F9BB7] p-3">
    //             <Image src={table} alt="File preview table" width={540} />
    //           </figure>
    //         </article>

    //         {/* Mobile Application Section */}
    //         <article className="mobile relative flex w-[496px] flex-col items-center justify-center gap-6 rounded-[10px] border-[1px] border-[#8F9BB7] bg-main-color p-6">
    //           <div className="relative">
    //             <div className="absolute -right-[50px] top-[-50px] z-0 h-[250px] w-[150px] rounded-full bg-gradient-to-t from-[#41E88D] to-transparent blur-[65px]"></div>

    //             <figure>
    //               <Image
    //                 src={application}
    //                 alt="Mobile application preview"
    //                 width={275}
    //               />
    //             </figure>
    //           </div>

    //           <div>
    //             <div className="relative">
    //               {/* Shadow Effect */}
    //               <div className="absolute -left-10 bottom-0 z-0 h-[250px] w-[200px] rounded-full bg-gradient-to-t from-[#7214FF26] to-transparent blur-[15px]"></div>

    //               {/* Content */}
    //               <div className="descripe relative z-10 text-left">
    //                 <h3 className="text-[24px] font-bold text-[#F6F6F7] md:text-[30px]">
    //                   Mobile applications
    //                 </h3>
    //                 <p className="w-[386px] bg-text-gradient bg-clip-text text-left text-[16px] text-transparent">
    //                   Rorem ipsum dolor sit amet consectetur. Gravida convallis
    //                   orci ultrices non. Ultricies tempor at ut cursus mi.
    //                   Aliquam sed amet vitae orci ac penatibus consectetur.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </article>
    //       </div>

    //       {/* Navigation Buttons */}
    //       <nav className="btns mt-12 flex items-center justify-center gap-4">
    //         <div className="flex gap-9">
    //           <Button theme="primary">
    //             Get a demo
    //           </Button>
    //           <Button theme="second" >
    //             View pricing
    //           </Button>
    //         </div>
    //       </nav>
    //     </div>
    //   </section>
    //   <section className="mb-20 bg-main-color">
    //     <div className="container mx-auto">
    //       <div className="flex w-full justify-center ">
    //         <Image src={section4} alt="#" width={1920} height={1043}/>
    //       </div>
    //     </div>
    //   </section>
    
    //   <section className=" bg-main-color p-2">
    //     <div className="container mx-auto">
    //       <div className="flex w-full justify-center ">
    //         <Image src={discord} alt="#" width={1224} height={447}/>
    //       </div>
    //     </div>
    //   </section>


    //   <section className="mt-20">
    //     <ProductNews/>
    //   </section>

    //   <section className="mt-20 p-20">
    //     <Footer/>
    //   </section>
    // </section>
    <>
    </>
  );
}