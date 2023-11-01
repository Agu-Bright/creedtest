import React from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";

import * as Tomiwa from "../../assets/data/ServiceData";
import Nav from "../../components/nav/Nav";
import { Header } from "../BrowseServices/components/Header";
import { Resources } from "../BrowseServices/components/Resources";
import { Summary } from "./components/Summary";
import { Description } from "./components/Description";
import { OtherServices } from "./components/OtherServices";
import { SimilarServices } from "./components/SimilarServices";
import Footer from "../../components/Footer/Footer";

function timeSince(date, date1 = new Date()) {
  var seconds = Math.floor((date1 - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    interval = Math.floor(interval);
    return interval + (interval <= 1 ? " year" : " years");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    interval = Math.floor(interval);
    return interval + (interval <= 1 ? " month" : " months");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    interval = Math.floor(interval);
    return interval + (interval <= 1 ? " day" : " days");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    interval = Math.floor(interval);
    return interval + (interval <= 1 ? " hour" : " hours");
  }
  interval = seconds / 60;
  if (interval > 1) {
    interval = Math.floor(interval);
    return interval + (interval <= 1 ? " minute" : " minutes");
  }
  return Math.floor(seconds) + " seconds";
}

export const Service = () => {
  const params = useParams();
  const obj = Tomiwa[params.id];

  return (
    <Container>
      <Nav />
      <Header height={10} className="service" />
      <Resources />
      <Summary
        company={obj.company}
        company_link={obj["company-link"]}
        work_location={obj["work-location"]}
        posted={timeSince(new Date(obj.posted))}
        rating={obj.rating}
        review={obj.review}
        views={obj.views}
        bookmarked={obj.bookmarked}
      />
      <Description
        position={obj.position}
        company={obj.company}
        company_link={obj["company-link"]}
        wage={obj.wage}
        price_range={obj["price-range"]}
        skills={obj.skills}
        location={obj.location}
        duration={timeSince(new Date(obj.start), new Date(obj.end))}
        description={obj.description}
      />
      <OtherServices list={obj["other"]} company={obj.company} />
      <SimilarServices />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;
