import React from "react";
import { Button, Header, Grid, Modal } from "semantic-ui-react";

import * as AuthService from "./services/auth-service";
import Login from "./login";
import PotentialReviewers from "./potential-reviewers";
import * as Helpers from "./helpers";

const getStoredAccessToken = async () => {
  const accessToken = await AuthService.getAccessToken();
  return accessToken;
};

function Extension() {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Gets the current user from local storage.
  React.useEffect(() => {
    async function getInitialUserLogin() {
      const accessToken = await getStoredAccessToken();
      setAccessToken(accessToken);
    }
    getInitialUserLogin();
  }, []);

  const handleLogOut = React.useCallback(() => {
    async function clearStorage() {
      setIsLoggingOut(true);
      await AuthService.logOut();
      setAccessToken(null);
      setIsLoggingOut(false);
    }
    clearStorage();
  }, []);

  const modalContent = React.useMemo(() => {
    if (!accessToken) {
      return <Login onSuccessLogin={setAccessToken} />;
    }

    return <PotentialReviewers />;
  }, [accessToken]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="green" content="Requested reviews" fluid />}
    >
      <Modal.Header>
        <Header>
          {accessToken
            ? `Requested reviews in '${Helpers.getRepoIdentifier()}'`
            : "Login"}
        </Header>
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>{modalContent}</Modal.Description>
      </Modal.Content>
      {accessToken ? (
        <Modal.Actions>
          <Grid columns={1}>
            <Grid.Column textAlign="left">
              <Button
                onClick={handleLogOut}
                color="grey"
                loading={isLoggingOut}
              >
                Log out
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      ) : null}
    </Modal>
  );
}

export default Extension;
