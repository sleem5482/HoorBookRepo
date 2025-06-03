"use client"
import RegisterForm from "@/app/api/auth/register"
import Footer from "@/app/shared/components/Footer"
import Nav from "@/app/shared/ui/Nav"

export default function Refgister(){
    const Registe_api=async(email:string ,password : string , username:string ,phone:string)=>{
        try{
            console.log(email,password);
            
        }
        catch(err){
            console.log(err);
            
        }
    }
    return(
        <>
        <section className="bg-main-color p-14">
        <div className="container mx-auto ">
            <RegisterForm Register={Registe_api}/>
        </div>
        </section>
        </>
    )
}