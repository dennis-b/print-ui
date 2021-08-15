import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedJob } from '../../../state/atoms'
import { useHistory } from 'react-router-dom';
import { templateState } from "../../../state/selectors";
import { StyledCardMedia, StyledImage } from '../JobsPage.styled';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  }
}));

export function JobCard({ job }: any) {
  const classes = useStyles();
  const [, setJob] = useRecoilState<any>(selectedJob);
  const { attr: { name } } = useRecoilValue(templateState);
  const history = useHistory();

  console.log('job.value', job.value)

  const onSelect = () => {
    setJob(job)
    setTimeout(() => {
      history.push('/editor');
    }, 500)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader="September 14, 2016"
      />
      <StyledCardMedia>
        <StyledImage
          src={`https://ids.w2p-tools.com/d003/getresult.php?c=cloudinary&type=png&res=700&id=${job.value}`}
        />
      </StyledCardMedia>
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