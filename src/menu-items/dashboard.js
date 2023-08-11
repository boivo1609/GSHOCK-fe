// assets
import { DashboardOutlined } from '@ant-design/icons';
import { MdOutlineColorLens } from 'react-icons/md';
import { BsFillImageFill } from 'react-icons/bs';
import { IoMdListBox } from 'react-icons/io';
import { FaUserCheck } from 'react-icons/fa';
import { BsSmartwatch } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
// icons
const icons = {
  DashboardOutlined,
  MdOutlineColorLens,
  AiOutlineUnorderedList,
  BsSmartwatch,
  BsFillImageFill,
  IoMdListBox,
  FaUserCheck
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',

  type: 'group',
  children: [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   type: 'item',
    //   url: '/admin',
    //   icon: icons.DashboardOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'danhmuc',
      title: 'Quản lý Danh mục',
      type: 'item',
      url: '/admin/danhmuc',
      icon: icons.AiOutlineUnorderedList,
      breadcrumbs: true
    },
    {
      id: 'products',
      title: 'Quản lý Sản phẩm',
      type: 'item',
      url: '/admin/products-manager',
      icon: icons.BsSmartwatch,
      breadcrumbs: true
    },
    {
      id: 'color',
      title: 'Quản lý Màu sắc',
      type: 'item',
      url: '/admin/color',
      icon: icons.MdOutlineColorLens,
      breadcrumbs: true
    },
    {
      id: 'banner',
      title: 'Quản lý Banner',
      type: 'item',
      url: '/admin/banner',
      icon: icons.BsFillImageFill,
      breadcrumbs: true
    },
    {
      id: 'order',
      title: 'Quản lý Đơn Hàng',
      type: 'item',
      url: '/admin/order',
      icon: icons.IoMdListBox,
      breadcrumbs: true
    },
    {
      id: 'user',
      title: 'Quản lý Người dùng',
      type: 'item',
      url: '/admin/user',
      icon: icons.FaUserCheck,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
