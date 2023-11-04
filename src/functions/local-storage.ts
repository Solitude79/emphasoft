export const accessTokenName = "Token";

export const changeAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(accessTokenName, accessToken);
};
