import React, { useState } from "react";
import "./Layout.css";

//For images
import logoHeader from "../assets/logoHeader.jpg";
import { Link, Outlet } from "react-router-dom";

//Materila UI Drawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Layout = () => {
  const [burger_class, setBurgerClass] = useState("burger_bar unclicked");
  const [menu_class, setMenuClass] = useState("links_hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function changeMenu() {
    if (!isMenuClicked) {
      setBurgerClass("clicked");
      setMenuClass("links_visible");
    } else {
      setBurgerClass("unclicked");
      setMenuClass("links_hidden");
    }

    setIsMenuClicked(!isMenuClicked);
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"

      // className="sm:hidden md:block"
    >
      <div className="menu_mobile_size">
        <nav
          className={` sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-4 mt-[40px] second_block_header md:hidden`}
        >
          <Link
            to={`/`}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <img src={logoHeader} className="w-[160px] outline-none" alt="" />
          </Link>
          <Link
            to={`/categories`}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <button className="p-[5px_30px] rounded-[4px] bg-[#edecec] outline-none text-[#000] text-[18px] hover:bg-[#dfdede] duration-300">
              Категории
            </button>
          </Link>
          <Link
            to={`/services`}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <button className="p-[5px_30px] rounded-[4px] bg-[#edecec] outline-none text-[#000] text-[18px] hover:bg-[#dfdede] duration-300">
              Сервисы
            </button>
          </Link>
          <Link
            to={`/hospitals`}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <button className="p-[5px_30px] rounded-[4px] bg-[#edecec] outline-none text-[#000] text-[18px] hover:bg-[#dfdede] duration-300">
              Клиники
            </button>
          </Link>
          {/* <Link to={`/profile`}>
              <button className="p-[5px_30px] rounded-[4px] bg-[#000] outline-none text-[#edecec] text-[18px] hover:bg-[#333131] duration-300">
                Профиль
              </button>
            </Link> */}
        </nav>
      </div>
    </Box>
  );

  return (
    <>
      <div className="layout">
        <header className="header flex justify-between items-center pr-[50px] max-w-[1440px] m-[0_auto]">
          <div className="block_1_header">
            <Link to={`/`}>
              <img src={logoHeader} className="w-[160px] outline-none" alt="" />
            </Link>
          </div>
          <nav className="block_2_header md:flex md:items-center md:gap-3 sm:hidden">
            <Link to={`/categories`}>
              <button className="p-[5px_30px] rounded-[4px] bg-[#edecec] outline-none text-[#000] text-[18px] hover:bg-[#dfdede] duration-300">
                Категории
              </button>
            </Link>
            <Link to={`/services`}>
              <button className="p-[5px_30px] rounded-[4px] bg-[#edecec] outline-none text-[#000] text-[18px] hover:bg-[#dfdede] duration-300">
                Сервисы
              </button>
            </Link>
            <Link to={`/hospitals`}>
              <button className="p-[5px_30px] rounded-[4px] bg-[#edecec] outline-none text-[#000] text-[18px] hover:bg-[#dfdede] duration-300">
                Клиники
              </button>
            </Link>
            {/* <Link to={`/profile`}>
              <button className="p-[5px_30px] rounded-[4px] bg-[#000] outline-none text-[#edecec] text-[18px] hover:bg-[#333131] duration-300">
                Профиль
              </button>
            </Link> */}
          </nav>

          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <div className="btn_menu_for_mobile_size sm:block md:hidden">
                <div
                  className="burger_menu cursor-pointer"
                  onClick={toggleDrawer(anchor, true)}
                >
                  <div className={`${burger_class} cols bg-[#333333]`}></div>
                  <div className={`${burger_class} cols bg-[#333333]`}></div>
                  <div className={`${burger_class} cols bg-[#333333]`}></div>
                </div>
              </div>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </header>

        <Outlet />
        <footer className="footer bg-[#e1e0e0] min-h-[80px]  flex justify-center items-center mt-[10px]">
          <div className="footer_block max-w-[1440px] m-[0_auto]">
            <h1 className="text-[27px] font-[500]">(C) Hospital TJ</h1>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
