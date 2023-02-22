import { auth, provider } from "@/firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signInWithPopup } from "firebase/auth";

export function LoginPage() {
  return (
    <Box>
      <Button
        onClick={async () => {
          const result = await signInWithPopup(auth, provider);

          console.log(result);
        }}
      >
        Please log in
      </Button>
    </Box>
  );
}
