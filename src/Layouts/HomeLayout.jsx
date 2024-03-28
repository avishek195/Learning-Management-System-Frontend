import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
const HomeLayout = ({ children }) => {
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0px";
    // changeWidth();
  };

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-5 top-5 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button>
                <AiFillCloseCircle onClick={hideDrawer} size={24} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contect">Contect Us</Link>
            </li>
            <li>
              <Link to="/about">About Us Quick</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
