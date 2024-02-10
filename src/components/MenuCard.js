import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

export default function MenuCard({id, item, setShowRecipie, makeChanges}) {
  const [expanded, setExpanded] = React.useState(false);
  const [cardheight, setCardHeight] = React.useState(320)

  const handleExpandClick = () => {
    let newH = !expanded
    setExpanded(newH);
    if(newH){
      setCardHeight(630)
    }else{
      setCardHeight(320)
    }
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const {monday,tuesday,wednesday,thursday,friday,saturday,sunday} = item.days
  const error = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  ].filter((v) => v).length < 1;


  return (
    <Card sx={{ width: 345, margin:"25px", height:'auto', height:cardheight }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton onClick={()=>makeChanges(null,'delete',id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
        title={item.name}
        subheader={"by "+ item.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.displayImg}
        alt={item.name}
      />
      <CardActions disableSpacing>
        <Button onClick={()=>setShowRecipie(item.url)} variant="contained">Show Recipie</Button>
        <Stack sx={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft:'90px'}} direction="row" spacing={0}>
          <Typography>Schedule</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Pick a day</FormLabel>
            <FormGroup>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <FormControlLabel
                    control={
                        <Checkbox checked={monday} onChange={(e)=>makeChanges(e,'day', id)} name="monday" />
                    }
                    label="Monday"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={tuesday} onChange={(e)=>makeChanges(e,'day', id)} name="tuesday" />
                    }
                    label="Tuesday"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={wednesday} onChange={(e)=>makeChanges(e,'day', id)} name="wednesday" />
                    }
                    label="Wednesday"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={thursday} onChange={(e)=>makeChanges(e,'day', id)} name="thursday" />
                    }
                    label="Thursday"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={friday} onChange={(e)=>makeChanges(e,'day', id)} name="friday" />
                    }
                    label="Friday"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={saturday} onChange={(e)=>makeChanges(e,'day', id)} name="saturday" />
                    }
                    label="Saturday"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={sunday} onChange={(e)=>makeChanges(e,'day', id)} name="sunday" />
                    }
                    label="Sunday"
                />
                </Stack>
            </FormGroup>
          </FormControl>
        </CardContent>
      </Collapse>
    </Card>
  );
}