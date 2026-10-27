import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <Link
      to="/tasks"
      className="group flex items-center gap-3 text-[#292929] hover:text-[#803db8]"
    >
      <FaChevronLeft
        className="text-lg transition-transform group-hover:-translate-x-1"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
    </Link>
  );
};

export default PageHeader;
