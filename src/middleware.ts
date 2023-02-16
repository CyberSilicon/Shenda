
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import Parse from "./services/parse";
// import { getSessionOfCurrentUser } from './lib/api';

// Call our authentication function to check the request
export async function middleware(request: NextRequest) {

  try {
    // const token = request.cookies.get('sessionTokenCurrentUser')?.value
    // const session = await getSessionOfCurrentUser(token);

    // const currentUser = await Parse.User.currentAsync();

    if (request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (err) {
    console.log("the middlware does not working: " + err.message)
  }
}
      // if (request.nextUrl.pathname.startsWith('/register')) {
      //   return NextResponse.redirect(new URL('/login', request.url))
      // }

// export const config = {
//   matcher: ['/'],  
// }

