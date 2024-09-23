export type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  uri: string;
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  external_urls: {
    spotify: string;
  };
};
