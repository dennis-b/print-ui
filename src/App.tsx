import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { EditorPage } from './pages/Editor/EditorPage';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { RecoilRoot } from 'recoil';
import { DownloadPage } from "./pages/DownloadPage/DownloadPage";
import { JobsPage } from "./pages/Jobs/JobsPage";

export const App = () => {


  return (
    <div>
      <RecoilRoot>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Report UI
            </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <Switch>
            <Route path="/jobs">
              <JobsPage/>
            </Route>
            <Route path="/editor">
              <EditorPage/>
            </Route>
            <Route path="/download">
              <DownloadPage/>
            </Route>
            <Route path="/">
              <HomePage/>
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </div>
  );
};

