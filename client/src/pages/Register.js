// import { Button, Form, Input } from "antd";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import logo from "../images/logo.png"
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const onFinish = async (e) => {
    e.preventDefault();
    const user = {
      name: Name,
      email: Email,
      password: Password,
    };
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", user);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-full flex">
    <div className="flex-1 flex flex-col max-h-screen py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96 lg:mt-20 ">
        <div>
          <img className="h-12 w-auto" src={logo} alt="UnlockUrSelf" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <form action="#" onSubmit={onFinish} className="space-y-6">
            <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account ?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="hidden lg:block relative w-0 flex-1">
      <img
        className="absolute inset-0 max-h-screen w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
    // <div className="authentication">
    //   <div className="authentication-form card p-3">
    //     <h1 className="card-title">Nice To Meet U</h1>
    //     <Form layout="vertical" onFinish={onFinish}>
    //       <Form.Item label="Name" name="name">
    //         <Input placeholder="Name" />
    //       </Form.Item>
    //       <Form.Item label="Email" name="email">
    //         <Input placeholder="Email" />
    //       </Form.Item>
    //       <Form.Item label="Password" name="password">
    //         <Input placeholder="Password" type="password" />
    //       </Form.Item>

    //       <Button
    //         className="primary-button my-2 full-width-button"
    //         htmlType="submit"
    //       >
    //         REGISTER
    //       </Button>

    //       <Link to="/login" className="anchor mt-2">
    //         CLICK HERE TO LOGIN
    //       </Link>
    //     </Form>
    //   </div>
    // </div>
  );
}

export default Register;
