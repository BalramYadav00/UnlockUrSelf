import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Doctor from "../components/Doctor";
import { useSelector } from "react-redux";
function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/user/get-appointments-by-user-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getData();
    getAppointmentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const t_appointment = appointments.length;
  console.log(appointments);
  const cards = [
    {
      name: "Session Taken",
      href: "#",
      icon: "ri-add-box-line",
      amount: appointments ? t_appointment : 0,
    },
    {
      name: "Most Recent Therapist",
      href: "#",
      icon: "ri-psychotherapy-line",
      // amount: appointments
      //   ? appointments[t_appointment - 1].doctorInfo.firstName +
      //     " " +
      //     appointments[t_appointment - 1].doctorInfo.lastName
      //   : "None",
      // amount: appointments ? appointments[t_appointment-1].doctorInfo.firstName + " " + appointments[t_appointment].doctorInfo.lastName: "None",
    },
  ];
  console.log(doctors)
  return (
    <Layout>
      {" "}
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-0">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {cards.map((card) => (
              <div
                key={card.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-3xl">
                      <i
                        class={`${card.icon} text-green-400`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {card.amount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" mt-8 max-w-6xl mx-auto px-0 sm:px-6 lg:px-0">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Doctors</h2>
        {doctors.length > 0 ? (
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {doctors.map((doctor) => (
              <Doctor doctor={doctor} />
            ))}
          </div>
        ) : (
          "Doctors are not availabe at the moment"
        )}
      </div>
    </Layout>
  );
}

export default Home;
