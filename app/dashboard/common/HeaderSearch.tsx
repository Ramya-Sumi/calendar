"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const mockData = [
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing.",
  ];

  const headingMockData = [
    "Junior Python Developer",
    "Junior Python Developer",
    "Senior Python Developer",
    "Senior Python Developer",
    "Mango",
    "Grapes",
  ];

  const combinedData = [...headingMockData, ...mockData];

  const filteredData = combinedData.filter((item) =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  const [anchorEl, setOneMenu] = React.useState<null | HTMLElement>(null);
  const [mobileMore, setMobileMore] =
    React.useState<null | HTMLElement>(null);

  const [notificationMenu, setNotification] = React.useState<null | HTMLElement>(null);

  const handleMenuTwoOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotification(event.currentTarget);
  };

  return (
    <>
      <Search
        onClick={handleOpen}
        className="ms-5 text-gray md:w-[400px]"
      >
        <StyledInputBase
          className="md:w-[400px]  headerSearchTop"
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
        <SearchIconWrapper className="end-3 top-0 pe-0 text-blue">
          <i className="fa fa-search"></i>
        </SearchIconWrapper>
      </Search>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="col-lg-7 col-12 modalHeader">
          <div className="d-flex justify-between align-items-center px-3 pb-2 pt-3">
            <h5 className="" id="simple-modal-title">
              Recent Search
            </h5>
            <Button
              onClick={handleClose}
              className="btn-blue py-[5px!important] px-0 w-[20px!important]"
              variant="contained"
            >
              <i className="fa fa-close" aria-hidden="true"></i>
            </Button>
          </div>
          <hr className="mt-0" />
          <div className="lg:flex px-3">
            <button
              className="btn btn-blue bg-[#DAEBFC!important] text-blue-500 btn-sm rounded-0 mr-3 mb-3"
              style={{ color: "blue" }}
            >
              Python Developer
            </button>

            <button className="btn btn-blue bg-[#9BC0E5!important] btn-sm rounded-0 mr-3 mb-3">
              Python Developer
            </button>

            <button className="btn btn-blue bg-[#5896D4!important] btn-sm rounded-0 mr-3 mb-3">
              Python Developer
            </button>

            <button className="btn btn-blue bg-[#2B78C6!important] btn-sm rounded-0 mr-3 mb-3">
              Python Developer
            </button>
          </div>
          <h5 className="px-3 pb-2" id="simple-modal-title">
            Suggestion
          </h5>
          <hr className="mt-0" />
          <div className="position-relative headerInput px-3 my-2">
            <TextField
              onChange={handleChange}
              variant="outlined"
              className="form-control border-1 rounded-2 shadow-sm"
              type="text"
              placeholder="Search your Data"
            />
          </div>

          <List className="overflow-y-scroll h-[300px]">
            {filteredData.map((item, index) => (
              <ListItem
                className="border px-3 py-1 d-inline-block TopDataList"
                key={index}
              >
                <ListItemText
                  className="col-lg-12 TopDataListHeading Poppins-Medium"
                  primary={item}
                />
                <ListItemText
                  className="col-lg-12 TopDataListSmall"
                  primary={item}
                />
              </ListItem>
            ))}
          </List>
          <Button
            onClick={handleClose}
            className="btn-blue m-3 px-4 py-1"
            variant="contained"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default HeaderSearch;
