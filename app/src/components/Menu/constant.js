import {
  CalculatorOutlined,
  TeamOutlined,
  LeftCircleOutlined,
  UserOutlined,
  RedoOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const MenuItem = [
  { name: "User", icon: <UserOutlined /> },
  { name: "Product", icon: <CalculatorOutlined /> },
  { name: "Organization", icon: <TeamOutlined /> },
  { name: "Forms", icon: <FileDoneOutlined /> },
];
const MobileMenu = [
  { name: "Profile", icon: <UserOutlined /> },
  { name: "Change Password", icon: <RedoOutlined /> },
  { name: "Log-out", icon: <LeftCircleOutlined /> },
];
export { MenuItem, MobileMenu };
