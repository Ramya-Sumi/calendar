"use client";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { usePathname } from "next/navigation";
import "./style.css";
import { P_M_TODO_0 } from "@/constants/ROUTES";

const SideMenu = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const pathname = usePathname();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // mobile size code start
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <div className="p-3">
        <img src="image/logo.png" />
      </div>
      <Accordion className="LargeDrawer" onClick={(e) => e.stopPropagation()}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography className="sideMenuIcons">
            <img src="image/help.png" alt="" />
            <span>Deshboard</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className="LargeDrawer" onClick={(e) => e.stopPropagation()}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography className="sideMenuIcons">
            <img src="image/help.png" alt="" />
            <span>Deshboard</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
  // mobile size code end

  return (
    <div>
      {/* laptop size code start */}
      <ul className="d-none d-lg-block deshboard_Menu shadow">
        <li className="ListSideMEnu">
          <Link prefetch href="/" className={pathname === "/" ? "active" : ""}>
            <img src="image/menuData.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link
                prefetch
                className={pathname === "/" ? "active" : ""}
                href="/"
              >
                Dashboard
              </Link>
            </li>

            <li className="subSideMenu">
              <Link prefetch href="#">
                Project Manager
              </Link>
            </li>

            <li className="subSideMenu">
              <Link prefetch href="/InterviewStatusForm1">
                Today Interviews
              </Link>
            </li>
          </ul>
        </li>
        <li className="ListSideMEnu">
          <Link prefetch href="#">
            <img src="image/noteIcon.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link prefetch href="/P_M_JobDescriptions1">
                Job Descriptions
              </Link>
            </li>

            <li className="subSideMenu">
              <Link prefetch href="/P_M_RequestStatus1">
                TL Requests
              </Link>
            </li>
          </ul>
        </li>

        <li className="ListSideMEnu">
          <img src="image/menuSElect.png" alt="" />
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link prefetch href={P_M_TODO_0}>
                Calendar
              </Link>
            </li>

            <li className="subSideMenu">
              <Link prefetch href="/P_M_Messages">
                Messages
              </Link>
            </li>

            <li className="subSideMenu">
              <Link prefetch className="" href="/P_M_Notifications">
                Notifications
              </Link>
            </li>
          </ul>
        </li>

        <li className="ListSideMEnu">
          <img src="image/user1.png" alt="" />
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link prefetch href="/JobApplication0">
                Total Applications
              </Link>
            </li>

            <li className="subSideMenu">
              <Link prefetch href="/HiredJobApplications">
                Hired Applications
              </Link>
            </li>
          </ul>
        </li>

        <li className="ListSideMEnu">
          <Link
            prefetch
            href="/TotalEmployee0"
            className={pathname === "/TotalEmployee0" ? "active" : ""}
          >
            <img src="image/Vector.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link
                prefetch
                href="/TotalEmployee0"
                className={pathname === "/TotalEmployee0" ? "active" : ""}
              >
                Employee’s
              </Link>
            </li>
          </ul>
        </li>

        <li className="ListSideMEnu">
          <Link
            prefetch
            href="/PostedJobs5"
            className={pathname === "/PostedJobs5" ? "active" : ""}
          >
            <img src="image/shoping.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link
                prefetch
                href="/PostedJobs5"
                className={pathname === "/PostedJobs5" ? "active" : ""}
              >
                Posted Jobs
              </Link>
            </li>
          </ul>
        </li>

        <li className="ListSideMEnu">
          <Link
            prefetch
            href="/CandidatesStatus0"
            className={pathname === "/CandidatesStatus0" ? "active" : ""}
          >
            <img src="image/Frame.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link
                prefetch
                href="/CandidatesStatus0"
                className={pathname === "/CandidatesStatus0" ? "active" : ""}
              >
                Candidate Status
              </Link>
            </li>
          </ul>
        </li>
        <li className="ListSideMEnu">
          <Link
            prefetch
            href="/HelpDeskSupport1"
            className={pathname === "/HelpDeskSupport1" ? "active" : ""}
          >
            <img src="image/help.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link
                prefetch
                href="/HelpDeskSupport1"
                className={pathname === "/HelpDeskSupport1" ? "active" : ""}
              >
                Help Desk
              </Link>
            </li>
          </ul>
        </li>

        <li className="ListSideMEnu">
          <Link
            prefetch
            href="/P_M_Settings0"
            className={pathname === "/P_M_Settings0" ? "active" : ""}
          >
            <img src="image/filter.png" alt="" />
          </Link>
          <ul className="subMainSideMenu">
            <li className="subSideMenu">
              <Link
                prefetch
                href="/P_M_Settings0"
                className={pathname === "/P_M_Settings0" ? "active" : ""}
              >
                Setting
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* mobile size code start */}
      <div className="d-lg-none">
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </div>
  );
};

export default SideMenu;
