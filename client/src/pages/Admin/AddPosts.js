import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function AddPosts(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  let {data = null , query = "Add"} = state? state: "";
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Content, setContent] = useState("");
  const dispatch = useDispatch();
  const PostHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/blog",
        {
          title: Title,
          image: Image,
          content: Content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data) {
        toast(response.data.message);
        setTitle("");
        setImage("");
        setContent("");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.put(
        "/api/admin/blog/update",
        {
          id:data._id,
          title: Title,
          image: Image,
          content: Content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data) {
        toast(response.data.message);
        navigate("/admin/blog")
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    if(query === "update"){
    setTitle(data.title);
    setImage(data.image);
    setContent(data.content);
    }
  }, []);
  return (
    <Layout>
      <div className="flex flex-col space-y-8">
        <h1 className="text-lg font-poppins font-semibold text-center mt-6">
          {query === "update" ? "Update Blog":"Add Blog" }
        </h1>
        <form className="flex flex-col space-y-8">
          <input
            required
            onChange={(e) => setTitle(e.target.value)}
            value={Title}
            className="border-2 rounded-md p-4 focus:border-teal-500 focus:outline-none"
            placeholder="Title"
          />
          <input
            required
            onChange={(e) => setImage(e.target.value)}
            value={Image}
            className="border-2 rounded-md p-4 focus:border-teal-500 focus:outline-none"
            placeholder="Image Link"
          />

          <textarea
            required
            value={Content}
            onChange={(e) => setContent(e.target.value)}
            id="message"
            rows="10"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
           border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700
           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500
           dark:focus:border-teal-500"
            placeholder="Write your Content here..."
          ></textarea>
          <button
            onClick={query === "update"? updateHandler:PostHandler}
            className=" bg-green-600 text-white rounded-lg p-2 w-24 self-center"
          >
            Post blog
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AddPosts;
