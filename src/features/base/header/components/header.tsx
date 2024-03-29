import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Icon from "@utils/Icon";
import HeaderStyled from "./overrides/headerStyle";
import { Box, Fab, IconButton } from "@mui/material";
import { Menu } from "@features/menu";
import * as menu from "./config";
import router, { useRouter } from "next/router";
import useResponsive from "@hooks/useResponsive";
import { MobileDialog } from "@features/dialog";
import { useSelector } from "react-redux";
import { userSelector } from "@redux/userSlice";
import MenuPopover from "./menuPopover";

export default function BasicAppBar() {
  const { isAuthentic, user, authenticatedUser } = useSelector(userSelector);
  const navigate = useRouter();
  const [scrollY, setScrollY] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = (e) => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isDesktop = useResponsive("up", "md");
  return (
    <>
      {isDesktop && (
        <HeaderStyled
          position="fixed"
          className={scrollY > 200 ? "scrolled" : ""}
        >
          <Toolbar>
            <a href={"/"}>
              <img src="/static/icons/logo.svg" alt="logo" className="logo" />
            </a>

            <Box ml={"auto"}>
              <Menu menu={menu} />
            </Box>
            {/* {isAuthentic ? (
              <MenuPopover user={user} />
            ) : (
              authenticatedUser && <Fab
                onClick={() =>
                  !authenticatedUser && navigate.push("/auth/signin")
                }
                variant="extended"
                size="small"
                color="primary"
                className="btn-sign"
              >
                Welcome Test User
              </Fab>
            )} */}
          </Toolbar>
        </HeaderStyled>
      )}
      {!isDesktop && (
        <HeaderStyled
          position="fixed"
          className={scrollY > 200 ? "scrolled" : ""}
        >
          <Toolbar>
            <a href={"/"}>
              <img src="/static/icons/logo.svg" alt="logo" className="logo" />
            </a>{" "}
            <IconButton sx={{ ml: "auto" }} onClick={() => setOpen(true)}>
              <Icon path="humberg" className="humberg" />
            </IconButton>
          </Toolbar>
          <MobileDialog open={open} handleClose={() => setOpen(false)} />
        </HeaderStyled>
      )}
    </>
  );
}
