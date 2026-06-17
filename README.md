# LuxeMart 🛒

A full-stack luxury e-commerce website built with Next.js 15, MongoDB Atlas, and deployed on Vercel.

## 🌐 Live Site
**[luxemart-pk.vercel.app](https://luxemart-pk.vercel.app)**

## ✨ Features
- 40 products with real images from Unsplash API
- User authentication (signup/login) with JWT
- Shopping cart with quantity management
- Checkout with Cash on Delivery and Card payment
- Admin panel to add/edit/delete products
- Search and filter by category
- Fully responsive design
- Product detail pages

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **Database:** MongoDB Atlas
- **Auth:** JWT + bcryptjs
- **Images:** Unsplash API
- **Deployment:** Vercel

## 🚀 Setup Locally
1. Clone the repo
2. Run `npm install`
3. Create `.env.local` with your MongoDB URI and keys
4. Run `npm run dev`
5. Open `http://localhost:3000`
6. Visit `/api/seed` to populate products

## 📡 API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |

## 👩‍💻 Author
Sana Rasheed
