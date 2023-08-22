import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  const [tab, setTab] = useState(0);
  return (
    <Layout>
      <h1 className="text-xl text-bold m-4">Notifications</h1>
      <hr />

      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li onClick={() => {setTab(0)}} className="mr-2">
            <i className={"cursor-pointer inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}>
              Unseen
            </i>
          </li>
          <li
            onClick={() => {
              setTab(1);
            }}
            className="mr-2"
          >
            <i className="cursor-pointer inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
              Seen
            </i>
          </li>
        </ul>
      </div>
      <div className="flex justify-end space-x-1 ">
        <h1 className=" space-x-1" onClick={() => markAllAsSeen()}>
        <i  class="ri-check-double-line"></i>
          <i>Mark all as seen </i>
        </h1>
      </div>

      {tab===0 && user?.unseenNotifications.map((notification) => (
        <div
          className="card p-2 mt-2 cursor-pointer"
          onClick={() => navigate(notification.onClickPath)}
        >
          <div className="border-2 border-green-400 rounded-md p-2">{notification.message}</div>
        </div>
      ))}

      <div className="d-flex justify-content-end">
        <h1 className="anchor cursor-pointer" onClick={() => deleteAll()}>
          Delete all
        </h1>
      </div>
      {tab===1 && user?.seenNotifications.map((notification) => (
        <div
          className="card p-2 mt-2"
          onClick={() => navigate(notification.onClickPath)}
        >
          <div className="card-text">{notification.message}lola</div>
        </div>
      ))}
    </Layout>
  );
}

export default Notifications;
