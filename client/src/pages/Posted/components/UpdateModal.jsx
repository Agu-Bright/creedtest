import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import SkillList from "../../../components/common/SkillList";
import { AddJobContext } from "../../../contexts/AddJobContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { updateData } from "../../../api/updateData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, xs: 250 },
  borderRadius: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
};

// /:id/update-Project
// /:id/update-interview
export default function UpdateModal({
  open,
  handleClose,
  project,
  interview,
  updateInterview,
  updateProject,
}) {
  const { showModal } = useContext(ModalContext);
  const [skillsetInput, setSkillsetInput] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { skillsets, setSkillsets } = useContext(AddJobContext);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    project
      ? setJobDescription(project?.description)
      : setJobDescription(interview?.companyDescription);
    project
      ? setSkillsets(project?.skills)
      : setSkillsets(interview?.requiredSkills);
  }, []);

  const handleUpdate = async (id) => {
    const main = {
      description: jobDescription,
      skills: skillsets,
    };

    const response = await updateData(`/projects/${id}/update-Project`, main);
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      // showModal(`${data.message}`, false);
    } else {
      handleClose();
      showModal("success", true);
      updateProject(id, main);
      const data = await response.json();
    }
  };

  const handleUpdate2 = async (id) => {
    const main = {
      companyDescription: jobDescription,
      requiredSkills: skillsets,
    };
    const response = await updateData(
      `/interviews/${id}/update-interview`,
      main
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      // showModal(`${data.message}`, false);
    } else {
      handleClose();
      showModal("success", true);
      updateInterview(id, main);
      // const data = await response.json();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} direction="column" spacing={5}>
          <div className="formpost-heading mb-5">
            {project && <h4>Edit Project</h4>}
            {interview && <h4>Edit Interview</h4>}
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-y-2 w-full box-border lg:mt-1">
              <label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
                {project
                  ? "Tell us more about the project*"
                  : "Tell us more about the interview*"}
              </label>
              <textarea
                placeholder="Tell us more about the project"
                className="border-solid border-[1px] p-3 border-[#dfe1e4] rounded-[14px] lg:border-[1.7px] min-h-[100px] resize-none lg:p-4 font-inter"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>

            <SkillList
              type="skill"
              title={"Which skills are required?"}
              placeholder={"Ex: React, Photoshop, Illustrator"}
              inp={skillsetInput}
              setInp={setSkillsetInput}
              oldVal={skillsets}
              setOldVal={setSkillsets}
              className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm mt-3 -mb-1"
            />
            {project ? (
              <button
                onClick={() => handleUpdate(project?._id)}
                className="bg-[#daa520] border-none py-3 w-full rounded-md text-white text-sm mt-3 lg:mt-8 lg:py-4 lg:text-base text-center lg:mb-8"
              >
                {loading ? "UPDATING...." : "UPDATE"}
              </button>
            ) : (
              <button
                onClick={() => handleUpdate2(interview?._id)}
                className="bg-[#daa520] border-none py-3 w-full rounded-md text-white text-sm mt-3 lg:mt-8 lg:py-4 lg:text-base text-center lg:mb-8"
              >
                {loading ? "UPDATING...." : "UPDATE"}
              </button>
            )}
          </form>
        </Stack>
      </Modal>
    </div>
  );
}
