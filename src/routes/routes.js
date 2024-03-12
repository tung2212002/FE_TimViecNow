import { HomePage, Subpage, JobSearchPage, LoginPage, MatchingJobsPage } from '../pages';
import route from '../constants/route';
import { ContentOnlyLayout } from '../layouts';

// export const routes = {
//     home: '/',
//     subpage: '/subpage',
//     cvManagement: '/quan-ly-cv',
//     company: '/cong-ty',
//     jobSearch: '/viec-lam',
//     matchingJobs: '/viec-lam-phu-hop',
//     login: '/login',
//     // notfound : '*',
// };

export const publicRoutes = [
    {
        path: route.HOMEPAGE,
        component: HomePage,
        isPrivate: false,
        restricted: false,
    },
    {
        path: route.JOB_SEARCH,
        component: JobSearchPage,
        isPrivate: false,
        restricted: false,
    },
    {
        path: route.SUBPAGE,
        component: Subpage,
        isPrivate: false,
        restricted: true,
    },
    {
        path: route.LOGIN,
        component: LoginPage,
        isPrivate: false,
        restricted: true,
        layout: ContentOnlyLayout,
    },
    {
        path: route.REGISTER,
        component: LoginPage,
        isPrivate: false,
        restricted: true,
        layout: ContentOnlyLayout,
    },
    // { path: routes.notfound, component: NotFound},
];

export const privateRoutes = [
    {
        path: route.MATCHING_JOBS,
        component: MatchingJobsPage,
        isPrivate: true,
        restricted: true,
    },
    // { path: routes.notfound, component: NotFound},
];
