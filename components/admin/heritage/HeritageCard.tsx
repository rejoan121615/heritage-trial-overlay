import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { HeritageDataTYPE } from "@/types/AllTypes";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { UserContext } from "@/contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const HeritageCard = ({
	data,
	showEditForm,
	delete: deleteHeritage,
}: {
	data: HeritageDataTYPE;
	showEditForm: (id: string) => void;
	delete: (id: string) => void;
}) => {
	const { user } = React.useContext(UserContext);
	const [creatorName, setCreatorName] = React.useState<string>("");

	React.useEffect(() => {
		if (!data.userId) return;
		if (user?.userId === data.userId) {
			setCreatorName("Yourself");
			return;
		}
		const fetchCreator = async () => {
			try {
				const userDoc = await getDoc(doc(db, "users", data.userId));
				if (userDoc.exists()) {
					const userData = userDoc.data();
					setCreatorName(userData.name || userData.displayName || "Unknown");
				} else {
					setCreatorName("Unknown");
				}
			} catch (error) {
				console.error("Error fetching user:", error);
				setCreatorName("Unknown");
			}
		};
		fetchCreator();
	}, [data.userId, user]);

	return (
		<Card sx={{ width: "100%" }}>
			<CardMedia
				component="img"
				alt="green iguana"
				height="140"
				image={data.image}
				sx={{ height: "200px" }}
			/>
			<CardContent sx={{ height: "120px" }}>
				<Typography gutterBottom variant="h5" component="div">
					{(() => {
						const t = data.title ?? "";
						return t.length > 17 ? t.slice(0, 17) + "..." : t;
					})()}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: "text.secondary",
						maxHeight: "60px",
						overflow: "hidden",
					}}
				>
					{data.summary}
				</Typography>
			</CardContent>
			<>
				<Divider sx={{ marginTop: "10px" }} />
				<Typography
					sx={{
						padding: "8px 15px",
						fontSize: "15px",
						color: "text.secondary",
						backgroundColor: "#e7e6e7ff",
					}}
				>
					Created by : {creatorName}
				</Typography>
				<Divider sx={{ marginBottom: "5px" }} />
			</>
			<CardActions sx={{ padding: "15px" }}>
				<Link href={`/heritage/${data.id}`}>
					<Button size="small" variant="contained" color="secondary">
						details
					</Button>
				</Link>
				<Button
					size="small"
					variant="contained"
					color="info"
					onClick={() => showEditForm(data.id)}
				>
					edit
				</Button>
				<Button
					size="small"
					variant="contained"
					color="warning"
					onClick={() => deleteHeritage(data.id)}
				>
					delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default HeritageCard;
