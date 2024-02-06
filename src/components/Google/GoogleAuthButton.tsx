// "use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { Fragment } from "react";

interface IGoogleAuthentication {
  handleSuccess: (credential: CredentialResponse) => void;
  handleError: () => void;
}

function GoogleAuthButton({
  handleError,
  handleSuccess,
}: IGoogleAuthentication) {
  return (
    <Fragment>
      <GoogleLogin
        shape="pill"
        onSuccess={handleSuccess}
        onError={handleError}
        width={400}
      />
    </Fragment>
  );
}

export default GoogleAuthButton;
