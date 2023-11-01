import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postData } from "../../api/postData";
import { chatState } from "../../contexts/ChatProvider";
import { UserDataContext } from "../../contexts/UserDataContext";
import Swal from "sweetalert2";
const ConfirmAwardModal = ({ hide, proposal }) => {
  const navigate = useNavigate();
  const { token, setSelectedChat } = chatState();

  const { userData } = useContext(UserDataContext);
  const { user } = JSON.parse(userData);

  const awardProject = (projectId, proposalId) => {
    postData(`/projects/${projectId}/${proposalId}/award-project`).then(() => {
      closeModal();
      navigate("/jobs/projects");
    });
  };

  const createNotification = async (notification) => {
    fetch(
      `/creedlance/notifications/create-notification`,
      token
        ? {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    ).then(async (res) => {
      hide();
      const data = await res.json();
      console.log(data);
    });
  };

  const handleReward = async () => {
    postData(
      `/projects/${proposal?.project}/${proposal?._id}/award-project`
    ).then(() => {
      navigate("/assigned/projects");
    });
  };

  return (
    <Container>
      <Overlay onClick={hide} />
      <Modal>
        <h3>Award Project</h3>
        <p>Are you sure you want to award the project to this applicant ?</p>
        {user && (
          <Link
            to={"/assigned/projects"}
            onClick={() => {
              awardProject(proposal?.project?._id, proposal?._id);

              createNotification({
                receiver: proposal.createdBy._id,
                type: "award",
                title: "Your were awarded a project",
                description: `${user.name} awarded you a project`,
                project: proposal?.project,
              });
              navigate("/assigned/projects");
              Swal.fire({
                icon: "success",
                title: "Project Awarded!",
                text: `You have successfully awarded this project to ${proposal?.createdBy?.name} you can check your assigned projects to keep track of progress`,
                timer: 5000,
                showCloseButton: true,
              });
            }}
            className="yellow__btn"
          >
            Award
          </Link>
        )}
        <Link onClick={hide}>Cancel</Link>
      </Modal>
    </Container>
  );
};

export default ConfirmAwardModal;

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const Modal = styled.div`
  width: 70%;
  background-color: #f3f3ef;
  z-index: 1001;
  border-radius: 8px;
  padding: 1em;
  text-align: center;

  h3 {
    margin: 0;
    font-family: intermedium;
    font-weight: initial;
    font-size: 1em;
  }

  p {
    font-size: 0.75em;
    margin-bottom: 1.5rem;
    color: #9d9ea2;
  }

  a {
    width: 100%;
    margin-top: 0.8rem;
    padding: 0.6rem 0;
    background-color: #fff;
    color: #121212;
    font-family: inter;
    font-size: 0.75em;
    border: none;
    border-radius: 6px;
    display: block;
  }

  a.yellow__btn {
    background-color: #ebb324;
    color: #121212;
  }

  @media (min-width: 1024px) {
    max-width: 350px;
    padding: 2rem 1.5rem;

    h3 {
      font-size: 1.2em;
    }

    p {
      font-size: 0.875em;
      margin-bottom: 1.5rem;
    }

    a {
      padding: 0.8rem 0;
      font-size: 0.875em;
    }
  }
`;

const Overlay = styled.div`
  background-color: #0000008b;
  position: fixed;
  inset: 0;
`;
