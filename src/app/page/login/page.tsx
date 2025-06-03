"use client"

import Loginform from "@/app/api/auth/login";

export default function Login(){
    const supmit=async(email:string , password : string)=>{
        try{

            console.log("bla bla bla");
        }
        catch(err){
            console.log(err);
            
        }
        
    }
    return(
        <>
        <section className="bg-main-color p-14">
        <div className="container mx-auto ">
            <Loginform onSupmit={supmit}/>
        </div>
        </section>
        </>
    )
}