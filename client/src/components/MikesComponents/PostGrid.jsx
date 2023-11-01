import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MediaModal from "../../pages/Dashboards/components/MediaModal";

const PostGrid = ({
  files,
  description,
  modal,
  showComment,
  post,
  commentVisible = false,
}) => {
  const [previewFiles, setPreviewFiles] = useState(false);

  const checkType = (files, className = "") => {
    return files.map((file, i) => {
      if (file.type === "image") {
        return (
          <img
            src={file.url}
            alt=""
            style={{ height: "100%" }}
            className={className}
            key={i}
          />
        );
      } else {
        return (
          <video
            src={file.url}
            className={className}
            style={{ height: "100%" }}
            controls
            key={i}
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        );
      }
    });
  };

  // useEffect(() => {
  //   if(commentVisible){
  //     setPreviewFiles(false)
  //   }
  // })

  const checkModalType = (file) => {
    if (file.type === "image") {
      return (
        <img
          as="img"
          src={file.url}
          className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all mx-auto"
        />
      );
    } else {
      return (
        <video
          as="vid"
          src={file.url}
          controls
          style={{ maxHeight: "70vh" }}
          className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all mx-auto"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
      );
    }
  };

  function renderOne(files) {
    return <OneContainer>{checkType(files)}</OneContainer>;
  }

  function renderTwo(files) {
    return <TwoContainer>{checkType(files)}</TwoContainer>;
  }

  function renderThree(files) {
    return (
      <ThreeContainer>
        {checkType([files[0]])}
        <div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[1]])}
          </div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[2]])}
          </div>
        </div>
      </ThreeContainer>
    );
  }

  function renderFour(files) {
    return (
      <FourContainer>
        {checkType([files[0]])}
        <div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[1]])}
          </div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[2]])}
          </div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[3]])}
          </div>
        </div>
      </FourContainer>
    );
  }

  function renderFive(files) {
    return (
      <FiveContainer>
        <div className="top">
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[0]])}
          </div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[1]])}
          </div>
        </div>
        <div className="down">
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[2]])}
          </div>
          <div className="box-border h-full w-full overflow-hidden">
            {checkType([files[3]])}
          </div>
          {files.length === 5 && (
            <div className="box-border h-full w-full overflow-hidden">
              {checkType([files[4]])}
            </div>
          )}
          {files.length > 5 && (
            <div className="last__item" data-content={`+${files.length - 5}`}>
              {checkType([files[4]])}
            </div>
          )}
        </div>
      </FiveContainer>
    );
  }

  const handleShowModal = () => {
    showComment(false);
    setPreviewFiles(true);
  };

  return (
    <React.Fragment>
      <Container
        onClick={() =>
          modal &&
          (files.length > 1 || files[0].type === "image") &&
          handleShowModal()
        }
      >
        {files?.length === 1 && renderOne(files)}
        {files?.length === 2 && renderTwo(files)}
        {files?.length === 3 && renderThree(files)}
        {files?.length === 4 && renderFour(files)}
        {files?.length >= 5 && renderFive(files)}
      </Container>

      {/* Modal */}
      {previewFiles && (
        <MediaModal
          post={post}
          description={description}
          files={files}
          showComment={() => {
            setPreviewFiles(false);
            showComment(true);
          }}
          handleBack={() => setPreviewFiles(false)}
        />
      )}
    </React.Fragment>
  );
};

export default PostGrid;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    /* padding: 0.5rem 0.5rem .25rem; */
    /* border-radius: 8px; */
    /* border: 1px solid lightgray; */
  }
`;

const OneContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  img,
  video {
    width: 100%;
    object-fit: contain;
    cursor: pointer;
    /* border-radius: 8px; */

    @media screen and (max-width: 1023px) {
      border-radius: 0px;
    }
  }
`;

const TwoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5px;
  padding-bottom: 0.2rem;
  grid-template-rows: 35vh;

  img,
  video {
    pointer-events: none;
  }

  @media screen and (max-width: 1023px) {
    border-radius: 0px;
  }

  @media screen and (min-width: 1024px) {
    grid-template-rows: 400px;
  }

  img,
  video {
    width: 100%;
    object-fit: cover;
    /* border-radius: 8px; */
    height: 100%;
    cursor: pointer;

    @media screen and (max-width: 1023px) {
      border-radius: 0px;
    }
  }
`;

const ThreeContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5px;
  padding-bottom: 0.2rem;
  grid-template-rows: 35vh;

  img,
  video {
    pointer-events: none;
  }

  @media screen and (min-width: 1024px) {
    grid-template-rows: 400px;
  }

  > img,
  > video {
    width: 100%;
    object-fit: cover;
    /* border-radius: 8px; */
    height: 100%;
    cursor: pointer;

    @media screen and (max-width: 1023px) {
      border-radius: 0px;
    }
  }

  > div {
    width: 100%;
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: 1fr 1fr;
    gap: 1.5px;
    box-sizing: border-box;
    /* overflow: hidden; */
    height: 100%;

    img,
    video {
      width: 100%;
      object-fit: cover;
      /* border-radius: 8px; */
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;

      @media screen and (max-width: 1023px) {
        border-radius: 0px;
      }
    }
  }
`;

const FourContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 35vh;
  gap: 1.5px;
  padding-bottom: 0.2rem;

  img,
  video {
    pointer-events: none;
  }

  @media screen and (min-width: 1024px) {
    grid-template-rows: 400px;
  }

  > img,
  > video {
    width: 100%;
    object-fit: cover;
    /* border-radius: 8px; */
    height: 100%;
    cursor: pointer;

    @media screen and (max-width: 1023px) {
      border-radius: 0px;
    }
  }

  > div {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1.5px;
    height: 100%;

    img,
    video {
      width: 100%;
      object-fit: cover;
      /* border-radius: 8px; */
      height: 100%;
      cursor: pointer;

      @media screen and (max-width: 1023px) {
        border-radius: 0px;
      }
    }
  }
`;

const FiveContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 20vh 15vh;
  gap: 1.5px;
  padding-bottom: 0.2rem;

  img,
  video {
    pointer-events: none;
  }

  @media screen and (min-width: 1024px) {
    grid-template-rows: 230px 170px;
  }

  div.top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-template-rows: 1fr; */
    gap: 1.5px;
    box-sizing: border-box;
    height: 100%;

    > img,
    > video {
      width: 100%;
      object-fit: cover;
      /* border-radius: 8px; */
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;

      @media screen and (max-width: 1023px) {
        border-radius: 0px;
      }
    }
  }

  div.down {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* grid-template-rows: 1fr; */
    gap: 1.5px;
    box-sizing: border-box;
    height: 100%;

    > div > img,
    > div > video {
      width: 100%;
      object-fit: cover;
      /* border-radius: 8px; */
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;

      @media screen and (max-width: 1023px) {
        border-radius: 0px;
      }
    }

    .last__item {
      height: 100%;
      width: 100%;
      /* border-radius: 8px; */
      box-sizing: border-box;
      position: relative;
      max-width: 100%;

      @media screen and (max-width: 1023px) {
        border-radius: 0px;
      }

      > img,
      > video {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: relative;
        /* border-radius: 8px; */

        @media screen and (max-width: 1023px) {
          border-radius: 0px;
        }

        @media screen and (min-width: 1024px) {
          height: 167px;
        }
      }

      &::after {
        content: attr(data-content);
        position: absolute;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        background-color: #00000093;
        inset: 0;
        /* border-radius: 8px; */
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;

        @media screen and (max-width: 1023px) {
          border-radius: 0px;
        }

        @media screen and (min-width: 1024px) {
          height: 170px;
        }
      }
    }
  }
`;
