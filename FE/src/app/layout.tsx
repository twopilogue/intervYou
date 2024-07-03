import "../styles/globals.css";
import { Header } from "./_components/header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="h-svh w-svw">
        <Header />
        {children}
      </body>
    </html>
  );
}
