import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import List from "../../../components/MikesComponents/List";
import { img6 } from "../../../assets/mike";
import {
	PencilSquareIcon,
	PhotoIcon,
	TrashIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { LoaderContext } from "../../../contexts/LoaderContext";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { postData } from "../../../api/postData";
import { updateData } from "../../../api/updateData";
import { fetchData } from "../../../api/fetchData";

const AutoProposals = () => {
	const { setLoading } = useContext(LoaderContext);
	const { userData, checkStorage } = useContext(UserDataContext);

	const user = JSON.parse(userData)?.user;

	const [isOpen, setIsOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const [budget, setBudget] = useState();
	const [days, setDays] = useState();
	const [letter, setLetter] = useState();
	const [skills, setSkills] = useState([]);
	const [skillsInput, setSkillsInput] = useState();

	const [autoProposals, setAutoProposals] = useState();

	useEffect(() => {
		if (user?.autoproposal) {
			setAutoProposals(user?.autoproposal);
		}
	}, []);
	// {
	//   budget: 70000,
	//   letter:
	//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi et amet vitae, asperiores eveniet. Incidunt illum doloremque voluptate odio. Ut assumenda dolore at ratione odit reprehenderit est facilis autem!",
	//   skills: ["React", "HTML", "CSS", "JS", "Next.js", "Vue"],
	// }

	function closeModal() {
		setLetter();
		setBudget();
		setSkills([]);
		setSkillsInput("");
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}
	function setupAutoProposal(e) {
		e.preventDefault();
		setLoading(true);
		postData("/bid/create-auto-proposals", {
			budget,
			letter,
			deliveryDay: days,
		}).then((res) => {
			setLoading(false);
			console.log(res);
			if (letter && budget) {
				let value = { budget, letter, days };
				fetchData(`/users/${user._id}/get-user`).then((data) => {
					if (data) {
						localStorage.setItem(
							"user",
							JSON.stringify({
								user: data,
								token: JSON.parse(userData).token,
							})
						);
					}
					checkStorage();
				});
				setAutoProposals(value);
				closeModal();
			}
		});
	}
	const deleteAutoproposal = () => {
		setAutoProposals();
		setLoading(true);
		updateData("/bid/delete-auto-proposal").then((res) => {
			setLoading(false);
			console.log(res);
			fetchData(`/users/${user._id}/get-user`).then((data) => {
				if (data) {
					localStorage.setItem(
						"user",
						JSON.stringify({
							user: data,
							token: JSON.parse(userData).token,
						})
					);
				}
				checkStorage();
			});
			setAutoProposals(value);
			closeModal();
		});
	};

	return (
		<div className="">
			<h1 className="text-xl font-semibold border-b-4 border-primary-500 w-max pr-2">
				Auto Proposal
			</h1>
			{!autoProposals && (
				<div className="flex flex-col gap-2 items-center mt-20 w-full lg:mx-auto">
					<img src={img1} className="h-40 md:h-64" alt="" />
					<p className="lg:max-w-sm text-xs md:text-base text-center text-zinc-500">
						Auto Proposal allow you to propose for projects even when you're
						away or offline
					</p>
					<button
						onClick={openModal}
						className="bg-primary-500 text-white rounded-md w-max px-10 md:px-32 py-3 mt-2"
					>
						Setup Auto Proposal
					</button>
				</div>
			)}

			{autoProposals && (
				<div className="mt-10">
					<div className="grid md:grid-cols-3 gap-10">
						<div className=" md:col-span-2 p-6 border">
							<div className="flex justify-between items-center">
								<h2 className="text-xs mb-1">Proposal</h2>
								<div className="flex gap-2">
									<PencilSquareIcon
										onClick={() => {
											setIsOpen(true);
											setBudget(autoProposals.budget);
											setSkills(autoProposals.skills);
											setLetter(autoProposals.letter);
										}}
										className="h-5 cursor-pointer"
									/>
									<TrashIcon
										onClick={deleteAutoproposal}
										className="h-5 text-red-500 cursor-pointer"
									/>
								</div>
							</div>
							<p className="text-sm">{autoProposals.letter}</p>
						</div>
						<ul className="p-6 flex flex-col gap-2 border rounded">
							<li>
								<h2 className="text-xs mb-1">Category</h2>
								<p>{user?.category}</p>
							</li>
							<li>
								<h2 className="text-xs mb-1">Proposed Amount</h2>
								<p>
									{autoProposals.budget}
									<small>NGN</small>
								</p>
							</li>
							<li>
								<h2 className="text-xs mb-1">Delivery Time</h2>
								<p>
									{autoProposals.days}
									<small> Days</small>
								</p>
							</li>
						</ul>
					</div>
					<section className="mt-10">
						<h3 className="text-lg border-b-2 border-primary-500 pr-2 w-max">
							Submitted Proposals
						</h3>
						<ul className="grid md:grid-cols-3 gap-10 my-5">
							{[].map((i) => (
								<li className="">
									<div className="bg-zinc-200 relative text-zinc-600 ">
										{i % 2 == 0 ? (
											<img
												src={img6}
												style={{ height: "176px" }}
												className={"w-full rounded object-cover"}
												alt=""
											/>
										) : (
											<div className="rounded flex items-center justify-center h-44">
												<PhotoIcon className="h-6" />
											</div>
										)}
										<div className="absolute left-1.5 bottom-2 text-sm bg-primary-100 text-primary-500 rounded-full px-4 py-1">
											95,000 <small>NGN</small>
										</div>
									</div>
									<div className="py-4">
										<h2 className="text-zinc-800">Java Developer</h2>
										<p className="text-xs py-2 text-zinc-600">
											I have read through this project and am interested in
											the...
										</p>
										<h6 className="text-sm text-zinc-600">
											My Bid: 300,000NGN
										</h6>
									</div>
									<button className="bg-primary-500 text-white w-full py-2 rounded">
										View Project
									</button>
								</li>
							))}
						</ul>
						<div className="w-full bg-zinc-100 border-2 text-center  p-4 rounded">
							No Proposals have been automatiaclly submitted
						</div>
					</section>
				</div>
			)}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-[3000]" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div id="mike" className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									as="form"
									onSubmit={setupAutoProposal}
									className="w-full h-[100vh] md:h-auto max-w-2xl transform overflow-hidden md:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex md:block flex-col justify-center items-center relative"
								>
									{index < 2 && (
										<XMarkIcon
											onClick={() => setIsOpen(false)}
											className="h-6 w-6 md:hidden absolute top-6 right-6"
										/>
									)}
									{index == 0 && !autoProposals && (
										<div className="flex flex-col items-center p-4">
											<img src={img2} className="h-56" alt="" />
											<p className="max-w-md text-sm text-center py-4">
												Select your skills and pick a budget you're okay with
												clients paying and watch your proposals autosend. Don't
												forget to add a proposal describing what you offer.
											</p>
											<button
												onClick={() => setIndex(1)}
												className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium bg-primary-500"
											>
												Next
											</button>
										</div>
									)}
									{index == 1 && !autoProposals && (
										<div className="flex flex-col items-center">
											<img src={img3} className="h-56" alt="" />
											<p className="max-w-md text-sm text-center py-4">
												Creedlance Auto Proposals select jobs from your category
												so don't forget to write a descriptive proposal that
												will fit into any job from your category.
											</p>
											<button
												onClick={() => setIndex(2)}
												className="outline-none inline-flex justify-center rounded-md border border-transparent text-white w-full md:w-max md:px-40 py-2 text-sm font-medium bg-primary-500"
											>
												Next
											</button>
										</div>
									)}
									{(index == 2 || autoProposals) && (
										<div className="w-full">
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-zinc-900 border-b-2 border-primary-500 w-max pr-2"
											>
												Create Auto Proposal
											</Dialog.Title>
											<div className="mt-4 text-sm flex flex-col gap-2 text-zinc-600">
												<div className="flex flex-col gap-2">
													<label htmlFor="" className="text-xs">
														Your Category
													</label>

													<div className="border opacity-60 bg-zinc-200 rounded-md p-2">
														{user?.category}
													</div>
												</div>
												{/* <List
													className={"text-xs"}
													title={"Skills"}
													placeholder={"Ex: C++"}
													inp={skillsInput}
													setInp={setSkillsInput}
													oldVal={skills}
													setOldVal={setSkills}
													type={"skill"}
												/> */}

												<div className="flex flex-col gap-2">
													<label htmlFor="" className="text-xs">
														Proposed Amount
													</label>
													<input
														type="number"
														className="border rounded-md p-2 invalid:border-red-300 valid:border-emerald-300"
														placeholder={"Ex: 7000"}
														min={500}
														value={budget}
														onChange={(e) => setBudget(e.target.value)}
														required
													/>
												</div>
												<div className="flex flex-col gap-2">
													<label htmlFor="" className="text-xs">
														The project will be delivered in
													</label>
													<input
														type="number"
														className="border rounded-md p-2 invalid:border-red-300 valid:border-emerald-300"
														placeholder={"Ex: 7 days"}
														value={days}
														onChange={(e) => setDays(e.target.value)}
														required
													/>
												</div>
												<div className="flex flex-col gap-2">
													<label htmlFor="" className="text-xs">
														Proposal
													</label>
													<textarea
														className="border rounded-md p-2 invalid:border-red-300 valid:border-emerald-300"
														placeholder={"Ex: I am interested in..."}
														value={letter}
														onChange={(e) => setLetter(e.target.value)}
														required
													/>
												</div>
											</div>
											<div className="mt-4 flex">
												<button className="outline-none inline-flex justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-500 hover:bg-primary-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
													{autoProposals ? "Save" : "Start"}
												</button>
												<div
													className="border-0 cursor-pointer bg-white ml-2 px-4 py-2 outline-none text-red-500 rounded-md hover-bg-red-100 text-sm"
													onClick={closeModal}
												>
													Cancel
												</div>
											</div>
										</div>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default AutoProposals;
