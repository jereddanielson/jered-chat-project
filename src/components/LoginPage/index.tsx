import { auth, provider } from "@/firebase";
import { i18n } from "@/utils/i18n";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { signInWithPopup } from "firebase/auth";

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
          {i18n.gettext("Please log in to continue")}
        </Button>
      </Grid>
    </Grid>
  );
}
