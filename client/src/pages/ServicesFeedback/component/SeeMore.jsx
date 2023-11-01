import React, { useState } from "react";

const SeeMore = ({ content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      <>
        {showFullContent ? content : content.slice(0, 200)}
        {content.length > 200 && !showFullContent && "..."}
      </>
      {content.length > 200 && (
        <button
          onClick={toggleContent}
          style={{ border: "none", color: "goldenrod" }}
        >
          {showFullContent ? "See Less" : "See More"}
        </button>
      )}
    </>
  );
};

export default SeeMore;
