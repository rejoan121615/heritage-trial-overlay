import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { HeritageItemTYPE } from "@/types/adminType";
import Link from "next/link";

const HeritageCard = ( { data } : { data : HeritageItemTYPE } ) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={data.imageUrl}
        sx={{ height: '200px'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { data.title }
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '15px'}}>
        <Link href={`/admin/heritage/${data.id}`}>
          <Button size="small" variant="contained" color="secondary">details</Button>
        </Link>
        <Button size="small" variant="contained" color="info">edit</Button>
        <Button size="small" variant="contained" color="warning">delete</Button>
      </CardActions>
    </Card>
  );
};

export default HeritageCard;
