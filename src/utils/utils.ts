export const openAnilistAuthUrl = () => {
  const anilistAuthURL = process.env.NEXT_PUBLIC_ANILIST_AUTH_URL;
  window.open(anilistAuthURL, '_blank');
};
