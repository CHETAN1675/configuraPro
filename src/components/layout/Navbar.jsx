import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import logo from "../../assets/logo.png";
import { SunIcon, MoonIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function AppNavbar() {
  const authToken = useSelector((state) => state.auth.authToken);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*  Dark mode state */
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  /*  Apply theme */
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        
        {/* Brand */}
        <Link to="/products" className="group flex items-center gap-3">
          <img src={logo} alt="ConfiguraPro" className="h-10 w-10 rounded-lg" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-extrabold text-transparent">
            ConfiguraPro
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["Products", "Orders", "Dashboard"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="relative flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {item}
            </Link>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Cart
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative inline-flex h-9 w-16 items-center rounded-full border border-gray-300 bg-gray-100 p-1 
                       transition-transform duration-200 active:scale-95 dark:border-gray-700 dark:bg-gray-800"
            aria-label="Toggle theme"
          >
            {/* Sliding knob */}
            <span
              className={`absolute h-7 w-7 rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-gray-900 ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            />

            {/* Sun */}
            <SunIcon className="z-10 h-4 w-4 text-yellow-500" />

            {/* Moon */}
            <MoonIcon className="z-10 ml-auto h-4 w-4 text-gray-500 dark:text-blue-400" />
          </button>

          {/* Auth */}
          {!authToken ? (
            <>
              <a
                href="https://admin-configura-pro.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Admin
              </a>

              <Link
                to="/auth"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
