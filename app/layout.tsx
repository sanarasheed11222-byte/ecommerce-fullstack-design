import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'LuxeMart',
  description: 'Premium Luxury Shopping',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#1a1a1a',
                  color: '#fff',
                  border: '1px solid rgba(234,179,8,0.3)',
                },
                success: { iconTheme: { primary: '#EAB308', secondary: '#000' } },
              }}
            />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}