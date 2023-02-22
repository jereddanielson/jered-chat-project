import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function LoadingSkeleton() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  );
}
