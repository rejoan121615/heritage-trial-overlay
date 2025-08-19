import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { HeritageDataTYPE } from "@/types/AllTypes";
import Link from "next/link";

const HeritageCard = ( { data, showEditForm, delete: deleteHeritage } : { data : HeritageDataTYPE, showEditForm: (id: string) => void, delete: (id: string) => void } ) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={data.image}
        sx={{ height: '200px'}}
      />
      <CardContent sx={{ height: '120px'}}>
        <Typography gutterBottom variant="h5" component="div">
          { data.title }
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", maxHeight: '60px', overflow: 'hidden' }}>
          {data.summary}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '15px'}}>
        <Link href={`/heritage/${data.id}`}>
          <Button size="small" variant="contained" color="secondary">details</Button>
        </Link>
        <Button size="small" variant="contained" color="info" onClick={() => showEditForm(data.id)}>edit</Button>
        <Button size="small" variant="contained" color="warning" onClick={() => deleteHeritage(data.id)}>delete</Button>
      </CardActions>
    </Card>
  );
};

export default HeritageCard;
