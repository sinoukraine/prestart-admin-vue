import { createRouter, createWebHashHistory } from 'vue-router';
import Prestarts from './components/Prestarts.vue';
import Assets from './components/Assets.vue';
import Trips from './components/Trips.vue';
import Employees from './components/Employees.vue';
import Faults from './components/Faults.vue';
import Checklists from './components/Checklists.vue';
import Groups from './components/Groups.vue';
import Chat from './components/Chat.vue';
import NewChat from './components/NewChat.vue';
import Dialog from './components/Dialog.vue';
import Profile from './components/Profile.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/prestarts',
        name: 'prestarts',
        component: Prestarts,
    },
    {
        path: '/trips',
        name: 'trips',
        component: Trips,
    },
    {
        path: '/assets',
        name: 'assets',
        component: Assets,
    },
    {
        path: '/employees',
        name: 'employees',
        component: Employees,
    },
    {
        path: '/faults',
        name: 'faults',
        component: Faults,
    },
    {
        path: '/checklists',
        name: 'checklists',
        component: Checklists,
    },
    {
        path: '/groups',
        name: 'groups',
        component: Groups,
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
    },
    {
        path: '/new-chat',
        name: 'new-chat',
        component: NewChat,
    },
    {
        path: '/dialog',
        name: 'dialog',
        component: Dialog,
    },
    {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue'),
    },
    {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue'),
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue'),
    },
    {
        path: '/invalidstate',
        name: 'invalidstate',
        component: () => import('./components/InvalidStateDemo.vue'),
    },
    {
        path: '/button',
        name: 'button',
        component: () => import('./components/ButtonDemo.vue'),
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('./components/TableDemo.vue'),
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./components/ListDemo.vue'),
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('./components/TreeDemo.vue'),
    },
    {
        path: '/panel',
        name: 'panel',
        component: () => import('./components/PanelsDemo.vue'),
    },
    {
        path: '/overlay',
        name: 'overlay',
        component: () => import('./components/OverlayDemo.vue'),
    },
    {
        path: '/menu',
        component: () => import('./components/MenuDemo.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/menu/PersonalDemo.vue'),
            },
            {
                path: '/menu/seat',
                component: () => import('./components/menu/SeatDemo.vue'),
            },
            {
                path: '/menu/payment',
                component: () => import('./components/menu/PaymentDemo.vue'),
            },
            {
                path: '/menu/confirmation',
                component: () => import('./components/menu/ConfirmationDemo.vue'),
            },
        ],
    },
    {
        path: '/messages',
        name: 'messages',
        component: () => import('./components/MessagesDemo.vue'),
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('./components/FileDemo.vue'),
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('./components/ChartDemo.vue'),
    },
    {
        path: '/misc',
        name: 'misc',
        component: () => import('./components/MiscDemo.vue'),
    },
    {
        path: '/display',
        name: 'display',
        component: () => import('./utilities/DisplayDemo.vue'),
    },
    {
        path: '/flexbox',
        name: 'flexbox',
        component: () => import('./utilities/FlexBoxDemo.vue'),
    },
    {
        path: '/text',
        name: 'text',
        component: () => import('./utilities/TextDemo.vue'),
    },
    {
        path: '/icons',
        name: 'icons',
        component: () => import('./utilities/Icons.vue'),
    },
    {
        path: '/grid',
        name: 'grid',
        component: () => import('./utilities/GridDemo.vue'),
    },
    {
        path: '/spacing',
        name: 'spacing',
        component: () => import('./utilities/SpacingDemo.vue'),
    },
    {
        path: '/elevation',
        name: 'elevation',
        component: () => import('./utilities/ElevationDemo.vue'),
    },
    {
        path: '/typography',
        name: 'typography',
        component: () => import('./utilities/Typography.vue'),
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue'),
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('./pages/CalendarDemo.vue'),
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('./pages/TimelineDemo.vue'),
    },
    {
        path: '/empty',
        name: 'empty',
        component: () => import('./components/EmptyPage.vue'),
    },
    {
        path: '/documentation',
        name: 'documentation',
        component: () => import('./components/Documentation.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
