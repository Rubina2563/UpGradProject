//corrected
import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../Static/data';

const Navbar = ({ active }) => {
  return (
    <div className={`block md:flex sm:flex-wrap items-center justify-center`}>
      {navItems && navItems.map((i, index) => (
        <div key={index} className="flex">
          <Link
            to={i.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
            } font-[900] cursor-pointer px-6 hover:text-[#17dd1f]`}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
