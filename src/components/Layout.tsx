// components/Layout.tsx
import { Navbar } from '@/components/Navbar';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4 place-items-center">{children}</main>
    </div>
  )
}
