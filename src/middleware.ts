
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Parse from "./services/parse";
import { getSessionOfCurrentUser } from './lib/api';


// Call our authentication function to check the request
export async function middleware(request: NextRequest) {
  try {
    
    const token = request.cookies.get('sessionTokenCurrentUser')?.value
    const session = await getSessionOfCurrentUser(token);
      console.log("the session: " + session.code)
      console.log("the token: " + token)
      if (request.nextUrl.pathname.startsWith('/') && session.code !== undefined) {
          return NextResponse.redirect(new URL('/login', request.url))
        }
      // if (request.nextUrl.pathname.startsWith('/register')) {
      //   return NextResponse.redirect(new URL('/login', request.url))
      // }
    } catch (err) {
        console.log(err.message)
    }
}

export const config = {
  matcher: ['/'],  
}




// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import Parse from "./services/parse";


// // Call our authentication function to check the request
// export async function middleware(request: NextRequest) {
//   try {
    
//     const isAuth = await Parse.User.current();
//       console.log(isAuth)

//       if (request.nextUrl.pathname.startsWith('/')) {
//           return NextResponse.redirect(new URL('/login', request.url))
//         }
//       if (request.nextUrl.pathname.startsWith('/register')) {
//         return NextResponse.redirect(new URL('/login', request.url))
//       }
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export const config = {
//   matcher: ['/','/register'],  
// }

