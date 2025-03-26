export const ironoptions: any = {
  password: process.env.SESSION_PASSWORD as String,
  cookieName: process.env.SESSION_COOKIE_NAME as String,
  // 仅在 HTTPS 环境下使用，开发环境可以设为 false
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
}