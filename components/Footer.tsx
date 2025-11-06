import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-16 mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-orange-400/10 to-yellow-400/10 blur-3xl opacity-50 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 z-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
            NextShop
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Discover top products, curated with love and crafted for quality.
            Shop confidently — your style, our passion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Shop", "About", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            {["Help Center", "Returns", "Shipping Info", "Terms & Privacy"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-pink-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
            Stay Updated
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Join our newsletter to receive exclusive deals and new arrivals.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-gray-900 px-4 py-2 rounded-r-lg font-semibold hover:brightness-110 transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom line */}
      <div className="relative text-center text-xs text-gray-500 mt-12 border-t border-gray-700 pt-6 z-10">
        © {new Date().getFullYear()}{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent font-semibold">
          NextShop
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
