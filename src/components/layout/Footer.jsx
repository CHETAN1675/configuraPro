import buyitlogo from "../../assets/buyitLogo.png";
import {
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-auto bg-gradient-to-r from-gray-900 via-gray-950 to-black text-gray-300">

      {/* Top Accent Line */}
      <div className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Main Grid */}
        <div className="grid gap-8 sm:grid-cols-3">

          {/* Left: Brand */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">
              ConfiguraPro
            </p>
            <p className="text-sm text-gray-400">
              Build & customize products with precision.
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Center: Navigation */}
          <div>
            <p className="mb-3 text-sm font-semibold text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Dashboard", to: "/dashboard" },
                { label: "Products", to: "/products" },
                { label: "Orders", to: "/orders" },
              ].map((nav) => (
                <li key={nav.label}>
                  <Link
                    to={nav.to}
                    className="text-gray-400 transition hover:text-white"
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social + Partner */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-white">
              Connect with us
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaGithub, href: "#" },
                { icon: FaLinkedin, href: "#" },
                { icon: FaTwitter, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-700 p-2 text-gray-400
                             transition hover:border-gray-500 hover:text-white
                             hover:bg-gray-800"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Partner */}
            <a
              href="https://buyitshopee.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span className="text-xs text-gray-400">
                Partnered with
              </span>
              <img
                src={buyitlogo}
                alt="Buy It Shopee"
                className="h-8 object-contain"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-4 text-xs text-gray-500">
          <span>
            Made with <span className="text-red-500">❤️</span> using React & Tailwind
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 rounded-full border border-gray-700 px-3 py-1
                       transition hover:border-gray-500 hover:text-white"
          >
            <ArrowUpIcon className="h-4 w-4" />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
