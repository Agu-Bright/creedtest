import React, { useRef, useEffect, useState } from "react";
import "./Filter.css";
import StarIcon from "@mui/icons-material/Star";
import { motion, useDragControls } from "framer-motion";
import PickCategory from "../../components/common/PickCategory";
import styled from "styled-components";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import { categoryData } from "../components/PickCategory/data";
import { useMediaQuery } from "react-responsive";
import { useLocation, useParams } from "react-router-dom";
import { categoryData } from "../../components/common/PickCategory/data";

const Filter = ({ hide, isKeyboardVisible, setFixTab, setFilter, page }) => {
	const { category } = useParams();
	const { pathname } = useLocation();
	const formRef = useRef();
	const renderCount = useRef(0);
	const [justifyContent, setJustifyContent] = useState("");
	const [budget, setBudget] = useState("");
	const [minPay, setMinPay] = useState(0);
	const [maxPay, setMaxPay] = useState(0);
	const [minBudget, setMinBudget] = useState(0);
	const [maxBudget, setMaxBudget] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [selectedJobCategory, setSelectedJobCategory] = useState("Web design");
	const [selectedSubCategory, setSelectedSubCategory] = useState(
		"Wordpress development"
	);
	const [showPickCategory, setShowPickCategory] = useState(false);
	const [showPickSubCategory, setShowPickSubCategory] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 1023 });

	const handleDrag = (e, info) => {
		if (info.offset.y > 100) {
			setJustifyContent("flex-end");
			setFixTab(false);
			hide();
		}
	};

	const dragControls = useDragControls();

	const onDragStart = (event, info) => {
		if (!event.target.classList.contains("no-drag")) {
			dragControls.start(event);
		} else {
			dragControls.componentControls.forEach((entry) => {
				entry.stop(event, info);
			});
		}
	};

	// useEffect(() => {
	//   const inputList = document.querySelectorAll('.dashboard-filter input[type="number"]');
	//   inputList.forEach(input => {
	//     if(window.innerWidth <= 650) {
	//       input.addEventListener('focus', () => {
	//         setMarginBottom('-60px')
	//       })
	//     }
	//   })

	//   return () => inputList.forEach(input => input.removeEventListener('focus', () => {}))
	// }, [])

	useEffect(() => {
		renderCount.current = renderCount.current + 1;
		formRef.current.focus();
	});

	useEffect(() => {
		let list = [];
		categoryData.forEach((cat) => {
			list.push(...cat.list);
		});
		setCategories([...list]);
		console.log(list);
	}, []);

	useEffect(() => {
		if (renderCount.current > 2) {
			if (window.innerWidth <= 650) {
				setJustifyContent("flex-end");
				if (isKeyboardVisible) {
					// setMarginBottom('60px')
				} else {
					setFixTab(false);
				}
			}
		}
	}, [isKeyboardVisible]);
	useEffect(() => {
		let filters = [];
		if (budget) {
			filters.push(`&budget=${budget}`);
		}
		if (selectedCategory) {
			filters.push(`&category=${selectedCategory}`);
		}
		if (minPay > 0) {
			filters.push(`&hourlyPay[gte]=${minPay}`);
		}
		if (maxPay > 0) {
			filters.push(`&hourlyPay[lte]=${maxPay}`);
		}
		if (minBudget > 0) {
			filters.push(`&minimumPrice[lte]=${minBudget}`);
		}
		if (maxBudget > 0) {
			filters.push(`&maximumPrice[gte]=${maxBudget}`);
		}
		if (category) {
			filters.push(`&category=${category}`);
		}
		setFilter(filters.join(""));
	}, [
		budget,
		minPay,
		maxPay,
		minBudget,
		maxBudget,
		pathname,
		selectedCategory,
	]);
	useEffect(() => {
		console.log(pathname);

		setBudget("");
		setMinPay(0);
		setMaxPay(0);
		setMinBudget(0);
		setMaxBudget(0);
		setSelectedCategory("");
	}, [pathname]);
	return (
		<React.Fragment>
			<Container
				as={motion.div}
				className="dashboard-filter-overlay"
				// initial={{ y: "100%" }}
				// animate={{ y: "0%" }}
				// exit={{y: "100%"}}
			>
				<motion.div
					className="dashboard-filter"
					initial={isMobile ? { y: "100%" } : { y: "0%" }}
					animate={{ y: "0%" }}
					exit={isMobile ? { y: "100%" } : { y: "0%" }}
					transition={{ type: "none" }}
					drag="y"
					dragDirectionLock
					dragConstraints={{ top: 0, bottom: 100 }}
					dragElastic={{
						bottom: 0.5,
					}}
					dragSnapToOrigin
					dragControls={dragControls}
					onPointerDown={onDragStart}
					onDragEnd={handleDrag}
					style={{
						justifyContent: justifyContent,
					}}
				>
					<div className="drag-handle"></div>
					<motion.form
						dragListener={false}
						className="no-drag"
						ref={formRef}
						onSubmit={(e) => e.preventDefault()}
					>
						<div className="form-header">
							<h3>Filters</h3>
							{/* <CloseIcon onClick={hide} /> */}
						</div>
						<div className="form-body no-drag">
							{/* Project type */}
							{/* {page == "workers" && (
								<div className="filter no-drag">
									<div className="filter-top no-drag">
										<h4>Project type</h4>
										<button>Clear</button>
									</div>
									<div className="checkbox no-drag">
										<input type="radio" />
										<span>Fixed pay</span>
									</div>
									<div className="checkbox no-drag">
										<input type="radio" />
										<span>Hourly pay</span>
									</div>
								</div>
							)} */}
							<div className="filter no-drag">
								<div className="filter-top no-drag">
									<h4>Category</h4>
									<button onClick={() => setSelectedCategory("")}>Clear</button>
								</div>
								<label>Select Category</label>
								<div className="input-box no-drag">
									<select
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
										className="w-full border-0"
									>
										<option value="">Select</option>
										{categories.map((cat) => (
											<option value={cat.title}>{cat.title}</option>
										))}
									</select>
								</div>
							</div>
							{/* Fixed price */}
							{page != "services" && page != "workers" && (
								<>
									<div className="filter no-drag">
										<div className="filter-top no-drag">
											<h4>Price</h4>
											<button onClick={() => setBudget("")}>Clear</button>
										</div>
										<label>Pay</label>
										<div className="input-box no-drag">
											{page == "projects" && (
												<select
													value={budget}
													onChange={(e) => setBudget(e.target.value)}
													className="w-full border-0"
												>
													<option value="">Select</option>
													<option value="5k - 10k (Micro-task)">
														5k - 10k (Micro-task){" "}
													</option>
													<option value="10k - 20k (Micro-project)">
														10k - 20k (Micro-project)
													</option>
													<option value="20k - 50k (Small-scale-task)">
														20k - 50k (Small-scale-task)
													</option>
													<option value="50k - 100k (Small-scale-project)">
														50k - 100k (Small-scale-project)
													</option>
													<option value="100k - 200k (Medium-project)">
														100k - 200k (Medium-project)
													</option>
													<option value="200k - 500k (Large-project)">
														200k - 500k (Large-project)
													</option>
													<option value="500k - 1M (Larger-project)">
														500k - 1M (Larger-project)
													</option>
													<option value="1M - 5M (Very-large-project)">
														1M - 5M (Very-large-project)
													</option>
													<option value="5M - 10M (Platinum-Project)">
														5M - 10M (Platinum-Project)
													</option>
													<option value="10M and above (Diamond-project)">
														10M and above (Diamond-project)
													</option>
												</select>
											)}
											{page == "interviews" && (
												<select
													value={budget}
													onChange={(e) => setBudget(e.target.value)}
													className="w-full border-0"
												>
													<option value="">Select</option>
													<option value="₦5k - ₦10k">₦5k - ₦10k</option>
													<option value="₦10k - ₦20k">₦10k - ₦20k</option>
													<option value="₦20k - ₦50k">₦20k - ₦50k</option>
													<option value="₦50k - ₦100k">₦50k - ₦100k</option>
													<option value="₦100k - ₦200k">₦100k - ₦200k</option>
													<option value="₦200k - ₦500k">₦200k - ₦500k</option>
													<option value="₦500k - ₦1M">₦500k - ₦1M</option>
													<option value="₦1M - ₦5M">₦1M - ₦5M</option>
													<option value="₦5M - ₦10M">₦5M - ₦10M</option>
													<option value="₦10M and above">₦10M and above</option>
												</select>
											)}
										</div>
									</div>
								</>
							)}

							{page == "workers" && (
								<div className="filter no-drag">
									<div className="filter-top no-drag">
										<h4>Pay</h4>
										<button
											onClick={() => {
												setMaxPay();
												setMinPay();
											}}
										>
											Clear
										</button>
									</div>
									<label>min</label>
									<div className="input-box no-drag">
										<p className="symbol no-drag">(₦)</p>
										<input
											type="number"
											value={minPay}
											onChange={(e) => setMinPay(e.target.value)}
											placeholder="0"
										/>
										<p className="tag no-drag">NGN</p>
									</div>
									<label>max</label>
									<div className="input-box no-drag">
										<p className="symbol no-drag">(₦)</p>
										<input
											type="number"
											placeholder="0"
											value={maxPay}
											onChange={(e) => setMaxPay(e.target.value)}
										/>
										<p className="tag no-drag">NGN</p>
									</div>
								</div>
							)}
							{page == "services" && (
								<div className="filter no-drag">
									<div className="filter-top no-drag">
										<h4>Price</h4>
										<button
											onClick={() => {
												setMaxBudget();
												setMinBudget();
											}}
										>
											Clear
										</button>
									</div>
									<label>min</label>
									<div className="input-box no-drag">
										<p className="symbol no-drag">(₦)</p>
										<input
											type="number"
											value={minBudget}
											onChange={(e) => setMinBudget(e.target.value)}
											placeholder="0"
										/>
										<p className="tag no-drag">NGN</p>
									</div>
									<label>max</label>
									<div className="input-box no-drag">
										<p className="symbol no-drag">(₦)</p>
										<input
											type="number"
											placeholder="0"
											value={maxBudget}
											onChange={(e) => setMaxBudget(e.target.value)}
										/>
										<p className="tag no-drag">NGN</p>
									</div>
								</div>
							)}

							{/* Reviews */}
							<div className="filter cursor-not-allowed opacity-50 no-drag">
								<div className="filter-top no-drag">
									<h4>Reviews</h4>
									<button>Clear</button>
								</div>
								<div className="double-label no-drag">
									<label>min</label>
									<label>max</label>
								</div>
								<div className="double-input no-drag">
									<input readOnly type="number" placeholder="0" />
									<p>-</p>
									<input readOnly type="number" placeholder="500" />
								</div>
							</div>

							{/* Ratings */}
							<div className="filter  cursor-not-allowed opacity-50 no-drag">
								<div className="filter-top no-drag">
									<h4>Ratings</h4>
									<button>Clear</button>
								</div>
								<div className="stars no-drag">
									<StarIcon />
									<StarIcon />
									<StarIcon />
									<StarIcon />
									<StarIcon />
								</div>
							</div>
						</div>
					</motion.form>
				</motion.div>
			</Container>
			{showPickCategory && (
				<PickCategory
					// data={categoryData}
					heading={"Select Job Category"}
					searchPlaceHolder="Search category"
					setValue={(value) => setSelectedJobCategory(value)}
					hide={() => {
						setShowPickCategory(false);
						document.querySelector("html").classList.remove("modal__open");
					}}
				/>
			)}
			{showPickSubCategory && (
				<PickCategory
					data={categoryData}
					heading={"Select Sub Category"}
					setValue={(value) => setSelectedSubCategory(value)}
					searchPlaceHolder="Search sub category"
					hide={() => {
						setShowPickSubCategory(false);
						document.querySelector("html").classList.remove("modal__open");
					}}
				/>
			)}
		</React.Fragment>
	);
};

export default Filter;

const Container = styled(motion.div)`
	.dashboard-filter form .form-body {
		scrollbar-color: #cdccca #f1f1f1;
		scrollbar-width: thin;

		/* width */
		&::-webkit-scrollbar {
			width: 5px;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: #cdccca;
			height: 20px !important;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: #989696;
		}
	}

	@media screen and (min-width: 447px) {
		.dashboard-filter .input-box {
			width: 95%;
		}
	}

	@media screen and (min-width: 567px) {
		.dashboard-filter .input-box {
			width: 96%;
		}
	}

	@media screen and (min-width: 768px) {
		.dashboard-filter .input-box {
			width: 97%;
		}
	}

	@media screen and (min-width: 1024px) {
		.dashboard-filter .input-box {
			width: 92%;
		}
	}
`;

const SelectCategoryButton = styled.div`
	background: #e9e9ed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 35px;
	padding: 0 0.5rem;
	margin-top: 10px;
	border-radius: 4px;
	cursor: pointer;

	> p {
		font-size: 0.875rem;
	}
`;
