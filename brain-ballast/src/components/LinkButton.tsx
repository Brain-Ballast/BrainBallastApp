import { Link } from "react-router-dom";

const LinkButton: React.FC<{ page: string; buttonText: string }> = ({ page, buttonText }) => {
  return (
    <div className='pt-8'>
      <Link to={page}>
        <button>{buttonText}</button>
      </Link>
    </div>
  );
};

export default LinkButton;