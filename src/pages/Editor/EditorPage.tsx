import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { jobState, templateState } from "../../state/selectors";
import { Box, makeStyles } from "@material-ui/core";
import { StyledIframe } from './EditorPage.styed';
import { useFetch } from "use-http";
import { AUTH } from "../../constants";
import { parseJobsData } from "../../utils/xml.utils";
import { selectedJob } from "../../state/atoms";
import { useHistory } from "react-router-dom";

export const useRootStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px',
    position: 'absolute'
  }
}));

export const EditorPage = () => {
  const { attr: { t } } = useRecoilValue(templateState);
  const { post, response } = useFetch('https://ids.w2p-tools.com')
  const job = useRecoilValue(jobState);

  const history = useHistory();

  useEffect(() => {
    function postMessageHandler(event: any) {
      if (event.data === "printui_finished") {
        console.log(event.data)
        history.push('/download')
      }
      if (event.data === "printui_cancel") {

      }
    }

    window.addEventListener("message", postMessageHandler)

  }, [])

  const classes = useRootStyles();
  const src = `https://cdn.printui.com/editor/current/index.html?client=cloudinary&jobID=${job.value}`

  return (
    <Box width={'100%'} height={'100%'} className={classes.content}>
      <StyledIframe
        src={src}
      />
    </Box>
  );
};
