import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, makeStyles } from '@mui/material';

const cardData = [
  { title: 'Card 1', content: 'Content for Card 1' },
  { title: 'Card 2', content: 'Content for Card 2' },
  { title: 'Card 3', content: 'Content for Card 3' },
  // Add more card data as needed
];

const TrainingPage = () => {
  

  return (
    <div>
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant="h6" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default TrainingPage;