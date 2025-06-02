import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content px-10 py-4 items-center">
      <aside>
        <div className="my-5 pl-3">
          <Image src="/logo_fc.png" width={235} height={53} alt="FC Logo" />
        </div>

        <div className="m-3 w-xs">
          <p className="break-words whitespace-normal">
            Our goal is to develop cutting-edge digital talents,
            industry-relevant solutions, and efficient services in computing
            technology.
          </p>
        </div>
      </aside>
      <div className="align-middle">
        <p className="font-semibold text-lg mb-3">Address</p>
        <p>Faculty Of Computing</p>
        <p>
          Universiti Teknologi Malaysia <br />
          81310 UTM Johor Bahru <br />
          Johor, Malaysia
        </p>
      </div>
      <div className="content-center">
        <p className="font-semibold text-lg mb-3">Contact Us</p>
        <p>
          Academic Office (Postgraduate): <br />
          +607-5538828
        </p>
        <p>
          Academic Office (Undergraduate): <br />
          +607-5538827
        </p>
      </div>
    </footer>
  );
};

export default Footer;
