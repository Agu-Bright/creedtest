import { postData } from "../../../api/postData";
import Btn from "../../../components/MikesComponents/Btn";
import BrowseSimilarItem from "./BrowseSimilarItem";

const BrowseSimilar = ({ title, classname, data }) => {
	return (
		<div className={`border rounded p-6 ${classname}`}>
			<h2 className="text-sm mb-4 capitalize">browse similar {title}</h2>
			<ul className="flex flex-col lg:gap-2 text-xs lg:text-base text-zinc-800 h-[350px] lg:max-h-96 overflow-y-hidden overflow-x-hidden">
				{data?.length > 0 ? (
					data.map((data, index) => (
						<BrowseSimilarItem key={index} data={data} />
					))
				) : (
					<li>No Creedlancer to follow</li>
				)}
			</ul>
		</div>
	);
};

export default BrowseSimilar;
