// middleware.js (or middleware.ts for TypeScript)
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// List of admin paths (can also use regex for more complex matching)
const adminPaths = [
  "/usermanagement",
  // "/module/(.*)",
  "/admin",
  "/admin/(.*)", // All subroutes under /admin
  "/upload",
  "/edit",
  "/delete",
];

// List of protected paths (both admin and regular users need to be logged in)
const protectedPaths = [...adminPaths, "/download", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // 1. Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path.replace("/(.*)", ""))
  );

  // 2. Check if the path is admin-only
  const isAdminPath = adminPaths.some((path) =>
    pathname.startsWith(path.replace("/(.*)", ""))
  );

  // 3. If not a protected path, continue
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // 4. If protected path but no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 5. Verify JWT (in middleware we can only do basic checks)
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    // console.log(payload.role);

    const isNotAdmin = (payload.role !== "ADMIN" && payload.role !== "SPK_MANAGER") || payload.role == null;

    // console.log(isNotAdmin);

    if (isAdminPath && isNotAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // // 6. If admin path but user is not admin, redirect to unauthorized
    // if (isAdminPath && payload.role !== 'ADMIN' || payload.role == null) {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url))
    // }

    // 7. Add user data to headers for server components/pages to use
    const headers = new Headers(request.headers);
    headers.set("x-user-id", payload.id);
    headers.set("x-user-role", payload.role);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  } catch (error) {
    // 8. If token is invalid, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

// Optional: Configure which paths middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};

// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('token')?.value;

//   // Public paths - no token required
//   if (!isProtectedPath(pathname)) {
//     return NextResponse.next();
//   }

//   // No token - redirect to login
//   if (!token) {
//     return redirectToLogin(request, pathname);
//   }

//   try {
//     // Decode JWT (no verification - that happens in API calls)
//     const payload = decodeJwt(token);

//     // Admin path access check
//     if (isAdminPath(pathname) {
//       if (!payload.roles?.includes('ROLE_ADMIN')) { // Match Spring Boot's role format
//         return NextResponse.redirect(new URL('/unauthorized', request.url));
//       }
//     }

//     // Add user info to headers for server components
//     return NextResponse.next({
//       request: {
//         headers: createHeadersWithUserData(payload),
//       },
//     });
//   } catch (error) {
//     // Invalid token - clear cookie and redirect
//     return clearTokenAndRedirect(request);
//   }
// }

// // Helper functions
// function decodeJwt(token) {
//   const base64Payload = token.split('.')[1];
//   const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
//   return JSON.parse(payload);
// }

// function createHeadersWithUserData(payload) {
//   const headers = new Headers();
//   headers.set('x-user-id', payload.userId || '');
//   headers.set('x-user-email', payload.sub || ''); // sub = username in Spring
//   headers.set('x-user-roles', JSON.stringify(payload.roles || []));
//   return headers;
// }

// function clearTokenAndRedirect(request) {
//   const response = NextResponse.redirect(new URL('/login', request.url));
//   response.cookies.delete('token');
//   return response;
// }

// function redirectToLogin(request, fromPath) {
//   const loginUrl = new URL('/login', request.url);
//   loginUrl.searchParams.set('from', fromPath);
//   return NextResponse.redirect(loginUrl);
// }

// // Path configuration (same as before)
// const adminPaths = ['/admin', '/admin/(.*)', '/upload', '/edit', '/delete'];
// const protectedPaths = [...adminPaths, '/download', '/profile'];

// function isProtectedPath(path) {
//   return protectedPaths.some(p => path.startsWith(p.replace('/(.*)', '')));
// }

// function isAdminPath(path) {
//   return adminPaths.some(p => path.startsWith(p.replace('/(.*)', '')));
// }

// // Matcher config (same as before)
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
// };
