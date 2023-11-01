import React from "react"
import styled from "styled-components"

import CallIcon from '@mui/icons-material/Call';
import { Carousel } from "./Carousel";

export const Description = (props) => {
  // status={obj["work-time"]}
  return (
    <Container status={"full-time"}>
      <li>
        <ul className="description-stats">
          <li className="title">
            <p>{props.position}</p>
            <a href={props.company_link} target="_blank" rel="noopener noreferrer">{props.company}</a>
          </li>
          <li className="benefits">
            <p>₦&nbsp;{new Intl.NumberFormat().format(props.wage)}</p>
          </li>
        </ul>
      </li>
      <li>
        <Carousel 
          list={["carouselImg1.png", "carouselImg2.png", "carouselImg3.png"]}
        />
      </li>
      <li>
        <ul className="description">
          <li className="name"><p>{props.company}</p></li>
          <li className="service"><p>{props.company}</p></li>
          <li className="price-range"><p>₦&nbsp;{new Intl.NumberFormat().format(props.price_range[0])} - ₦&nbsp;{new Intl.NumberFormat().format(props.price_range[1])}</p></li>
          <li className="location"><p>{props.location}</p></li>
          <li className="skills"><p>{props.skills.join(",")}</p></li>
          <li className="duration"><p>{props.duration}</p></li>
          <li className="description"><p>{props.description}</p></li>
        </ul>
      </li>
      <li className="contact">
        <button><CallIcon /> Contact</button>
      </li>
    </Container>
  )
}

const Container = styled.ul`
  list-style: none;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  justify-content: center;
  margin: 0 auto;
  *{
    margin: 0;
    padding: 0;
  }
  ul{
    list-style: none;
  }
  .description-stats{
    display: flex;
    flex-direction: row;
    padding: 1.5em 0;
    .title{
      font-weight: bold;
      min-width: 50%;
      font-size: 1.5em;
      p{
        padding-bottom: 0.3em;
      }
      a{
        text-decoration: underline;
        color: inherit;
      }
    }
    .benefits{
      ::before{
        content: "${props => props.status}";
        display: block;
        text-transform: capitalize;
        font-weight: normal;
        font-size: 1em;
        padding-bottom: 0.3em;
      }
      p{
        font-weight: bold;
        font-size: 1.28em;
      }
    }
  }
  li > .description{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2.5em 0;
    gap: 1.5em;
    li{
      ::before{
        color: #263238E5;
        display: block;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.9em;
        padding-bottom: 0.4em;
      }
      p{
        font-size: 1.05em;
        letter-spacing: 0.1ch;
        word-spacing: 0.2ch;
        line-height: 1.4em;
        word-break: break-word;
      }
    }
    .name::before{
      content: "name";
    }
    .service::before{
      content: "service";
    }
    .price-range::before{
      content: "price range";
    }
    .location::before{
      content: "location";
    }
    .skills::before{
      content: "skills";
    }
    .duration::before{
      content: "duration";
    }
    .description::before{
      content: "description";
    }
    .description{
      grid-column: 1 / 3;
    }
  }
  .contact{
    button{
      align-items: center;
      background-color: transparent;
      border: 1px solid #6CDC2D;
      border-radius: 0.5em;
      color: #4CB014;
      display: flex;
      flex-direction: row;
      font-size: 1em;
      outline: 0;
      padding: 1em 2em;
      font-weight: bold;
      svg{
        padding-right: 0.3em;
      }
    }
  }
  @media screen and (max-width: 600px) {
    padding: 1em;
  }
`