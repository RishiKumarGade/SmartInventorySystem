"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


function Page() {
  const [collaborativeStorages, setCollaborativeStorages] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");


  const getAllStorages = async () => {
    try {
      await axios.get("/api/users/getallstorages").then((res) => {
        setCollaborativeStorages(res.data.collaborativeStorages);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createCollaborativeStorage = async () => {
    if (name == "") {
      toast.error("please provide a name");
      return;
    }
    try {
      axios.post("/api/users/createorganization", { name,desc }).then((res) => {
        getAllStorages();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllStorages();
  }, []);


  return (
    <div>
      <div className="flex flex-col content justify-centre mt-28 text-white">
        <div className="grid grid-cols-2 gap-8 mt-8 place-items-center">
          <div className="text-white fade-in">
            <p className="text-2xl text-[#b5daff] mb-10 bg-white/10 h-[50px] w-[600px] flex items-center justify-center rounded-2xl">
              Your Inventory
            </p>
            <div className="bg-white/10 w-[600px] h-[400px] rounded-[40px] p-4">
              <div className="w-[100px] h-[100px] bg-[#A1EBA250] rounded-xl flex items-center justify-center">

                {collaborativeStorages.length > 0 && (
                  <>
                    {collaborativeStorages.map((stor) => {
                      return (
                        <p key={stor._id}>
                          {" "}
                          <Link onClick={e=>{localStorage.setItem('desc',stor.description)}} href={`/orgs/${stor._id}`}>
                            {stor.name}{" "}
                          </Link>{" "}
                        </p>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-[100%] h-[100%] gap-9 fade-in">
            <p className="text-[40px] text-[#b5daff]">Create new inventory</p>
            <div className="flex flex-col items-center justify-center space-y-4 gap-7 bg-white/10 rounded-xl p-6 w-[65%] min-h-[50%]">
              <div className="flex justify-center items-center gap-5 text-center">
                <input
                  type="text"
                  placeholder="Inventory name"
                  className="py-2 mt-2 bg-[#1e293b] text-[#8f9eb3] text-center p-2 rounded-md w-[80%] px-6"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className=" text-center">
                <textarea
                  rows={4}
                  cols={50}
                  value={desc}
                  placeholder="Enter a brief description"
                  className="py-2 mt-2 bg-[#1e293b] text-[#8f9eb3] text-left p-2 rounded-md w-[80%] px-6"
                  onChange={e=>{setDesc(e.target.value)}}
                />

                <button
                  className="bg-[#00adf1]  text-white px-8 py-2 rmt-2 rounded-xl mt-8 hover:bg-[#37bcf8] min-w-[120px]"
                  onClick={(e) => {
                    e.preventDefault();
                    createCollaborativeStorage();
                  }}
                >
                  {" "}
                  create{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
