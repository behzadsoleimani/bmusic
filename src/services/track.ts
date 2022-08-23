import client from "../utils/spotify-client";

export const getTrackInfo = async (id: string) => {
  const track = await client.getTrack(id);
  return track;
};
