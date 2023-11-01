import React from "react";
import styled from "styled-components";
import { device } from "../../../theme/mediaQueries";
import David from "../../../assets/manage-services-img/david.png";
import Kemi from "../../../assets/manage-services-img/kemi.png";
import Musa from "../../../assets/manage-services-img/musa.png";
import FeedbackReview from "./FeedbackReview";

function convertToHumanReadableDate(dateString) {
  const date = new Date(dateString);
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleString("en-US", options);
}
export default function FeedbackContentBody({ reviews, setreviews }) {
  return (
    <Container>
      {/* <div className="feedback-content-body"> */}
      {reviews.map((review) => (
        <FeedbackReview
          id={review._id}
          key={review._id}
          img={review.createdBy?.photo?.url}
          imgId={review.createdBy?.photo?.public_id}
          customer={review.createdBy.name}
          customeremail={review.createdBy.email}
          review={review.rating}
          // summary="Additional Summary"
          additionalsummary={review.text}
          createdAt={convertToHumanReadableDate(review.createdAt)}
          reply={review.replies.reverse()}
          setreviews={setreviews}
        />
      ))}

      {/* <FeedbackReview
          img={Kemi}
          customer="Kemi Tibia"
          customeremail="kemitiba@mail.com"
          review="🙁 Poor"
        />
        <FeedbackReview
          img={Musa}
          customer="Musa Mumusa"
          customeremail="chi.mu@mail.com"
          review="😊 Good"
          summary="Additional Summary"
          additionalsummary="Te asessment really test te level of my skills, I cant elp but be amazed at te way I was assessed.. I now know te level I am at currently and te la in my skills Ive also learnt areas I need to improve on. "
        />
        <FeedbackReview
          img={David}
          customer="Jackson Ben"
          customeremail="benju@mail.com"
          review="😡 Terrible"
          summary="Additional Summary"
          additionalsummary="Te asessment really test te level of my skills, I cant elp but be amazed at te way I was assessed "
        />
        <FeedbackReview
          img={Musa}
          customer="Betty Owen"
          customeremail="owenb@mail.com"
          review="🙂 Average"
          summary="Additional Summary"
          additionalsummary="Really test te level of my skills, I cant elp but be amazed at te way I was assessed.. I now know te level I am at currently and te la in my skills Ive also learnt areas I need to improve on. "
        /> */}
      {/* </div> */}
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  .feedback-content-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 100%;
    height: auto;

    @media ${device.tablet} {
      padding: 0;
    }
  }
`;
