import React from "react";
import { useNavigate } from "react-router-dom";
import SecretForm from "../components/SecretForm";
import SecretList from "../components/SecretList";
import { IoLogOutOutline } from "react-icons/io5";
import HiddenEcho from '../assets/HiddenEcho.png'
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="w-3/4 md:w-1/2 text-center mx-auto flex flex-col my-12 bg-white shadow-lg rounded-lg p-6">
        <div className="text-end flex justify-between mb-4">
          <img src={HiddenEcho} alt="" className="w-36" />
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-sm text-gray-600 font-semibold hover:text-blue-600 hover:underline transition-all duration-300 flex items-center"
          >
            Logout <IoLogOutOutline className="ml-2 text-lg" />
          </div>
        </div>
        <SecretForm />
        <SecretList />
      </div>
    </div>
  );
};

export default Dashboard;
