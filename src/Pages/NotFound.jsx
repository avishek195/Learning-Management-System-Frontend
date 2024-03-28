import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2234]">
      <h1 className="text-9xl font-extralight text-white tracking-widest">
        404
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Page not found...
      </div>
      <button className="mt-5">
        <a href="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring"></a>

        <span
          onClick={() => navigate(-1)}
          className="relative block px-8 py-3 bg-[#1A2238] border border-current"
        >
          Go Back
        </span>
      </button>
    </div>
  );
};

export default NotFound;
