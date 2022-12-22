export const openAnilistAuthUrl = () => {
  const anilistClientId = process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID;
  const anilistAuthURL = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId}&response_type=token`;
  window.open(anilistAuthURL, '_blank');
};
