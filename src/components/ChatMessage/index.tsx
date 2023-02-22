import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export function ChatMessage({
  avatar,
  isReversed,
  children,
}: {
  avatar: string;
  isReversed?: boolean;
  children?: ReactNode;
}) {
  return (
    <Grid
      container
      wrap={"nowrap"}
      spacing={2}
      sx={{ mb: 2, wordBreak: "break-word" }}
      direction={isReversed ? "row-reverse" : "row"}
    >
      <Grid item>
        <Avatar>{avatar}</Avatar>
      </Grid>
      <Grid item>
        <Box
          sx={{
            bgcolor: isReversed ? "success.main" : "info.main",
            p: 2,
            borderRadius: 2,
            boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.25)",
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
