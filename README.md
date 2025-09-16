# NextAuth v5 xử lý Access Token và Refresh Token

- Cứ sau 10s session sẽ được re-fetch lại
- Tự động refresh lại token khi accessToken hết hạn
- Tự động logout khi refresh token thất bại
- Session lưu thông tin người dùng và token (accessToken, refreshToken)
