import React, { useState, useEffect } from "react";
import { Box, Slider } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomComponent/CameraBtn";

const ButtonList = ({
	fullScreen,
	change,
	onCancel,
}: {
	fullScreen: () => void;
	change: (event: Event, newValue: number) => void;
	onCancel: () => void;
}) => {
	const [isIOS, setIsIOS] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsIOS(/iPad|iPhone|iPod/.test(window.navigator.userAgent));
		}
	}, []);

	// ✅ Safari fallback: handle both touch + click
	const handleCancel = (
		e: React.TouchEvent | React.MouseEvent | React.PointerEvent
	) => {
		e.preventDefault();
		e.stopPropagation();
		onCancel();
	};

	return (
		<Box
			sx={{
				position: "relative",
				display: "flex",
				// flexFlow: "column wrap",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				height: "100%",
				width: "100%",
				padding: "10px 0",
				WebkitTapHighlightColor: "transparent",
				touchAction: "manipulation",
			}}
		>
			{/* Hide full screen button on iOS */}

			{!isIOS && (
				<CustomButton
					variant="contained"
					sx={{
						marginBottom: "20px",
					}}
					onClick={fullScreen}
				>
					<OpenInFullIcon sx={{ fontSize: "20px" }} />
				</CustomButton>
			)}

			<Box
				sx={{
					mt: "10px",
					width: "50px",
					//height: "70%",
					flex: "1",
					display: "flex",
					alignSelf: "center",
					justifyContent: "center",
				}}
			>
				<Slider
					onChange={change}
					orientation="vertical"
					defaultValue={50}
					aria-label="Image Range"
				/>
			</Box>

			{/* ✅ Cancel Button */}
			<CustomButton
				variant="contained"
				color="error"
				sx={{
					marginTop: "10px",
				}}
				//onTouchStart={handleCancel}
				//onTouchEnd={handleCancel}
				onClick={handleCancel}
				//onPointerUp={handleCancel}
			>
				<CloseIcon sx={{ fontSize: "20px" }} />
			</CustomButton>
		</Box>
	);
};

export default ButtonList;
