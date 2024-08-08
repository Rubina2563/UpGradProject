//corrected
import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../Static/data';

const Navbar = ({ active }) => {
  return (
    <div className={` md:flex sm:grid sm:grid-cols-2 row-auto items-center justify-center`}>
      {navItems && navItems.map((i, index) => (
        <div key={index} className="flex">
          <Link
            to={i.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-white"
            } font-[900] my-3 cursor-pointer px-6 hover:text-[#17dd1f]`}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
