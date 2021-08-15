import React from 'react';
import { useRecoilValue } from "recoil";
import { jobState } from "../../state/selectors";
import { useRootStyles } from "../Editor/EditorPage";
import { Box, Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { CachePolicies, useFetch } from "use-http";
import { AUTH } from "../../constants";
import { parseData } from "../../utils/xml.utils";
import { StyledImage, StyledImageContainer } from './DownloadPage.styled';


function createAndDownloadBlobFile(body: any, filename: string, extension = 'jpeg') {
  const blob = new Blob([body]);
  const fileName = `${filename}.${extension}`;
  const link = document.createElement('a');
  // Browsers that support HTML5 download attribute
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const DownloadPage = () => {
  const job = useRecoilValue(jobState);
  const classes = useRootStyles();
  const { post } = useFetch('https://ids.w2p-tools.com/d003/requestpreview.php', {
    cache: 'no-cache',
    cachePolicy: CachePolicies.NO_CACHE
  })
  const { post: postGetImage } = useFetch('https://ids.w2p-tools.com', { responseType: 'blob' })

  const download = async (type: string) => {
    const formData = new FormData();
    formData.append("auth", AUTH);
    formData.append("id", job.value);
    formData.append("type", type);

    const previewRequestXml = await post(formData)
    const previewData = parseData(previewRequestXml)
    console.log('previewData', previewData)
    const { loc } = previewData[`${type}-preview`].attr;
    formData.append("loc", loc)
    setTimeout(async () => {
      const data = await postGetImage('/d003/getpreview.php', formData)
      createAndDownloadBlobFile(data, 'test', type)
    }, 2000)

  }

  const imageSrc = `https://ids.w2p-tools.com/d003/getresult.php?c=cloudinary&type=png&res=700&id=${job.value}`
  return (
    <Box m={1} width={'100%'} height={'100%s'} className={classes.content}>
      <Grid container spacing={1}>
        <Grid item>
          <Button color="primary" variant="contained" onClick={() => download('pdf')}>PDF</Button>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={() => download('jpeg')}>JPEG</Button>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={() => download('png')}>PNG</Button>
        </Grid>
      </Grid>
      <StyledImageContainer>
        <StyledImage src={imageSrc}/>
      </StyledImageContainer>
    </Box>
  );
};
