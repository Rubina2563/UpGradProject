import React, { useState } from "react";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";
import ProfileSideBar from "../Components/Profile/ProfileSidebar";
import ProfileContent from "../Components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`w-11/12 mx-auto my-5 flex bg-[#fde7e7] py-10`}>
            <div className="w-[70px] sticky  mt-[6%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;