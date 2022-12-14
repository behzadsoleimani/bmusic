import client from "../utils/spotify-client";

export const searchByKeywords = async (q: string) => {
  const result = await client.search(q, [
    "artist",
    "track",
    "album",
    "playlist",
  ]);

  return result;
};
