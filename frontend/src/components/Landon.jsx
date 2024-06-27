import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Landon = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    await fetch("http://localhost:3000/api/tasks")
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setData(d);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        if (d.message === "task deleted") {
          window.location.reload();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="mx-20">
      <div className="m-5">
        <h1 className="font-semibold text-center text-2xl">
          Welcome to our task management app
        </h1>
        {data.length === 0 ? (
          ""
        ) : (
          <Link
            className="px-4 py-2 bg-blue-600 rounded text-white text-[15px] my-7"
            to={"/create"}
          >
            Add task
          </Link>
        )}
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">
            No tasks available
          </h2>
          <p className="text-lg text-gray-500 mb-10">
            Add a task to get started!
          </p>
          <Link
            className="px-6 py-3 bg-blue-600 rounded text-white text-[15px]"
            to={"/create"}
          >
            Add Task
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d, i) => (
            <div
              key={i}
              className="border border-blue-600 rounded-md px-5 py-3 flex flex-col justify-center items-center"
            >
              <div className="my-5">
                <h1 className="font-semibold text-gray-900 text-center">
                  {d.title}{" "}
                </h1>
                <h1 className="text-gray-600 text-[16px] mt-1">
                  {d.contents}{" "}
                </h1>
              </div>

              <div>
                <Link
                  className="px-2 mx-2 py-2 bg-yellow-500 rounded text-[14px]"
                  to={`/edit/${d._id}`}
                >
                  Edit task
                </Link>

                <button
                  className="px-2 py-2 bg-red-600 rounded text-white text-[14px]"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Landon;
