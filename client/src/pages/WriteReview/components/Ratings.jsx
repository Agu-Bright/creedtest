import React, { useState } from "react";
import Stars from "./Stars";
import styled from "styled-components";

const Ratings = () => {
  const [gradeIndex, setGradeIndex] = useState();
  const Grades = ["Poor", "Fair", "Good", "Very good", "Excellent"];

  const activeStar = {
    fill: "goldenrod",
  };
  const changeGradeIndex = (index) => {
    setGradeIndex(index);
  };

  return (
    <Container>
      <div className="rating-container">
        {/* <h1 className="result">
          {Grades[gradeIndex] ? Grades[gradeIndex] : "You didn't review yet"}
        </h1> */}
        <div className="starz">
          {Grades.map((grade, index) => (
            <Stars
              index={index}
              key={grade}
              changeGradeIndex={changeGradeIndex}
              style={gradeIndex > index ? activeStar : {}}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Ratings;

const Container = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    padding: 16px;
    margin: 16px auto;
  }
  .result {
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    font-family: interbolder;
  }
  .starz {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: -42px;
    cursor: pointer;
  }
  // .starz {
  //   position: relative;
  //   cursor: pointer;
  // }
`;
