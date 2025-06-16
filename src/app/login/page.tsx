"use client";
import Container from "../components/Container";
import { signIn } from "next-auth/react";
export default function LoginPage() {
    return(
        <Container>
 <div className="text-black flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
        </Container>
    )
}