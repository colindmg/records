export type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  uri: string;
  preview_url: string;
  album: {
    album_type: string;
    name: string;
    images: { url: string; height: number; width: number }[];
  };
  external_urls: {
    spotify: string;
  };
};
