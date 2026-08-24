# HerHelp

Mobile app (Expo) and API (Next.js + MongoDB Atlas) to help women and girls in Ethiopia find support.

## Folders

- `mobile` — React Native Expo app
- `server` — Next.js API

## 1. Backend

1. Copy `server/.env.example` into `server/.env.local`.
2. Paste your MongoDB Atlas connection string into `MONGODB_URI`.
3. Set `JWT_SECRET` and `ADMIN_SIGNUP_CODE`.
4. Run:

```bash
cd server
npm run dev
```

API: http://localhost:3000

## 2. Mobile

```bash
cd mobile
npx expo start
```

On a physical phone, set `EXPO_PUBLIC_API_URL` in `mobile/.env` to your computer IP, for example `http://192.168.1.10:3000`. Android emulator often needs `http://10.0.2.2:3000`.

## Auth

- Users register with name, phone, and password.
- The first admin can register without a code. Later admins need `ADMIN_SIGNUP_CODE`.
