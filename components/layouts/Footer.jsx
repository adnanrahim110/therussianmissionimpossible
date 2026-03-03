import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 lg:py-24 border-t-4 border-crimson-600">
      <div className="container-default grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 lg:col-span-1">
          <h3 className="font-heading text-xl text-stone-50 mb-4">
            Operation Stream 3.0
          </h3>
          <p className="text-sm leading-relaxed mb-6">
            A documentary war prose account of the Russian Mission Impossible.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-stone-50 font-semibold mb-4 tracking-wide text-sm uppercase">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-stone-50 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                className="hover:text-stone-50 transition-colors"
              >
                The Book
              </Link>
            </li>
            <li>
              <Link
                href="/authors"
                className="hover:text-stone-50 transition-colors"
              >
                Authors
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact/Social */}
        <div>
          <h4 className="text-stone-50 font-semibold mb-4 tracking-wide text-sm uppercase">
            Connect
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/contact"
                className="hover:text-stone-50 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-stone-50 transition-colors">
                Publisher Info
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="text-sm">
          <p className="mb-2">
            © {new Date().getFullYear()} CGG International W.L.L.
          </p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
