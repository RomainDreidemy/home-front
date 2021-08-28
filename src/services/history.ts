import { createBrowserHistory } from "history";
import { getPath } from "../routes";

const history = createBrowserHistory();

export const goToByName = (name: string): void => history.push(getPath(name));

export default history;
