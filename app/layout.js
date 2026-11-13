import './globals.css';

export const metadata = {
  title: "PULSE '27 — VIT Mauritius Annual Fest",
  description: 'Three days. One island. Zero sleep. Tech, culture and music at VIT Mauritius, 10–12 December 2027.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
