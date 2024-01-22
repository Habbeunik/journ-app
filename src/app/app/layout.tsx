"use client";

import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchOffRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Input,
  ListSubheader,
  ListDivider,
} from "@mui/joy";
import Toggler from "@/components/Toggler";
import { ReactNode } from "react";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        p: 2,
        gap: 2,
        bgcolor: "background.surface",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gridColumn: "1 / -1",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <IconButton
            size="md"
            variant="outlined"
            color="neutral"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              borderRadius: "50%",
            }}
          >
            <NotesRoundedIcon />
          </IconButton>
          <Typography level="h4">Journ App.</Typography>
        </Stack>
        <Avatar
          src="https://i.pravatar.cc/40?img=2"
          srcSet="https://i.pravatar.cc/80?img=2"
          sx={{ maxWidth: "32px", maxHeight: "32px" }}
        />
      </Box>
    </Box>
  );
}

const Entry = (
  <ListItem nested>
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <AssignmentRoundedIcon />
          <ListItemContent>
            <Typography level="title-sm">January 2024</Typography>
          </ListItemContent>
          <KeyboardArrowDownIcon
            sx={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </ListItemButton>
      )}
    >
      <List sx={{ gap: 0.5 }}>
        <ListItem>
          <ListItemButton sx={{ display: "block" }}>
            <Typography level="title-md">I went to the mark...</Typography>
            <Typography level="body-xs">Friday. 19-01-2024</Typography>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{ display: "block" }}>
            <Typography level="title-md">I went to the mark...</Typography>
            <Typography level="body-xs">Thursday. 19-01-2024</Typography>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{ display: "block" }}>
            <Typography level="title-md">I went to the mark...</Typography>
            <Typography level="body-xs">Wednesday. 19-01-2024</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Toggler>
  </ListItem>
);

function SideNav() {
  return (
    <Box
      component="nav"
      className="Navigation"
      sx={{
        p: 2,
        bgcolor: "background.surface",
        borderRight: "1px solid",
        borderColor: "divider",
        display: {
          xs: "none",
          sm: "initial",
        },
      }}
    >
      <List
        aria-labelledby="nav-list-browse"
        sx={{
          "& .JoyListItemButton-root": { p: "8px" },
          "--ListItem-radius": "var(--joy-radius-sm)",
          "--List-gap": "4px",
        }}
      >
        <ListItemButton selected>
          <ListItemDecorator>
            <AddCircleRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>Today&apos;s Entry</ListItemContent>
        </ListItemButton>

        <List sx={{ marginTop: "20px", "--ListItem-paddingX": "0px" }}>
          <ListDivider />
          <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
            Entries
          </ListSubheader>
          <ListItem sx={{ marginBottom: "50px" }}>
            <Input
              size="sm"
              variant="outlined"
              placeholder="Search anything…"
              startDecorator={<SearchRoundedIcon color="primary" />}
              endDecorator={
                <IconButton
                  variant="outlined"
                  color="neutral"
                  sx={{ bgcolor: "background.level1" }}
                >
                  <Typography level="title-sm" textColor="text.icon">
                    ⌘ K
                  </Typography>
                </IconButton>
              }
              sx={{
                alignSelf: "center",
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            />
          </ListItem>
          {Entry}
          {Entry}
          {Entry}
        </List>
      </List>
    </Box>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(64px, 200px) minmax(450px, 1fr)",
          md: "minmax(160px, 300px) minmax(300px, 1fr)",
        },
        gridTemplateRows: "64px 1fr",
        minHeight: "100vh",
      }}
    >
      <Header />
      <SideNav />
      {children}
    </Box>
  );
}
