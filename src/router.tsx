import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ROUTER_URL } from '@shared/constants/url';
import Loading from '@shared/components/Loading';

// 코드 스플리팅: 페이지 컴포넌트를 lazy load
const Home = lazy(() => import('@pages/home/Home'));
const About = lazy(() => import('@pages/about/About'));
const Project = lazy(() => import('@pages/project/Project'));
const ProjectDetail = lazy(() => import('@pages/project/ProjectDetail'));
const Apply = lazy(() => import('@pages/apply/Apply'));
// const Activity = lazy(() => import('@pages/activity/Activity'));
const WebFounders = lazy(() => import('@pages/webFounders/WebFounders'));

const router = createBrowserRouter([
  {
    path: ROUTER_URL.HOME,
    element: <App />,
    children: [
      {
        path: ROUTER_URL.HOME,
        element: (
          <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ROUTER_URL.ABOUT,
        element: (
          <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: ROUTER_URL.PROJECT,
        element: (
          <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
            <Project />
          </Suspense>
        ),
      },
      {
        path: ROUTER_URL.PROJECT_DETAIL,
        element: (
          <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
            <ProjectDetail />
          </Suspense>
        ),
      },
      {
        path: ROUTER_URL.APPLY,
        element: (
          <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
            <Apply />
          </Suspense>
        ),
      },
      //   {
      //     path: ROUTER_URL.ACTIVITY,
      //     element: (
      //       <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
      //         <Activity />
      //       </Suspense>
      //     ),
      //   },
      {
        path: ROUTER_URL.WEBFOUNDERS,
        element: (
          <Suspense fallback={<Loading text="페이지 불러오는 중" />}>
            <WebFounders />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
