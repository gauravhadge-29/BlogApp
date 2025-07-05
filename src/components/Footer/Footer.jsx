import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-white border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" className="ml-3 text-2xl font-bold text-gray-800 tracking-wide"/>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Blogger. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-400">Company</h3>
              <ul>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Features</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Pricing</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Affiliate Program</Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Press Kit</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-400">Support</h3>
              <ul>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Account</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Help</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Contact Us</Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Customer Support</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-400">Legals</h3>
              <ul>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Terms &amp; Conditions</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-700 hover:text-blue-600 transition" to="/">Licensing</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer