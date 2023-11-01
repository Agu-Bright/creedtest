import React from "react";
import styled from "styled-components";

const NotificationGroup = ({ title, children }) => {
  return (
    <Container className="pb-0">
      <strong className="not__group__title text-sm">{title}</strong>
      {children}
    </Container>
  );
};

export default NotificationGroup;

const Container = styled.div`
  box-sizing: border-box;

  .not__group__title {
    margin-bottom: 0.5rem;
    display: block;
  }
`;
