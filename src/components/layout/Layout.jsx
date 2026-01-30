import Footer from "./Footer";
import AppNavbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <AppNavbar />

      <main className="flex-1 px-4 py-6 text-gray-800 dark:text-gray-100">
        {children}
      </main>

      <Footer />
    </div>
  );
}
