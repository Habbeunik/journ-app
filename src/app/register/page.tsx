import AuthLayout from "@/components/Auth/AuthLayout";
import GoogleAuthButton from "@/components/Google/GoogleAuthButton";
import {
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Typography,
  Divider,
} from "@mui/joy";
import Link from "@mui/joy/Link";
import NextLink from "next/link";

function Form() {
  return (
    <Stack direction="column" spacing={2}>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input variant="outlined" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" variant="outlined" />
      </FormControl>
      <Button type="submit">Sign In</Button>
    </Stack>
  );
}

export default function Register() {
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
          <Typography level="h3">Register</Typography>
          <Typography level="body-sm">
            Are you an existing user?{" "}
            <NextLink href="/" passHref>
              <Link level="title-sm">Sign in!</Link>
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
