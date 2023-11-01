import React from "react";
import styled from "styled-components";
import { device } from "../../../theme/mediaQueries";

const Star = (props) => {
  const changeGrade = (e) => {
    props.changeGradeIndex(e.target.value);
  };

  return (
    <Container>
      <label className="star">
        <input
          type="radio"
          name="rating"
          id={props.grade}
          value={props.index}
          className="stars-radio-input"
          onClick={changeGrade}
        />
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#393939"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={props.style}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </label>
    </Container>
  );
};

export default Star;

const Container = styled.div`
  .stars-radio-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }
  label {
    width: 50%;
    svg {
      height: 40px;
      @media ${device.mob} {
        height: 20px;
      }
    }
  }
  // .stars-radio-input:checked ~ svg {
  //   fill: goldenrod;
  // }
`;
