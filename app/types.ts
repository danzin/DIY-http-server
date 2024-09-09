import { Handler } from "./handler";

export type Route = {
  path: string;
  handler: Handler;
};