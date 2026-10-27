import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Group 2.png";
import profile from "../assets/Group 6.png";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition sm:text-base ${
    isActive
      ? "bg-purple-100 text-[#803db8]"
      : "text-[#292929] hover:bg-[#f0edf2]"
  }`;

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-[#e5e1e8] bg-[#faf9f8]/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link to="/" aria-label="TaskDuty home" className="shrink-0">
          <img src={logo} alt="TaskDuty" className="w-28 sm:w-32" />
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <NavLink to="/tasks" className={linkClass}>
            My tasks
          </NavLink>
          <NavLink to="/new" className={linkClass}>
            New task
          </NavLink>
          <img
            src={profile}
            alt=""
            aria-hidden="true"
            className="ml-1 hidden h-9 w-9 sm:block"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
