import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from local storage
  const token = localStorage.getItem('JWT_Token');

  // Check if a token exists
  if (token) {
    // Clone the request and set the Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Pass the cloned request to the next handler
    return next(authReq);
  } else {
    // Pass the original request if no token is found
    return next(req);
  }
};