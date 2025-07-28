import { NextResponse ,NextRequest } from "next/server";

export function middleware(req:NextRequest){
 const { pathname } = req.nextUrl;
const token= req.cookies.get('access_token_login')?.value;
if(pathname==='/register'||pathname==='/login'){
  if(token){
    return NextResponse.redirect(new URL('profile',req.url))
  }
  else{
    
    return NextResponse.next();
  }
}

}
export const config = {
  matcher: [
    '/register',
    '/login',
  ],
}