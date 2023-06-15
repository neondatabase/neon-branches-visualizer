import '~/styles/globals.css';
import localFont from 'next/font/local';
import Providers from '../components/providers';
import cx from 'classnames';
import { Logout } from '../components/auth/logout';
import { Icon } from '../components/shared/icon';

const MonaSans = localFont({
  src: '../../public/fonts/Mona-Sans.woff2',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cx('bg-[#080808] text-gray-1100', MonaSans.className)}
      lang="en"
    >
      <head />
      <body>
        <Providers>
          <main className="relative h-auto min-h-[75vh]">{children}</main>
          <footer className="relative my-10 text-xs">
            <div className="flex items-center justify-center space-x-5">
              <a
                className="transform rounded-md p-2 transition-colors hover:text-gray-1200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100"
                href="https://console.neon.tech"
              >
                <Icon name="Logo" />
              </a>
              <Logout />
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
