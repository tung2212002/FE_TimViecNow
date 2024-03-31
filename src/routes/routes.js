import {
    HomePage,
    Subpage,
    JobSearchPage,
    LoginPage,
    MatchingJobsPage,
    JobSearchDetailPage,
    ManagerRegisterPage,
    ManagerLoginPage,
    DashboardAdminPage,
} from '../pages';
import route from '../constants/route';
import { ContentOnlyLayout, DashboardLayout } from '../layouts';
import {
    DashboardCardPage,
    DashboardSearchCVPage,
    DashboardPostPage,
    DashboardInvoicePage,
    DashboardPostCampaignPage,
    DashboardPostJobPage,
} from '../pages/DashboardAdminPage';

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
    {
        path: route.MANAGER_REGISTER,
        component: ManagerRegisterPage,
        isPrivate: false,
        restricted: true,
        layout: ContentOnlyLayout,
    },
    {
        path: route.MANAGER_LOGIN,
        component: ManagerLoginPage,
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
    {
        path: route.DASHBOARD_ADMIN,
        component: DashboardAdminPage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    {
        path: route.DASHBOARD_POST,
        component: DashboardPostPage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    {
        path: route.DASHBOARD_SEARCH,
        component: DashboardSearchCVPage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    {
        path: route.DASHBOARD_CART,
        component: DashboardCardPage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    {
        path: route.DASHBOARD_INVOICE,
        component: DashboardInvoicePage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    {
        path: route.DASHBOARD_POST_CAMPAIGN,
        component: DashboardPostCampaignPage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    {
        path: route.DASHBOARD_POST_JOB,
        component: DashboardPostJobPage,
        isPrivate: true,
        restricted: true,
        layout: DashboardLayout,
    },
    // { path: routes.notfound, component: NotFound},
];
