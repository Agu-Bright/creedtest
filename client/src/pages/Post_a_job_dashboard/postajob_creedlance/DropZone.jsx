import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
const DropZone = ({ open, className, value = [], setValue = () => {} }) => {
	const onDrop = useCallback((acceptedFiles) => {
		setValue(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		onDrop,
	});

	const files = value.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size}bytes
		</li>
	));

	return (
		<div {...getRootProps((className = { className }))}>
			<input
				className="input-zone"
				{...getInputProps()}
			/>
			<div className="text-center">
				<p className="text-[#121212]">Upload files</p>
				<p className="text-sm font-inter text-[#7a8593] sm:w-3/4 mx-auto">
					Drag & drop any images or documents that might be helpful in
					explaining your brief here (Max file size: 25 MB).
				</p>
			</div>
			<aside>{files}</aside>
		</div>
	);
};

export default DropZone;
