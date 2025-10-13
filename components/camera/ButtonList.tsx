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
	const [isIOS, setIsIOS] = useState(true);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsIOS(/iPad|iPhone|iPod/.test(window.navigator.userAgent));
		}
	}, []);

	// ✅ Safari fallback: handle both touch + click
	const handleCancel = (e: React.MouseEvent | React.TouchEvent) => {
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

			<CustomButton
				variant="contained"
				sx={{
					marginBottom: "20px",
					opacity: isIOS ? 0 : 1,
				}}
				onClick={fullScreen}
				disabled={isIOS}
			>
				<OpenInFullIcon sx={{ fontSize: "20px" }} />
			</CustomButton>

			<Box
				sx={{
					mt: "10px",
					width: "50px",
					height: "70%",
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
					marginTop: "20px",
					position: "fixed",
					zIndex: 1,
					bottom: "calc(10px +env(safe-area-inset-bottom))",
					transform: "translateY(-10px)",
					minWidth: "44px",
					minHeight: "44px",

					touchAction: "manipulation",
					WebkitTapHighlightColor: "transparent",
					cursor: "pointer",
					pointerEvents: "auto",
					WebkitUserSelect: "none",
				}}
				onTouchStart={handleCancel}
				onClick={handleCancel}
			>
				<CloseIcon sx={{ fontSize: "20px" }} />
			</CustomButton>
			{/* <Box
				sx={{
					position: "relative",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					mt: "20px",
				}}
			>
				<CustomButton
					variant="contained"
					color="error"
					sx={{
						marginTop: "20px",
						position: "fixed",
						zIndex: 1,
						bottom: "calc(20px + env(safe-area-inset-bottom))",
						transform: "translateY(-10px)",
						minWidth: "44px",
						minHeight: "44px",

						touchAction: "manipulation",
						WebkitTapHighlightColor: "transparent",
						cursor: "pointer",
						pointerEvents: "auto",
						WebkitUserSelect: "none",
					}}
					onTouchStart={handleCancel}
					onClick={handleCancel}
				>
					<CloseIcon sx={{ fontSize: "20px" }} />
				</CustomButton>
			</Box> */}
		</Box>
	);
};

export default ButtonList;
