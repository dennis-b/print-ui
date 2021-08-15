import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { templateState } from "../../state/selectors";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { useFetch } from "use-http";
import { AUTH } from "../../constants";
import { parseJobsData } from "../../utils/xml.utils";
import { JobCard } from "./components/JobCard";

export const useRootStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    marginTop: '64px',
    position: 'absolute',
    width: "calc(100% - 48px)"
  }
}));

export const JobsPage = () => {
  const { attr: { t } } = useRecoilValue(templateState);
  const { post } = useFetch('https://ids.w2p-tools.com')
  const [jobs, stJobs] = useState<any[]>([])

  useEffect(() => {
    async function getJobsData() {
      const formData = new FormData();
      formData.append("auth", AUTH);
      formData.append("t", t);
      const data = await post('//d003/getjobs.php', formData)
      console.log('jobs', parseJobsData(data))
      stJobs(parseJobsData(data))
    }
    getJobsData()
  }, [post, t])



  const classes = useRootStyles();


  return (
    <Box width={'100%'} height={'100%'} className={classes.content} p='2rem'>
      <Grid container spacing={1}>
        {
          jobs?.map((job, index) => (
            <Grid item xs={4} key={index}>
              <JobCard job={job}/>
            </Grid>

          ))
        }
      </Grid>
    </Box>
  );
};
