import { HomePage, Subpage, JobSearchPage, LoginPage, MatchingJobsPage, JobSearchDetailPage } from '../pages';
import route from '../constants/route';
import { ContentOnlyLayout } from '../layouts';

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
    {
        path: route.JOB_SEARCH_DETAIL,
        component: JobSearchDetailPage,
        isPrivate: false,
        restricted: false,
        positionHeader: 'relative',
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
