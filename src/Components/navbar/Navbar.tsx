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
    <div className="navbar bg-secondary">
      <div className="active-page">{menuItems[activePage].label}</div>
      <ul className="navbar-list">
        {menuItems.map((item, index) => (
          <Link to={item.path}>
            <li
              key={index}
              className={`${activePage === index ? "bg-primary" : ""} page` }
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
