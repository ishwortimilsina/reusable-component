import { useState } from "react";
import { BiSolidStar, BiStar } from "react-icons/bi";

const TOTAL_STARS = 5;

const allUnrated = new Array(TOTAL_STARS).fill(0);

export const Rating = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [stars, setStars] = useState(allUnrated);
  const [hoveredStars, setHoveredStars] = useState(allUnrated);

  const handleMouseEnter = (idx: number) => {
    setIsHovering(true);
    const newHovStars = [...allUnrated].map((_star, i) => i <= idx ? 1 : 0);
    setHoveredStars(newHovStars);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredStars([ ...stars ]);
  };

  const handleClick = (idx: number) => {
    const newStars = [...allUnrated].map((_star, i) => i <= idx ? 1 : 0);
    setStars(newStars);
  };

  return (
    <div className="">
      This is rating widget.
      {
        (isHovering ? hoveredStars : stars).map((star, idx) => {
          if (star === 0) {
            return <BiStar
              key={idx}
              color="#ff630b"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(idx)}
              aria-label={`Rate ${idx + 1} star`}
            />
          } else {
            return <BiSolidStar
              key={idx}
              color="#ff630b"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(idx)}
              aria-label={`Rate ${idx + 1} star`}
            />
          }
        })
      }
    </div>
  )
};
