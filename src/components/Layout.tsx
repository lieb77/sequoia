// components/Layout.tsx
import { Navbar } from '@/component/Navbar';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4 place-items-center">{children}</main>
    </div>
  )
}
