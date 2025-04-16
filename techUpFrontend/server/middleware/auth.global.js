// server/middleware/auth.global.js
import { getCookie } from 'h3';

export default defineEventHandler((event) => {
  // 보호 대상 경로 설정
  const protectedRoutes = ['/wishlist', '/profile'];
  const url = event.req.url || '';
  if (!protectedRoutes.some(route => url.startsWith(route))) {
    return;
  }
  
  // isLoggedIn 쿠키 읽기 (HttpOnly가 아니므로 접근 가능)
  const loginFlag = getCookie(event, 'isLoggedIn');
  if (loginFlag !== 'true') {
    return sendRedirect(event, '/login');
  }
});
