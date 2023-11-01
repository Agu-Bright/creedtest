import { useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import img4 from "../assets/img4.svg";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { moneyFormat } from "../../../functions/moneyFormat";
import { Link } from "react-router-dom";
import Loader from "../../../components/MikesComponents/Loader";

const Projects = () => {
	const [proposals, setProposals] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true)
		fetchData("/bid/getMyProposals").then((res) => {
			setLoading(false)
			setProposals(res.proposals.reverse());
			console.log(proposals);
		});
	}, []);

	return (
		<div>
			<h1 className="text-xl font-semibold border-b-4 border-primary-500 w-max pr-2">
				Proposals
			</h1>
			{proposals?.length == 0 && (
				<div className="flex flex-col gap-2 items-center mt-20 w-full lg:mx-auto">
					<img src={img4} className="h-40 md:h-64" alt="" />
					<p className="lg:max-w-sm text-xs md:text-base text-center text-zinc-500">
						You do not have any active proposals
					</p>
					<Link
						to={"/dashboard/browse/projects"}
						className="bg-primary-500 text-white rounded-md w-max px-10 md:px-32 py-3 mt-2"
					>
						Browse Projects
					</Link>
				</div>
			)}

			<ul className="grid md:grid-cols-3 gap-10 my-5 lg:my-10">
				{proposals?.map(({ bidAmount, coverLetter, project }) => (
					<li className="">
						<div className="bg-zinc-200 relative text-zinc-600 ">
							{/* <img
									src={img6}
									style={{ height: "176px" }}
									className={"w-full rounded object-cover"}
									alt=""
								/> */}
							<div className="rounded flex items-center justify-center h-44">
								<PhotoIcon className="h-6" />
							</div>
							<div className="absolute left-1.5 bottom-2 text-sm bg-primary-100 text-primary-500 rounded-full px-4 py-1">
								{project?.budget}
							</div>
						</div>
						<div className="py-4">
							<h2 className="text-zinc-800">
								{project?.title?.length <= 25
									? project?.title
									: project?.title?.split("").splice(0, 25).join("") + "..."}
							</h2>
							<p className="text-xs py-2 text-zinc-600">{coverLetter}</p>
							<h6 className="text-sm text-zinc-600">
								My Bid: {moneyFormat(bidAmount)}
							</h6>
						</div>
						<Link
							to={"/dashboard/browse/projects/" + project?._id}
							className="bg-primary-500 block text-center text-white w-full py-2 rounded"
						>
							View Project
						</Link>
					</li>
				))}
			</ul>
			<Loader loading={loading} />
		</div>
	);
};

export default Projects;
