import { type ReactNode } from 'react';
import Menu from '@components/Menu';
import Footer from '@components/Footer';

export interface LayoutProps {
  menuMode?: 'light' | 'dark';
  footerMode?: 'light' | 'dark';
  children: ReactNode;
}

const Layout = ({ menuMode = 'light', footerMode = 'light', children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Menu mode={menuMode} />
      <main className="flex-1">{children}</main>
      <Footer mode={footerMode} />
    </div>
  );
};

export default Layout;
