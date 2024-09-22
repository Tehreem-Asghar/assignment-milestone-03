import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

interface StarsProps {
  stars: number;
  reviews: number;
}

const Stars: React.FC<StarsProps> = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (e, ind) => {
    const number = ind + 0.5;
    return (
      <span key={ind}>
        {stars >= ind + 1 ? (
          <FaStar className="text-amber-400" />
        ) : stars > number ? (
          <FaStarHalfAlt className="text-amber-400" />
        ) : (
          <AiOutlineStar className="text-amber-400" />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center space-x-2">
      
      <div className="flex space-x-1">{ratingStar}</div>
  
      <p className="ml-2 text-sm">({reviews} reviews)</p>
    </div>
  );
};

export default Stars;
