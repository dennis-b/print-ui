import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selectedTemplate } from '../../../state/atoms'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}));

export function TemplateCard({ template }: any) {
  const { attr, sizes: { size: { thumbnail } } } = template;
  const classes = useStyles();
  const [tmpl, setTemplate] = useRecoilState<any>(selectedTemplate);
  const history = useHistory();

  const onSelect = () => {
    setTemplate(template)
    history.push('/jobs');
  }
  console.log('tmpl', tmpl)

  return (
    <Card className={classes.root}>
      <CardHeader
        title={attr.name}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={thumbnail.replace(/&amp;/g, '&')}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          cloudinary template example
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={onSelect}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}