export const getMediaName = ({
  title,
}: {
  title: {
    english?: string;
    romaji?: string;
    native?: string;
  };
}) => title.english ?? title.romaji ?? title.native;
