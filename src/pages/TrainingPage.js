import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Container from '@mui/material/Container';

const cardData = [
  { title: 'Card 1', content: <iframe width="100%"  src="https://www.youtube.com/embed/Q3mqj0S-ECY?si=UZYh9QFZzWkpfkIA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  { title: 'Card 2', content: <iframe width="100%"  src="https://www.youtube.com/embed/vXv6uvrUjKo?si=Gl94qC8DLn-8mL3N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  { title: 'Card 3', content: <iframe width="100%"  src="https://www.youtube.com/embed/xIYJUzYd670?si=wCZsoSKtLIldYNbE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  { title: 'Card 4', content: <iframe width="100%"  src="https://www.youtube.com/embed/b31yQTUAdJo?si=MURqcHauiDZAq2xe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  { title: 'Card 5', content: <iframe width="100%"  src="https://www.youtube.com/embed/L5gGu_A2b-U?si=F1Vw8vQcTNs_tJEf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  { title: 'Card 6', content: <iframe width="100%"   src="https://www.youtube.com/embed/8GVTsOYP4Gw?si=70glXci1QDQuK-7v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  { title: 'Card 7', content: <iframe width="100%" src="https://www.youtube.com/embed/b31yQTUAdJo?si=MURqcHauiDZAq2xe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> },
  // Add more card data as needed
];

const TrainingPage = () => {
  return (
    <Container sx={{height:'100vh', overflow:'scroll', display:'flex', justifyContent:'center', flexWrap:"wrap"}} fixed>
        {cardData.map((card, index) => (
            <Card sx={{margin:'10px', width:'300px'}} key={index}>
            <CardContent>
                {card.content}
            </CardContent>
            </Card>
        ))}
    </Container>
  );
};

export default TrainingPage;