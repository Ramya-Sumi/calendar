"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";


import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MailOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { toggleTheme } from "@/store/reducers/theme";
import { dashboardSelector, userLogout, getNotifications } from "@/store/reducers/dashboard";
import { HOME, INTERVIEW_STATUS_FORM_1, P_M_MESSAGES, P_M_NOTIFICATIONS, P_M_PROFILE, P_M_REQUEST_STATUS_1 } from "@/constants/ROUTES";

const HeaderSearch = dynamic(() => import("./HeaderSearch"));

// import { toggleTheme } from '../../../store/actions/themeActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store/reducers';

function HeadersTop() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(dashboardSelector)
  // const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])
  const handleLogout = async () => {
    let data = {
      "refresh_token": dashboardData?.login?.refresh_token
    }
    if (dashboardData?.login.refresh_token) {
      await dispatch(userLogout(data))
    } else {
      console.warn('else')
    }
  }

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  // modal end code
  const [profileMenu, setProfileMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [mobileMore, setMobileMore] = React.useState<null | HTMLElement>(null);

  const [notificationMenu, setNotification] =
    React.useState<null | HTMLElement>(null);
  const [messagesMenu, setMessages] = React.useState<null | HTMLElement>(null);

  const handleNotification = (event: React.MouseEvent<HTMLElement>) => {
    setNotification(event.currentTarget);
  };
  const handleMessages = (event: React.MouseEvent<HTMLElement>) => {
    setMessages(event.currentTarget);
  };

  const isprofileMenu = Boolean(profileMenu);
  const isNotificationMenu = Boolean(notificationMenu);
  const isMessagesMenu = Boolean(messagesMenu);
  const isMobileMenuOpen = Boolean(mobileMore);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenu(event.currentTarget);
  };

  const handleMobileOneMenuClose = () => {
    setMobileMore(null);
  };

  const handleOneMenuClose = () => {
    setProfileMenu(null);
    handleMobileOneMenuClose();
  };

  const handleMenuTwoClose = () => {
    setNotification(null);
    handleMobileOneMenuClose();
  };

  const handleChatMenuClose = () => {
    setMessages(null);
    handleMobileOneMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMore(event.currentTarget);
  };

  const profileMenuId = "primary-search-account-menu";
  const notificationMenuId = "primary-search-account-menu";
  const chatMenuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      className="headerDropdwon"
      anchorEl={profileMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isprofileMenu}
      onClose={handleOneMenuClose}
    >
      <MenuItem onClick={handleMenuTwoClose}>
        <Link prefetch className="text-[14px]" href={P_M_PROFILE}>
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuTwoClose}>
        <Link className="text-[14px]" href="#" onClick={handleLogout}>
          Sign Out
        </Link>
      </MenuItem>

      <MenuItem onClick={handleMenuTwoClose}>
        <Link prefetch className="text-[14px]" href={P_M_REQUEST_STATUS_1}>
          P_M_RequestStatus1...
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuTwoClose}>
        <Link prefetch className="text-[14px]" href={INTERVIEW_STATUS_FORM_1}>
          InterviewStatusForm1...
        </Link>
      </MenuItem>
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      className="headerDropdwon"
      anchorEl={notificationMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationMenu}
      onClose={handleMenuTwoClose}
    >
      <MenuItem className="w-auto" onClick={handleOneMenuClose}>
        <div>
          <h5 className="text-center">Notifications</h5>
          <p className="text-center text-[10px]">
            You have Received in 20 notifications
          </p>
          <hr className="my-1" />
          <Link href={P_M_NOTIFICATIONS} prefetch>
            <div className="notification_Menu">
              <div className="row mx-0 py-2 mb-2 border-bottom align-items-center">
                <div className="col-lg-3 col-3 ps-2 pe-0">
                  <img
                    className="w-[35px] rounded-full h-[35px]"
                    src="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_female_icon_192701.png"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 pe-0 ps-1 col-6">
                  <h6 className="text-[10px]">Johan</h6>
                  <p className="text-[9px] line-clamp-1">
                    Hi, Hanif, What......
                  </p>
                </div>
                <div className="col-lg-3 col-3 pe-2 ps-0 text-end">
                  <p className="text-[10px]">2.00 A.M</p>
                  <div className="px-2 py-1 rounded bg-blue d-inline-block">
                    <h6 className="text-[8px] text-white">2</h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href={P_M_NOTIFICATIONS} prefetch>
            <div className="notification_Menu">
              <div className="row mx-0 py-2 mb-2 border-bottom align-items-center">
                <div className="col-lg-3 col-3 ps-2 pe-0">
                  <img
                    className="w-[35px] rounded-full h-[35px]"
                    src="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_female_icon_192701.png"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 pe-0 ps-1 col-6">
                  <h6 className="text-[10px]">Johan</h6>
                  <p className="text-[9px] line-clamp-1">
                    Hi, Angela, What......
                  </p>
                </div>
                <div className="col-lg-3 col-3 pe-2 ps-0 text-end">
                  <p className="text-[10px]">2.00 A.M</p>
                  <div className=" px-2 py-1 rounded bg-blue d-inline-block">
                    <h6 className="text-[8px] text-white">2</h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </MenuItem>
    </Menu>
  );

  const render_ChatsMenu = (
    <Menu
      className="headerDropdwon"
      anchorEl={messagesMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={chatMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMessagesMenu}
      onClose={handleChatMenuClose}
    >
      <MenuItem className="w-auto" onClick={handleChatMenuClose}>
        <div>
          <h5 className="text-center">Chats</h5>
          <p className="text-center text-[10px]">
            You have Received in 17 notifications
          </p>
          <hr className="my-1" />
          <Link href={P_M_MESSAGES} prefetch>
            <div className="notification_Menu">
              <div className="row mx-0 py-2 mb-2 border-bottom align-items-center">
                <div className="col-lg-3 col-3 ps-2 pe-0">
                  <img
                    className="w-[35px] rounded-full h-[35px]"
                    src="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_female_icon_192701.png"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 pe-0 ps-1 col-6">
                  <h6 className="text-[10px]">Johan</h6>
                  <p className="text-[9px] line-clamp-1">
                    Hi, Hanif, What......
                  </p>
                </div>
                <div className="col-lg-3 col-3 pe-2 ps-0 text-end">
                  <p className="text-[10px]">2.00 A.M</p>
                  <div className="px-2 py-1 rounded bg-blue d-inline-block">
                    <h6 className="text-[8px] text-white">2</h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href={P_M_MESSAGES} prefetch>
            <div className="notification_Menu">
              <div className="row mx-0 py-2 mb-2 border-bottom align-items-center">
                <div className="col-lg-3 col-3 ps-2 pe-0">
                  <img
                    className="w-[35px] rounded-full h-[35px]"
                    src="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_female_icon_192701.png"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 pe-0 ps-1 col-6">
                  <h6 className="text-[10px]">Johan</h6>
                  <p className="text-[9px] line-clamp-1">
                    Hi, Angela, What......
                  </p>
                </div>
                <div className="col-lg-3 col-3 pe-2 ps-0 text-end">
                  <p className="text-[10px]">2.00 A.M</p>
                  <div className=" px-2 py-1 rounded bg-blue d-inline-block">
                    <h6 className="text-[8px] text-white">2</h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      className="headerDropdwon mobileMenu"
      anchorEl={mobileMore}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileOneMenuClose}
    >
      <MenuItem>
        <Link href={P_M_MESSAGES} prefetch>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LightModeOutlinedIcon className="w-[30px] text-[20px] me-1" />
            <p className="text-[12px]">Dark</p>
          </IconButton>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link href={P_M_MESSAGES} prefetch>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon className="w-[30px] text-[20px] me-1" />
            </Badge>
            <p className="text-[12px]">Messages</p>
          </IconButton>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMessages}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon className="w-[30px] text-[20px] me-1" />
          </Badge>
          <p className="text-[12px]">Notifications</p>
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <SettingsOutlinedIcon className="w-[30px] text-[20px] me-1" />
          <p className="text-[12px]">Setting</p>
        </IconButton>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle className="w-[30px] text-[20px] me-1" />
          <p className="text-[12px]">Profile</p>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box className="navbarTop bg-primaryOne" sx={{ flexGrow: 1 }}>
        <AppBar top={0} position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "block", sm: "block" } }}
            >
              <Link href={HOME} prefetch>
                {" "}
                <img className="logo-top" src="image/logo.png" alt="Logo" />
              </Link>
            </Typography>

            <HeaderSearch />

            <Box sx={{ flexGrow: 1 }} />
            <Box
              className="headerTopIcon"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                className="mx-lg-3"
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleThemeToggle}
              >
                <LightModeOutlinedIcon />
              </IconButton>
              <IconButton
                className="mx-lg-3"
                size="large"
                edge="end"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleMessages}
                aria-controls={chatMenuId}
                aria-haspopup="true"
              >
                <Link prefetch href="#">
                  <Badge badgeContent={17} color="error">
                    <MailOutlinedIcon />
                  </Badge>
                </Link>
              </IconButton>

              <IconButton
                className="mx-lg-3"
                size="large"
                edge="end"
                aria-label="show 17 new notifications"
                aria-controls={notificationMenuId}
                aria-haspopup="true"
                onClick={handleNotification}
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton className="mx-lg-3" size="large" edge="end">
                <SettingsOutlinedIcon />
              </IconButton>

              <IconButton
                className="mx-lg-3"
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={profileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderProfileMenu}
        {renderNotificationsMenu}
        {render_ChatsMenu}
      </Box>
    </>
  );
}

export default HeadersTop;
