import { useContext, useState } from "react";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { CircularProgress } from "@mui/material";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { updateData } from "../../../api/updateData";

const AdditionalFiles = ({ user, outwards }) => {
	const { userData, checkStorage } = useContext(UserDataContext);

	const [loading, setLoading] = useState(false);

	const handleUpload = (e) => {
		setLoading(true);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2 && reader.result) {
				updateData(`/users/${user?._id}/addfile`, {
					title: e.target.files[0].name,
					size: e.target.files[0].size,
					value: reader.result,
				}).then(() => {
					setLoading(false);
					fetchData(`/users/${user?._id}/get-user`).then((data) => {
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
				});
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const downloadFile = (url, title) => {
		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(new Blob([blob]));
				const a = document.createElement("a");
				a.href = url;
				a.download = title; // Set the desired filename here
				document.body.appendChild(a);
				a.click();
				a.remove();
			})
			.catch((error) => {
				console.error("Error downloading the file:", error);
			});
	};
	return (
		<>
			<h2 style={{ marginBottom: "1rem" }}>Additional Documents</h2>
			{!outwards && (
				<div className="border rounded py-20 flex-col flex items-center justify-center text-zinc-400 relative">
					{loading ? (
						<CircularProgress sx={{ color: "rgb(218 165 32)" }} />
					) : (
						<>
							<ArrowUpTrayIcon className="h-12 mb-5" />
							<p>Drag & Drop to Upload Document</p>
						</>
					)}

					<input
						disabled={loading}
						onChange={handleUpload}
						type="file"
						name=""
						id=""
						className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
					/>
				</div>
			)}

			{(user?.additionalFiles?.length == 0 || !user?.additionalFiles) && (
				<div className="border rounded p-4 text-center">
					No Additional FIles
				</div>
			)}
			<ul className=" mt-4 grid lg:grid-cols-2 gap-4">
				{user?.additionalFiles?.map(({ title, size, url }) => (
					<li className="flex gap-2 border rounded p-4 relative">
						<DocumentIcon className="text-red-600 h-10" />
						<div className="flex flex-col">
							<h4 className="text-sm">{title}</h4>
							<small className="text-xs text-zinc-500">
								{(size / (1024 * 1024)).toFixed(2)}MB
							</small>
						</div>
						<button
							onClick={() => downloadFile(url, title)}
							className="absolute text-primary-500 right-4 bottom-4 text-sm"
						>
							Download
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default AdditionalFiles;
