import {
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Typography,
  Divider,
  Checkbox,
} from "@mui/joy";
import Link from "@mui/joy/Link";
import NextLink from "next/link";
import GoogleAuthButton from "@/components/Google/GoogleAuthButton";
import AuthLayout from "@/components/Auth/AuthLayout";

function Form() {
  return (
    <Stack direction="column" spacing={2}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" variant="outlined" />
      </FormControl>
      <Checkbox
        size="sm"
        label="Remember me"
        name="persistent"
        sx={{ textAlign: "left" }}
      />
      <Button type="submit">Sign In</Button>
    </Stack>
  );
}

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "6rem",
        minHeight: "100vh",
      }}
    >
      <AuthLayout>
        <Stack spacing={2}>
          <Typography level="h3">Sign in</Typography>
          <Typography level="body-sm">
            Are you a new user?{" "}
            <NextLink href="/register" passHref>
              <Link level="title-sm"> Sign up!</Link>
            </NextLink>
          </Typography>
          <GoogleAuthButton />
          <Divider>or</Divider>
        </Stack>
        <Form />
      </AuthLayout>
    </Box>
  );
}
