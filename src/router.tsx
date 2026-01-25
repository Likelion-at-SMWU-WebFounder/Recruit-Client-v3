import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ROUTER_URL } from '@shared/constants/url';

import Home from '@pages/home/Home';
import About from '@pages/about/About';
import Project from '@pages/project/Project';
import ProjectDetail from '@pages/project/ProjectDetail';
import Apply from '@pages/apply/Apply';
import Application from '@pages/application/Application';
// import Activity from '@pages/activity/Activity';
import WebFounders from '@pages/webFounders/WebFounders';
import NotFound from '@pages/notFound/NotFound';
import Notify from '@pages/apply/Notify';
import ResultCheck from '@pages/apply/ResultCheck';
import Result from '@/pages/apply/Result';

const router = createBrowserRouter([
  {
    path: ROUTER_URL.HOME,
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTER_URL.ABOUT, element: <About /> },
      { path: ROUTER_URL.PROJECT, element: <Project /> },
      { path: ROUTER_URL.PROJECT_DETAIL, element: <ProjectDetail /> },
      { path: ROUTER_URL.APPLY, element: <Apply /> },
      { path: ROUTER_URL.NOTIFY, element: <Notify /> },
      { path: ROUTER_URL.CHECK_DOCUMENT, element: <ResultCheck /> },
      { path: ROUTER_URL.CHECK_FINAL, element: <ResultCheck /> },
      { path: ROUTER_URL.RESULT_DOCUMENT, element: <Result /> },
      { path: ROUTER_URL.RESULT_FINAL, element: <Result /> },
      { path: ROUTER_URL.APPLICATION, element: <Application /> },
      // { path: ROUTER_URL.ACTIVITY, element: <Activity /> },
      { path: ROUTER_URL.WEBFOUNDERS, element: <WebFounders /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
