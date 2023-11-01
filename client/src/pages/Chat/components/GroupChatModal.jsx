import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { chatState } from "../../../contexts/ChatProvider";
import { ModalContext } from "../../../contexts/ModalContext";
import { fetchData } from "../../../api/fetchData";
import UserContainer from "./UserContainer";
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

const GroupChatModal = ({ open, handleClose }) => {
  const { showModal } = useContext(ModalContext);
  const { user, token, chats, setChats } = chatState();

  //component states
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      showModal("User already added", false);
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    await fetchData();
    setLoading(true);
    await fetchData(`/users/get-users?search=${search}`)
      .then((res) => {
        setSearchResult(res);
        setLoading(false);
      })
      .catch((err) => {
        // showModal(err, false);
        setLoading(false);
      });
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `/api/chat/group`,
      token
        ? {
            method: "POST",
            body: JSON.stringify({
              name: groupChatName,
              users: selectedUsers.map((u) => u._id),
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        setChats([data, ...chats]);
        handleClose();
        showModal(`New Group Chat Created!`, true);
      } else {
        console.log(data);
        showModal(`Failed to Create the Chat!`, false);
        setLoading(false);
      }
    });
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Stack sx={style} direction="column" spacing={5}>
            <div>
              <h4>Create Group Chat</h4>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-y-2 w-full box-border lg:mt-1">
                <label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
                  Chat Name
                </label>

                <input
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  type="text"
                  placeholder=" Chat Name"
                  className="border rounded-md p-2 pl-8 placeholder:text-zinc-700"
                />
              </div>
              <div className="flex flex-col gap-y-2 w-full box-border lg:mt-1">
                <label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
                  Add User
                </label>

                <input
                  placeholder="Add Users eg: John, Piyush, Jane"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              {/* <SkillList
                type="skill"
                title={"Which skills are required?"}
                placeholder={"Ex: React, Photoshop, Illustrator"}
                inp={skillsetInput}
                setInp={setSkillsetInput}
                oldVal={skillsets}
                setOldVal={setSkillsets}
                className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm mt-3 -mb-1"
              /> */}

              {loading ? (
                // <ChatLoading />
                <div>Loading...</div>
              ) : (
                <ul className="flex lg:absolute top-0 bottom-0 clb lg:overflow-auto   flex-col lg:gap-2 text-xs lg:text-base text-zinc-800 h-full w-full pb-16 lg:pb-6">
                  {searchResult?.slice(0, 4).map((user) => (
                    <li key={item._id}>
                      <UserContainer
                        photo={item?.photo}
                        name={item.name}
                        email={item.email}
                        id={item._id}
                        setSearch={(val) => setSearch(val)}
                        handleFunction={() => handleGroup(user)}
                        group={true}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* {project ? (
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
              )} */}
            </form>
          </Stack>
        </Modal>
      </div>
    </>
  );
};

export default GroupChatModal;

// import React, { useState, useContext, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { Stack } from "@mui/material";
// import SkillList from "../../../components/common/SkillList";
// import { AddJobContext } from "../../../contexts/AddJobContext";
// import { ModalContext } from "../../../contexts/ModalContext";
// import { updateData } from "../../../api/updateData";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { md: 400, xs: 250 },
//   borderRadius: 4,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   border: "none",
// };

// // /:id/update-Project
// // /:id/update-interview
// export default function UpdateModal({
//   open,
//   handleClose,
//   project,
//   interview,
//   updateInterview,
//   updateProject,
// }) {
//   const { showModal } = useContext(ModalContext);
//   const [skillsetInput, setSkillsetInput] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const { skillsets, setSkillsets } = useContext(AddJobContext);
//   const [loading, setLoading] = useState(null);

//   useEffect(() => {
//     project
//       ? setJobDescription(project?.description)
//       : setJobDescription(interview?.companyDescription);
//     project
//       ? setSkillsets(project?.skills)
//       : setSkillsets(interview?.requiredSkills);
//   }, []);

//   const handleUpdate = async (id) => {
//     const main = {
//       description: jobDescription,
//       skills: skillsets,
//     };

//     const response = await updateData(`/projects/${id}/update-Project`, main);
//     if (!response.ok) {
//       const data = await response.json();
//       console.log(data);
//       // showModal(`${data.message}`, false);
//     } else {
//       handleClose();
//       showModal("success", true);
//       updateProject(id, main);
//       const data = await response.json();
//     }
//   };

//   const handleUpdate2 = async (id) => {
//     const main = {
//       companyDescription: jobDescription,
//       requiredSkills: skillsets,
//     };
//     const response = await updateData(
//       `/interviews/${id}/update-interview`,
//       main
//     );
//     if (!response.ok) {
//       const data = await response.json();
//       console.log(data);
//       // showModal(`${data.message}`, false);
//     } else {
//       handleClose();
//       showModal("success", true);
//       updateInterview(id, main);
//       // const data = await response.json();
//     }
//   };

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Stack sx={style} direction="column" spacing={5}>
//           <div className="formpost-heading mb-5">
//             {project && <h4>Edit Project</h4>}
//             {interview && <h4>Edit Interview</h4>}
//           </div>
//           <form onSubmit={(e) => e.preventDefault()}>
//             <div className="flex flex-col gap-y-2 w-full box-border lg:mt-1">
//               <label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
//                 {project
//                   ? "Tell us more about the project*"
//                   : "Tell us more about the interview*"}
//               </label>
//               <textarea
//                 placeholder="Tell us more about the project"
//                 className="border-solid border-[1px] p-3 border-[#dfe1e4] rounded-[14px] lg:border-[1.7px] min-h-[100px] resize-none lg:p-4 font-inter"
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//                 required
//               />
//             </div>

//             <SkillList
//               type="skill"
//               title={"Which skills are required?"}
//               placeholder={"Ex: React, Photoshop, Illustrator"}
//               inp={skillsetInput}
//               setInp={setSkillsetInput}
//               oldVal={skillsets}
//               setOldVal={setSkillsets}
//               className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm mt-3 -mb-1"
//             />
//             {project ? (
//               <button
//                 onClick={() => handleUpdate(project?._id)}
//                 className="bg-[#daa520] border-none py-3 w-full rounded-md text-white text-sm mt-3 lg:mt-8 lg:py-4 lg:text-base text-center lg:mb-8"
//               >
//                 {loading ? "UPDATING...." : "UPDATE"}
//               </button>
//             ) : (
//               <button
//                 onClick={() => handleUpdate2(interview?._id)}
//                 className="bg-[#daa520] border-none py-3 w-full rounded-md text-white text-sm mt-3 lg:mt-8 lg:py-4 lg:text-base text-center lg:mb-8"
//               >
//                 {loading ? "UPDATING...." : "UPDATE"}
//               </button>
//             )}
//           </form>
//         </Stack>
//       </Modal>
//     </div>
//   );
// }
