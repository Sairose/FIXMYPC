import { useNavigate } from 'react-router-dom';

const TechnicianCard = ({ tech, onBook }) => {
  const navigate = useNavigate();

  const handleViewReview = () => {
    navigate(`/user/${tech._id}/reviews`);
  };

  return (
    <div className="w-full border rounded p-4 shadow-md flex flex-col items-start gap-2 bg-white md:w-fit">
      
      {/* Profile Image at Top */}
      {tech.image && (
        <img
          src={tech.image}
          alt={`${tech.firstName} ${tech.lastName}`}
          className="w-28 h-28 object-cover rounded-full border mx-auto mb-2"
        />
      )}

      <h3 className="font-bold text-lg">{tech.firstName} {tech.lastName}</h3>
      <p className="text-gray-600">{tech.email}</p>

      {/* Average Rating */}
      {tech.averageRating !== undefined && (
        <div className="flex items-center gap-1 text-yellow-500">
          {'★'.repeat(Math.floor(tech.averageRating))}
          {'☆'.repeat(5 - Math.floor(tech.averageRating))}
          <span className="text-black ml-2 text-sm">
            ({tech.averageRating.toFixed(1)})
          </span>
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onBook(tech._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Book
        </button>
        <button
          onClick={handleViewReview}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          View Review
        </button>
      </div>
    </div>
  );
};

export default TechnicianCard;
