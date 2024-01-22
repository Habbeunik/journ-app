import Button from "@mui/joy/Button";
import GoogleIcon from "./GoogleIcon";

function GoogleAuthButton() {
  return (
    <Button
      variant="soft"
      color="neutral"
      fullWidth
      startDecorator={<GoogleIcon />}
    >
      Continue with Google
    </Button>
  );
}

export default GoogleAuthButton;
