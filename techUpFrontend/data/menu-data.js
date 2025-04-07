export const menu_data = [
  {
    id:1,
    link:'/shop',
    title:'제품',
  },
  {
    id:2,
    link:'/coupons',
    title:'쿠폰/이벤트',
  },
  {
    id:3,
    link:'/blog',
    title:'커뮤니티',
    /*
    drop_down:true,
    dropdown_menus:[
      {title:'Blog Standard',link:'/blog'},
      {title:'Blog Grid',link:'/blog-grid'},
      {title:'Blog List',link:'/blog-list'},
      {title:'Blog Details Full Width',link:'/blog-details-2'},
      {title:'Blog Details',link:'/blog-details'},
    ]
    */
  },
  {
    id:5,
    link:'/contact',
    title:'고객지원',
  },
]

// mobile menu data 
const mobile_menu = [
  {
    id: 1,
    homes: true,
    title: 'Home',
    link: '/',
    home_pages: [
      {
        id:1,
        title:'Electronics',
        img:'/img/menu/menu-home-1.jpg',
        link:'/'
      },
      {
        id:2,
        title:'Fashion',
        img:'/img/menu/menu-home-2.jpg',
        link:'/home-2'
      },
      {
        id:3,
        title:'Beauty',
        img:'/img/menu/menu-home-3.jpg',
        link:'/home-3'
      },
      {
        id:4,
        title:'Electronics',
        img:'/img/menu/menu-home-4.jpg',
        link:'/home-4'
      }
    ]
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Products',
    link: '/shop',
    sub_menus: [
      { title: 'Shop', link: '/shop' },
      { title: 'Shop Full Width', link: '/shop-full-width' },
      { title: 'shop-1600', link: '/shop-1600' },
      { title: 'Shop Right Sidebar', link: '/shop-right-sidebar' },
      { title: 'Shop No Sidebar', link: '/shop-no-sidebar' },
      { title: 'Shop Filter Dropdown', link: '/shop-filter-dropdown' },
      { title: 'Shop Filter Offcanvas', link: '/shop-filter-offcanvas' },
      { title: 'Shop List', link: '/shop-list' },
      { title: 'Only Categories', link: '/shop-categories' },
    ],
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Products Details',
    link: '/product-details',
    sub_menus: [
      { title: 'Product Details', link: '/product-details'},
      { title: 'With Video', link: '/product-details-video'},
      { title: 'With Countdown', link: '/product-details-countdown'},
      { title: 'Variations Swatches', link: '/product-details-swatches'},
      { title: 'Details List', link: '/product-details-list'},
      { title: 'Details Gallery', link: '/product-details-gallery'},
      { title: 'Details Slider', link: '/product-details-slider'},
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'eCommerce',
    link: '/cart',
    sub_menus: [
      { title: 'Shopping Cart', link: '/cart' },
      { title: 'Compare', link: '/compare' },
      { title: 'Wishlist', link: '/wishlist' },
      { title: 'Checkout', link: '/checkout' },
      { title: 'My account', link: '/profile' },
    ],
  },
  {
    id: 5,
    sub_menu: true,
    title: 'More Pages',
    link: '/login',
    sub_menus: [
      { title: 'Login', link: '/login' },
      { title: 'Register', link: '/register' },
      { title: 'Forgot Password', link: '/forgot' },
      { title: '404 Error', link: '/404' },
    ],
  },
  {
    id: 6,
    single_link: true,
    title: 'Coupons',
    link: '/coupons',
  },
  {
    id: 7,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
    sub_menus: [
      { title: 'Blog Standard', link: '/blog' },
      { title: 'Blog Grid', link: '/blog-grid' },
      { title: 'Blog List', link: '/blog-list' },
      { title: 'Blog Details', link: '/blog-details' },
      { title: 'Blog Details Full Width', link: '/blog-details-2' },
    ]
  },
  {
    id: 8,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
]