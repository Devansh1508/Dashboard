import { setActive } from "../../redux/slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/navbar.css";
import { FaTachometerAlt, FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/" },
    { icon: <FaUser />, label: "User", path: "/user" },
  ];

  const activePage = useSelector(
    (state: { nav: { active: number } }) => state.nav.active
  );
  const dispatch = useDispatch();

  return (

    <div className="max-xl:flex-row max-xl:pt-0 max-xl:h-[7vh] max-xl:w-[100vw] flex flex-col w-[15vw] h-[100vh] xl:fixed bg-secondary">
      {/* <div className="active-page"></div> */}
      <div className="text-3xl max-sm:text-[1.35rem] max-sm:p-2 max-xl:p-4 flex justify-center p-7 font-bold font-[righteous]">
      {menuItems[activePage].label}
      </div>
      <ul className="navbar-list max-sm:pr-0 max-xl:justify-center max-xl:items-end max-xl:pr-10 max-xl:flex">
        {menuItems.map((item, index) => (
          <Link to={item.path}>
            <li
              key={index}
              className={`${activePage === index ? "bg-primary" : ""} max-sm:p-2 max-sm:text-lg flex hover:cursor-pointer max-xl:pr-5 max-xl:h-[7vh] gap-2 text-[1.2rem] h-[50px] items-center pl-5 w-full`}
              onClick={() => dispatch(setActive(index))}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
