import {
  chat,
  chatgray,
  contact,
  contactgray,
  phonegray,
  phone,
  power,
  powergray,
  settings,
  settingsgray,
  bell,
  bellgray,
} from "components/Images";

const menuIcon = [
  { name: "Chat", top: true, src: chat, srcgray: chatgray, link: "/home" },
  {
    name: "Call",
    top: true,
    src: phone,
    srcgray: phonegray,
    link: "/call",
  },
  {
    name: "Contact",
    top: true,
    src: contact,
    srcgray: contactgray,
    link: "/",
  },
  {
    name: "Notification",
    top: true,
    src: bell,
    srcgray: bellgray,
    link: "/notification",
  },
  {
    name: "Log-out",
    top: false,
    src: power,
    srcgray: powergray,
    link: "/power",
  },
  {
    name: "Change-password",
    top: false,
    src: settings,
    srcgray: settingsgray,
    link: "/change-password",
  },
];
const MenuConstant = {
  yes: "Yes",
  danger: "danger",
  no: "No",
  header: "Log-out",
  deleteMessage: "Are you sure you want to log-out?",
  title: "Notifications",
  btnText: "Remove all",
  nomsg: "No new notification",
};
export { menuIcon, MenuConstant };
