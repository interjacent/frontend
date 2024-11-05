import { Final } from "./Final";
import { Login } from "./Login";

export const User = () => {
  const loggedIn = false;
  const closed = false;

  if (!loggedIn) {
    return <Login />;
  }

  if (closed) {
    return <Final />;
  }

  return <>"User page"</>;
};
