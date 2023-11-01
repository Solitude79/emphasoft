import { createEvent, createStore } from "effector";

export const DEFAULT_IS_TOKEN = "";

export const $dataToken = createStore<string>(DEFAULT_IS_TOKEN);
export const setDataToken = createEvent<string>();
$dataToken.on(setDataToken, (_, val) => val);

$dataToken.updates.watch((token) => {
  console.log("WATCH. dataToken token:", token);
});
