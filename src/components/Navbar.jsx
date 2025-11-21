import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-6 fixed top-0 z-20 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom w-full flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="gradient-text text-[20px] font-bold cursor-pointer flex tracking-wide">
            Nishanth A.
          </div>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`
              ${
                active === nav.title ? "text-white" : "text-[var(--text-secondary)]"
              } hover:text-white text-[15px] font-medium cursor-pointer tracking-wide transition-all duration-300 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`
            ${!toggle ? "hidden" : "flex"} p-6 backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-2xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[15px] tracking-wide ${
                    active === nav.title ? "text-white" : "text-[var(--text-secondary)]"
                  } hover:text-white transition-colors duration-300`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;