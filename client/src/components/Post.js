import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-toastify";
import Landingnav from "./Landingnav";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Post() {
  const [AllPosts, setAllPosts] = useState();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const getPosts = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin//blog/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data) {
        toast.success(resposne.data.message);
        setAllPosts(resposne.data.posts);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const [Search, setSearch] = useState("");
  const [Show, setShow] = useState(false);
  const [modalData, setmodalData] = useState(null);
  const modalHandler = (data) => {
    setShow(true);
    setmodalData(data);
  };
  const [showNav, setshowNav] = useState(true);
  const { pathname } = useLocation();
  const Newsletter = () => {
    // ...
    // ...
    if (pathname === "/admin/blog") {
      setshowNav(false);
    } else {
      setshowNav(true);
    }
  };
  useEffect(() => {
    Newsletter();
  }, []);

  const user = useSelector((state) =>
    state.user.user ? state.user.user.isAdmin : false
  );

  const deleteHandler = async (id) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.delete(`/api/admin/blog/${id}`, {
        headers: {
          Authorization: `UnlockUrSelf ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data) {
        toast.success(resposne.data.message);
        getPosts();
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.log(error)
    }
  };

  return (
    <div>
      {showNav && <Landingnav />}

      <form className="pt-4 flex flex-col justify-center items-center">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            placeholder="Search ...Articles"
            required
          />
        </div>
      </form>

      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Blog
            </h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div class="grid gap-8 lg:grid-cols-2">
            {AllPosts &&
              AllPosts.filter((post) => {
                if (Search === "") {
                  return post;
                } else if (
                  post.title.toLowerCase().includes(Search.toLowerCase())
                ) {
                  return post;
                }
              }).map((data) => (
                <article key={data._id} class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div class="flex justify-between items-center mb-5 text-gray-500">
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg
                        class="mr-1 w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                          clip-rule="evenodd"
                        ></path>
                        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                      </svg>
                      Article
                    </span>
                  </div>
                  <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{data.title}</a>
                  </h2>
                  <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                    {data.content.substring(0, 200) + "..."}
                  </p>
                  <div class="flex justify-between items-center">
                    <button
                      onClick={() => modalHandler(data, true)}
                      class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Read more
                      <svg
                        class="ml-2 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    {user && (
                      <div className="float-right">
                        <button
                          onClick={() => deleteHandler(data._id)}
                          className=" float-right bg-red-500 mx-2 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            navigation("/add_blog", {
                              state: { data: data, query: "update" },
                            })
                          }
                          className=" float-right bg-green-500 mx-2 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {Show && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          class="fixed flex backdrop-blur-sm justify-center items-center bg-transparent w-full  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div class="relative w-full h-full max-w-2xl md:h-auto">
            <div class="relative  bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalData.title}
                </h3>
                <button
                  onClick={() => {
                    setShow(false);
                    setmodalData(null);
                  }}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              {modalData.image && (
                <img
                  className=" min-w-full max-h-56"
                  src={modalData.image}
                  alt="Psychology"
                />
              )}
              <div class="p-6 space-y-6 max-h-96 overflow-auto">
                <p class="text-base max-h-96 text-justify leading-relaxed text-gray-500 dark:text-gray-400">
                  {modalData.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
