import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Landon = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState('')

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
    // alert("Do you want to delete this task?");

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
        <Link
          className="px-4 py-2 bg-blue-600 rounded text-white text-[15px]"
          to={"/create"}
        >
          Add task
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="border border-blue-600 rounded-md px-5 py-3 flex flex-col justify-center items-center"
          >
            <div className="my-5">
              <h1 className="font-semibold text-gray-900 text-center">
                {d.title}{" "}
              </h1>
              <h1 className="text-gray-600 text-[16px] mt-1">{d.contents} </h1>
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
    </div>
  );
};

export default Landon;
