const navList = [
  {
    name: "Dashboard",
    href: "/",
    icon: <i className="bx bx-pie-chart-alt-2" />,
    children: [
      {
        name: "Product",
        href: "/product",
        icon: "fa-brands fa-elementor",
      },
      {
        name: "Sales",
        href: "/sales",
        icon: "fa-solid fa-person",
      },
      {
        name: "Banking",
        href: "/banking",
        icon: "fa-solid fa-building-columns",
      },
    ],
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: <i className="bx bxs-calendar" />,
    children: [],
  },
  {
    name: "Banking",
    href: "/banking",
    icon: <i className="bx bx-pie-chart-alt-2" />,
    children: [],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <i className="bx bx-cog" />,
    children: [],
  },
];

export { navList };
