
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionOfCurrentUser } from './lib/api';

// Call our authentication function to check the request
export async function middleware(request: NextRequest) {

  try {
    const token = request.cookies.get('sessionTokenCurrentUser')?.value;
    const session = await getSessionOfCurrentUser(token);

    if (request.nextUrl.pathname.endsWith('/') && session.code !== undefined) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (err) {
    console.log("Middlware error: " + err.message)
  }
}
     
