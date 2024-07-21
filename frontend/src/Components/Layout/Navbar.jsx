
import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../Static/data';

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:flex 800px:items-center`}>
      {navItems && navItems.map((i, index) => (
        <div key={index} className="flex">
          <Link
            to={i.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"
            } font-[500] cursor-pointer pb-[30px] 800px:pb-0 px-6`}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
