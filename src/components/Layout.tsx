// components/Layout.tsx
import Navbar from '@/components/NewNavbar';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4 mt-10 place-items-center">{children}</main>
    </div>
  )
}
