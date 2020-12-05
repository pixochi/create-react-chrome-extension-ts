import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, Form, Message, Popup, Image } from "semantic-ui-react";

import * as Queries from "../graphql/queries";
import * as AuthService from "../services/auth-service";
import * as AssetsService from "../services/assets-service";
import requiredTokenScopesImg from "../required-token-scopes.png";

const Login: React.FC<{ onSuccessLogin: (accessToken: string) => void }> = ({
  onSuccessLogin,
}) => {
  const [accessTokenInput, setAccessTokenInput] = React.useState<string | null>(
    null
  );

  const [getCurrentUser, { loading, data, error }] = useLazyQuery(
    Queries.CurrentUserQuery,
    {
      fetchPolicy: "no-cache",
    }
  );

  const handleTokenInputChange = React.useCallback((e) => {
    setAccessTokenInput(e.target.value);
  }, []);

  const connectToGitHub = React.useCallback(async () => {
    if (accessTokenInput) {
      await AuthService.saveAccessToken(accessTokenInput);
      getCurrentUser();
    }
  }, [getCurrentUser, accessTokenInput]);

  React.useEffect(() => {
    if (data?.viewer.login && accessTokenInput) {
      onSuccessLogin(accessTokenInput);
    }
  }, [data?.viewer.login, onSuccessLogin, accessTokenInput]);

  return (
    <Form error={Boolean(error)} loading={loading}>
      <Form.Field error={Boolean(error)}>
        <label>Personal access token</label>
        <input
          placeholder="Enter your GitHub access token"
          onChange={handleTokenInputChange}
        />
      </Form.Field>
      <Message
        content={
          error
            ? "Failed to connect to GitHub. Make sure that the access token is correct."
            : null
        }
        error
      />
      <Button
        type="submit"
        onClick={connectToGitHub}
        disabled={!accessTokenInput?.length}
        positive
        floated="right"
      >
        Connect to GitHub
      </Button>
      <Popup
        content={
          <Image
            src={AssetsService.getResourceURL(requiredTokenScopesImg)}
            size="huge"
          />
        }
        header="Required scopes"
        style={{ maxWidth: "100vw" }}
        trigger={
          <Button
            primary
            floated="right"
            href="https://github.com/settings/tokens"
            target="_blank"
            as="a"
          >
            Generate new token
          </Button>
        }
      />
    </Form>
  );
};

export default Login;
