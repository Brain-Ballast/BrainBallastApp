import { Link } from "react-router-dom";

const LinkButton: React.FC<{ page: string; buttonText: string }> = ({
  page,
  buttonText,
}) => {
  return (
    <div className="pt-8">
      <Link to={page}>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
          {buttonText}
        </button>

      </Link>
    </div>
  );
};

export default LinkButton;
