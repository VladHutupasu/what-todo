import { ContextWrapperProvider } from '@context/ContextWrapper';
import Header from '@core/Header';
import MobileNavbar from '@core/MobileNavbar';
import { appleTouchStartupImages } from '@shared/constants/splashScreenConfig';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'What Todo',
  description: 'App that handles your todos',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dracula';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />

        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#282a36" />

        {appleTouchStartupImages.map((image, index) => (
          <link key={index} rel="apple-touch-startup-image" href={image.href} media={image.media} />
        ))}
      </head>

      {/* TODO: See if touch-pan-y is needed */}
      <body className="font-mono touch-pan-y">
        <ContextWrapperProvider>
          <Header />
          <div className="flex min-h-svh flex-col px-4 md:px-0 md:w-4/5 m-auto">{children}</div>
          {/* Loads only if PWA && small screen mobile */}
          <MobileNavbar />
        </ContextWrapperProvider>
      </body>
    </html>
  );
}
