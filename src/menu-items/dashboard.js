// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',

  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'danhmuc',
      title: 'Quản lý danh mục',
      type: 'item',
      url: '/admin/danhmuc',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'products',
      title: 'Quản lý sản phẩm',
      type: 'item',
      url: '/admin/products-manager',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'color',
      title: 'Quản lý màu sắc',
      type: 'item',
      url: '/admin/color',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'banner',
      title: 'Quản lý Banner',
      type: 'item',
      url: '/admin/banner',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'order',
      title: 'Quản lý Đơn Đặt Hàng',
      type: 'item',
      url: '/admin/order',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
