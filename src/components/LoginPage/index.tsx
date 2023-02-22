import { auth, provider } from "@/firebase";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { signInWithPopup } from "firebase/auth";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
export function LoginPage() {
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item sx={{ mt: 6 }}>
        <AddCommentOutlinedIcon color={"primary"} sx={{ fontSize: "6rem" }} />
      </Grid>
      <Grid item>
        <Button
          onClick={async () => {
            const result = await signInWithPopup(auth, provider);

            console.log(result);
          }}
        >
          Please log in to continue
        </Button>
      </Grid>
    </Grid>
  );
}
