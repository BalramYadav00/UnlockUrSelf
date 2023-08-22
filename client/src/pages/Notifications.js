import { Tabs } from "antd";
import axios from "axios";
import React from "react";
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
  return (
    <Layout>
      <h1 className="text-xl text-bold m-4">Notifications</h1>
      <hr />

      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="cursor-pointer border-b border-gray-200 dark:border-gray-700">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>
              <i class="ri-check-double-line"></i>&nbsp; Mark all as seen
            </h1>
          </div>

          {user?.unseenNotifications.map((notification) => (
            <div
              className="cursor-pointer border-2 my-2 border-green-400 rounded-md p-2"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="cursor-pointer border-b border-gray-200 dark:border-gray-700">
            <h1 className="anchor" onClick={() => deleteAll()}>
            <i class="ri-delete-bin-line"></i> &nbsp;
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div
              className="cursor-pointer border-2 my-2 border-green-400 rounded-md p-2 m-2"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
