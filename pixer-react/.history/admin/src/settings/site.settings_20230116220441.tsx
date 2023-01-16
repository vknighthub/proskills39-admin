import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { Routes } from '@/config/routes';
import * as RiIcons from 'react-icons/ri';

export const siteSettings = {
  name: 'ProSkills39',
  description: '',
  logo: {
    url: '/logo.png',
    alt: 'ProSkills39',
    href: '/',
    width: 148,
    height: 60,
  },
  defaultLanguage: 'en',
  author: {
    name: 'vKnightHub, Inc.',
    websiteUrl: 'https://vknight.io',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: Routes.dashboard,
        label: 'sidebar-nav-item-dashboard',
        icon: 'HomeIcon',
      },
      {
        href: Routes.user.list,
        label: 'authorized-nav-item-profile',
        icon: 'UsersIcon',
      },
      {
        href: Routes.question.list,
        label: 'sidebar-nav-item-message',
        icon: 'TasksAltIcon',
      },
      {
        href: Routes.shop.list,
        label: 'sidebar-nav-item-project',
        icon: 'UniversityIcon',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            title: 'Users',
            path: '/overview/users',
          },
          {
            title: 'Revenue',
            path: '/overview/revenue',
          },
        ],
      },
      {
        href: Routes.product.list,
        label: 'sidebar-nav-item-services',
        icon: 'ThumbtackIcon',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            title: 'Users',
            path: '/overview/users',
          },
          {
            title: 'Revenue',
            path: '/overview/revenue',
          },
        ],
      },
      {
        href: Routes.adminMyShops,
        label: 'text-wallet',
        icon: 'SaveIcon',
      },
      {
        href: Routes.type.list,
        label: 'sidebar-nav-item-services-whitelist',
        icon: 'UserCheckIcon',
      },
      {
        href: Routes.order.list,
        label: 'sidebar-nav-item-following-sellers',
        icon: 'UserCheckIcon',
      },
      {
        href: Routes.category.list,
        label: 'sidebar-nav-item-disputes',
        icon: 'ShieldAltIcon',
      },
      {
        href: Routes.tag.list,
        label: 'sidebar-nav-item-verification',
        icon: 'CircleCheckIcon',
      },

      {
        href: Routes.orderStatus.list,
        label: 'auth-menu-logout',
        icon: 'SignOutIcon',
      },
    ],
    shop: [
      {
        href: (shop: string) => `${Routes.dashboard}${shop}`,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.product.list}`,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.order.list}`,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.staff.list}`,
        label: 'sidebar-nav-item-staffs',
        icon: 'UsersIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.withdraw.list}`,
        label: 'sidebar-nav-item-withdraws',
        icon: 'AttributeIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.reviews.list}`,
        label: 'sidebar-nav-item-reviews',
        icon: 'ReviewIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${Routes.question.list}`,
        label: 'sidebar-nav-item-questions',
        icon: 'QuestionIcon',
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};
