import { type ReactNode } from 'react';
import Menu from '@components/Menu';
import Footer from '@components/Footer';

export interface LayoutProps {
  menuMode?: 'light' | 'dark';
  footerMode?: 'light' | 'dark';
  footerBgColor?: string;
  children: ReactNode;
}

const Layout = ({ menuMode, footerMode, footerBgColor, children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Menu mode={menuMode} />
      <main className="flex-1">{children}</main>
      <Footer mode={footerMode} bgColor={footerBgColor} />
    </div>
  );
};

export default Layout;
