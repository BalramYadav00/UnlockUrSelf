import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.png";
import logo2 from "../images/logo2.png";
import { setUser } from "../redux/userSlice";
import { toast } from "react-toastify";
function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "ri-user-line",
    // },
    {
      name: "Post Blog",
      path: "/admin/blog",
      icon: "ri-article-line",
    },
    {
      name: "Add Blog",
      path: "/add_blog",
      icon: "ri-article-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const logoutHandler = async () => {
    localStorage.removeItem("token");
    await dispatch(setUser(null));
    navigate("/landing");
    toast.success("Logged out");
  };
  return (
    <div className=" h-screen font-poppins">
      {/* nav bar */}
      <div class="flex flex-row h-full">
        <aside
          id="default-sidebar"
          class=" top-0 left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <motion.div
            animate={{
              width: !collapsed ? 250 : 100,
            }}
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            className="bg-green-600 h-screen space-y-1.5 m-2 rounded-md shadow-lg >"
          >
            {!collapsed && (
              <motion.img
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={logo}
                alt="logo"
              />
            )}
            {collapsed && (
              <motion.img
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={logo2}
                alt="logo"
              />
            )}
            <h1 className="text-gray-50 text-center">{role}</h1>
            <div className="p-6 space-y-2">
              {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    className={`text-gray-50 text-center py-2 border-2 align-middle rounded-lg text-top hover:border-emerald-500 hover:bg-gray-100 hover:text-emerald-500 bg-green-500 p-4 drop-shadow-xl d-flex menu-item ${
                      isActive && "bg-green-400"
                    }`}
                  >
                    <Link
                      className="hover:text-green-400 align-middle"
                      to={menu.path}
                    >
                      <i color="white" className={menu.icon}></i>
                      {!collapsed && (
                        <motion.i className="px-2">{menu.name}</motion.i>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <div
                className={` px-4 py-2 border-2 text-center rounded-lg  drop-shadow-xl d-flex menu-item hover:border-emerald-500 hover:bg-gray-100 hover:text-emerald-500 bg-green-500 p-4 text-white `}
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <Link
                  className=" align-middle hover:text-green-400"
                  onClick={logoutHandler}
                >
                  <i className="ri-logout-circle-line"></i>
                  {!collapsed && <i className="pl-1">Logout</i>}
                </Link>
              </div>
            </div>
          </motion.div>
        </aside>
        <div className="border-gray-200 pl-4 m-2 shadow-lg flex flex-col w-full rounded-md">
          <div className=" max-h-16 items-center flex md:flex md:flex-grow flex-row justify-end space-x-1 rounded-md  shadow-lg mr-4">
            <div className="space-x-6 m-4 flex text-center">
              <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                class="inline-flex absolute left-5 items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <button onClick={() => navigate("/notifications")}>
                <i class="ri-notification-line text-green-400 text-2xl"></i>
                <span className="absolute text-green-400">
                  {user?.unseenNotifications.length}
                </span>
              </button>
              <Link className="anchor mx-2 p-2" to="/profile">
                {user?.name}
              </Link>
              {/* <i className="mx-6">{user? user.name:null}</i>  */}
            </div>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
