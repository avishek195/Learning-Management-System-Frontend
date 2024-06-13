import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state?.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);
  useEffect(() => {
    // if (!state) navigate("/course");
    (async () => {
      await dispatch(getCourseLectures(courseDetails._id));
    })();
  }, []);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseDetails._id));
  }
  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        <div className="flex justify-center gap-10 w-full">
          {/* left swction for play videos and displaing course details to admin */}
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              src={state && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              controls
              muted
            ></video>
            <div className="h1">
              <h1>
                <span className="text-yellow-500">Title: </span>
                {lectures && lectures[currentVideo]?.title}
              </h1>
              <p>
                <span className="text-yellow-500">Description: </span>
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>
          {/* Right section */}
          <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
              <p>Lectures list</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/courses/addlectures", { state: { ...state } })
                  }
                  className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add new lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((lecture, idx) => {
                return (
                  <li className="space-y-2" key={lecture._id}>
                    <p
                      className="cursor-pointer"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span> Lecture {idx + 1}: </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          onLectureDelete(courseDetails?._id, lecture?._id)
                        }
                        className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                      >
                        Delete lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
