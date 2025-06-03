import Image from "next/image"
import logo from "../../../../public/asset/images/logo_founder-removebg-preview-removebg-preview.png"
import Link from "next/link"
import { Button } from "./Button"
export default function Nav(){
    return(
        <>
        <section className="bg-main-color border-b-[1px] border-b-[#949494]">
            <nav className="container mx-auto text-white font-bold  flex justify-between items-center  ">
                <div className="logo">
                    <Link href={"/"}>
                    <Image src={logo} alt="logo" width={250}/>
                    </Link>

                </div>


                <div className="btns flex gap-2">
                    <Button type="button" theme="primary">Login</Button>
                    <Button type="button" theme="secondary">Register</Button>
                </div>
            </nav>
        </section>
        </>
    )
}