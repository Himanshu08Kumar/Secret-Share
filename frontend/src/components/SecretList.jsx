import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsIncognito } from "react-icons/bs";

const SecretList = () => {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    const fetchSecrets = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/api/secrets", {
        headers: { "x-auth-token": token },
      });
      setSecrets(data);
    };
    fetchSecrets();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Secrets</h2>
      <ul className="space-y-4">
        {secrets.map((secret, index) => (
          <div
            className="border rounded-lg shadow-md bg-slate-200 p-4 hover:bg-blue-100 transition duration-300"
            key={index}
          >
            <div className="flex items-center text-blue-600 font-semibold mb-2">
              <BsIncognito className="mr-2 text-xl" />
              Anonymous
            </div>
            <div className="text-slate-700">
              <li className="list-none text-xl mb-2 font-semibold">{secret.title}</li>
              <li className="list-none text-lg mb-2">{secret.content}</li>
              <p className="text-sm text-slate-500">{new Date(secret.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SecretList;
