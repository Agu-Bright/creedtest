import React from "react";
import styled from "styled-components";
import Service from "./Service";

const ServicesGrid = ({ services, showDeleteModal, setId }) => {
  return (
    <Container>
      {services.map((service) => (
        <Service
          key={service?._id}
          showDeleteModal={showDeleteModal}
          service={service}
          setId={setId}
        />
      ))}
    </Container>
  );
};

export default ServicesGrid;

const Container = styled.div`
  /* background-color: aliceblue; */
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }
`;
