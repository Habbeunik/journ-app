import { Typography, Box, Stack, Divider } from "@mui/joy";
import React from "react";

function Editor() {
  return (
    <Box sx={{ pt: "50px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: "15px",
          maxWidth: "800px",
          margin: "auto",
          minHeight: "60vh",
        }}
      >
        <Divider />
        <Stack direction="row" justifyContent="space-between" py="15px">
          <Typography level="h4" contentEditable>
            Thur 11/07/2024
          </Typography>
          <Typography level="body-sm">Saving ...</Typography>
        </Stack>
        <Divider />
        <textarea
          style={{
            width: "100%",
            flex: 1,
            border: "none",
            fontSize: "20px",
            padding: "20px 0px",
            outline: "none",
            fontFamily: "var(--joy-fontFamily-display)",
            lineHeight: "30px",
          }}
        />
      </Box>
    </Box>
  );
}

export default function App() {
  return <Editor />;
}
