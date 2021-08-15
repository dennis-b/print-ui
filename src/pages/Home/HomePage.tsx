import React, { useEffect, useState } from 'react';
import { useFetch } from "use-http";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { validate, parse } from "fast-xml-parser";
import { AUTH } from "../../constants";
import { TemplateCard } from "./components/TemplateCard";
import { parseTemplateData } from "../../utils/xml.utils";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px'
  }
}));

export const HomePage = () => {

  const classes = useStyles();
  const [templates, setTemplates] = useState<any[]>([])
  const { post, response } = useFetch('https://admin.w2p-tools.com')

  useEffect(() => {
    initializeTemplates()
  }, [])

  async function initializeTemplates() {
    const formData = new FormData();
    formData.append("auth", AUTH);
    const data = await post('/api/listtemplatesdetails.php', formData)
    if (response.ok) {
      setTemplates(parseTemplateData(data))
    }
  }

  return (
    <Box m={1} width={'100%'} height={'100%s'} className={classes.content}>
      <Grid container spacing={1}>
        {
          templates?.map((template, index) => (
            <Grid container item xs={4} key={index}>
              <TemplateCard template={template}/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};