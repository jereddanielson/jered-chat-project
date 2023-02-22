import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import ReactTimeAgo from "react-time-ago";

export function ChatMessage({
  avatar,
  isReversed,
  children,
  timestamp,
}: {
  avatar: string;
  isReversed?: boolean;
  children?: ReactNode;
  timestamp?: number;
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
            bgcolor: isReversed ? "primary.light" : "secondary.light",
            p: 2,
            borderRadius: 2,
            boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.25)",
          }}
        >
          <Typography>{children}</Typography>
          {timestamp && (
            <Typography sx={{ textAlign: "right" }}>
              <Tooltip title={new Date(timestamp).toLocaleString()}>
                <Typography>
                  <ReactTimeAgo
                    style={{ opacity: 0.75 }}
                    date={new Date(timestamp)}
                    locale={"en-US"}
                  />
                </Typography>
              </Tooltip>
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
