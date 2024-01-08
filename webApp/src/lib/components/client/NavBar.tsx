"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  SwipeableDrawer,
} from "@mui/material";
import { NavBarItem } from "@types";
import { useState } from "react";

export default function NavBar({ items, userName }: { items: NavBarItem[], userName: string }) {
  const [drawerOpen, setDrawOpen] = useState<boolean>(false);

  
  const makeItems = (sideDrawer?: boolean) => {

    return items.map((item) => (
      <Button
        key={item.page}
        sx={{ m: 2, color: (sideDrawer ? "inherit" : "white"), display: "block" }}
        href={item.href}
      >
        {item.page}
      </Button>
    ));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          sx={{ color: "white", display: { xs: "block", md: "none" } }}
          onClick={() => setDrawOpen(true)}
        >
          Menu
        </Button>

        <SwipeableDrawer
          sx={{ display: { xs: "block", md: "none" } }}
          anchor="left"
          open={drawerOpen}
          onOpen={() => setDrawOpen(true)}
          onClose={() => setDrawOpen(false)}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              m: 2,
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {userName}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column"}}>{makeItems(true)}</Box>
        </SwipeableDrawer>



        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {userName}
          </Typography>
          <Box sx={{ display: "flex" }}>{makeItems()}</Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
