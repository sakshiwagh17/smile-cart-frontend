import { useState, useEffect, useRef } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.interval = setInterval(handleNext, 3000);

    return () => clearInterval(timerRef.interval);
  });

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);
    resetTimer();
  };

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
      <div className="flex items-center gap-4">
        <Button
          aria-label="Previous image"
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={`${title || "Carousel image"} ${currentIndex + 1}`}
          className="h-56 w-56 rounded-lg object-cover"
          src={imageUrls[currentIndex]}
        />
        <Button
          aria-label="Next image"
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            resetTimer();
          }}
        />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {imageUrls.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
