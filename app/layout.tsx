import './globals.css';

import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from '@/components/icons';
// import { User } from './user';
import { NavItem } from './nav-item';
import { IoMailOutline } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";

export const metadata = {
  title: 'PitchX | Admin',
  description:
    '- Dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  {/* <Logo /> */}
                  <span className="text-black font-bold text-3xl pl-12">Pitch<span className='text-blue-500'>X</span></span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/">
                    <UsersIcon className="h-4 w-4" />
                    Review Page Users
                  </NavItem>
                  <NavItem href="/earlyAccess">
                    <IoMailOutline className='h-4 w-4' />
                    Early Access User Mails
                  </NavItem>
                  <NavItem href="/manageUsers">
                    <UsersIcon className="h-4 w-4" />
                    Manage Users
                  </NavItem>
                  {/* <NavItem href="/investor">
                  <CgFileDocument className='h-4 w-4'/>
                    Investor's pitch decks
                  </NavItem> */}
                  {/* <NavItem href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">
                    <VercelLogo className="h-4 w-4" />
                    Deploy
                  </NavItem> */}
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold lg:hidden"
                href="/"
              >
                {/* <Logo /> */}
                <span className="">Pitch<span className='text-blue-500'>X</span></span>
              </Link>
              {/* <User /> */}
            </header>
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
