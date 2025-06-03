import Image from "next/image";
import logo from "../../../../public/asset/images/logo_founder-removebg-preview-removebg-preview.png";
import { Button } from "../ui/Button";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-main-color relative  pl-8 pr-8 pt-8">
        {/* Adjusted Absolute Div */}
        <div
          className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-[150px] h-[100px] bg-btn-color blur-[100px] z-0 "
        ></div>

        <div className=" flex flex-col gap-10 text-center lg:text-left  justify-center  z-10">
          <div className="collection ">
            <div className="flex flex-col lg:flex-row  justify-between">
              <div className="form">
                <div className="mb-5">
                  <Image src={logo } width={200} alt="logo" />
                </div>
                <div className="bg-card-color p-6 rounded-[10px] shadow-lg max-w-[393px] text-left">
                  <h2 className="text-paragraph-color text-[24px] font-semibold mb-4">
                    Subscribe to our newsletter
                  </h2>
                  <form>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 mb-4 text-gray-300 bg-transparent border border-gray-600 rounded-[50px] outline-none"
                    />
                    <Button type="button" theme="primary">Subscribe</Button>
                  </form>
                </div>
              </div>

              <div>
                <h3 className="text-paragraph-color font-semibold mt-12 mb-12">
                  Pages
                </h3>
                <ul className="text-paragraph-color space-y-5">
                  <li>Home</li> 
                  <li>About</li>
                  <li>Contact</li>
                  <li>Blog</li>
                  <li>Pricing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-paragraph-color font-semibold mt-12 mb-12">
                  Features
                </h3>
                <ul className="text-paragraph-color space-y-8">
                  <li>Careers</li>
                  <li>Request Link Demo</li>
                  <li>Login</li>
                  <li>Sign Up</li>
                </ul>
              </div>

              <div>
                <h3 className="text-paragraph-color font-semibold mt-12 mb-12">
                  Utility Pages
                </h3>
                <ul className="text-paragraph-color space-y-5">
                  <li>Style Guide</li>
                  <li>Password Protected</li>
                  <li>404 Not Found</li>
                  <li>Licenses</li>
                  <li>Changelog</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-4 items-center gap-4 border-t border-gray-700 pt-6">
              <p className="text-paragraph-color text-sm">
                Copyright © Product | Designed by Webocean LTD - Powered by
                Webflow
              </p>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="text-paragraph-color hover:text-paragraph-color"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  href="/"
                  className="text-paragraph-color hover:text-paragraph-color"
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  href="/"
                  className="text-paragraph-color hover:text-paragraph-color"
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link
                  href="/"
                  className="text-paragraph-color hover:text-paragraph-color"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;