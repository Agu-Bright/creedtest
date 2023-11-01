import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	return (
		<LoaderContext.Provider
			children={children}
			value={{ loading, setLoading }}
		/>
	);
};
