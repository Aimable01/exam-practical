import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      await fetch(`http://localhost:3000/api/tasks/${id}`)
        .then((res) => res.json())
        .then((d) => {
          setTitle(d.title);
          setContents(d.contents);
        })
        .catch((e) => console.log(e));
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, contents };
    console.log(data);

    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="border border-blue-600 rounded-md px-5 py-10 w-[400px]">
        <h1 className="text-center text-lg font-semibold">Edit task form</h1>
        <form action="" className="m-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <input
              className="px-4 py-2 focus:outline-none border border-blue-600 rounded-md text-[14px]"
              type="text"
              name="title"
              required
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Content</label>
            <textarea
              className="px-4 py-2 focus:outline-none border border-blue-600 rounded-md text-[14px]"
              type="text"
              placeholder="Task content"
              required
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded text-white text-[15px]"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
