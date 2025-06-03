"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <section className="side p-12 border-r-[1px] border-gray-500 shadow-right  z-50 h-full ">
                <nav className="sidebar" id="sidebar">
                    <ul className="flex flex-col justify-between gap-32 font-semibold text-[20px] items-center bg-text-gradient bg-clip-text text-xl  text-transparent">
                        <li>
                            <Link href="/dashboard/users">Users</Link>
                        </li>
                        <li>
                            <Link href="/dashboard/complain">Complains</Link>
                        </li>
                        <li>
                            <Link href="/dashboard/empelwee">empelwee</Link>
                        </li>
                        <li>
                            <Link href="/dashboard/empelwee">Free Users</Link>
                        </li>
                        <li>
                            <Link href="/dashboard/empelwee">Setting</Link>
                        </li>
                    </ul>
                </nav>
            </section>
        </>
    );
}
