import { FC, useEffect, useMemo, useState } from "react";

import DataGrid from "../components/DataGrid";
import Loader from "../components/Loader";
import { AppStateValue } from "../context/state";
import { formatNumber } from "../utils/functions";
import { searchByKeywords } from "../services/search";
import { useLocation } from "react-router-dom";

const Search: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = AppStateValue();

  const location = useLocation();
  const { q } = useMemo(
    () => Object.fromEntries(new URLSearchParams(location.search)),
    [location.search]
  );

  
  const [data, setData] = useState<any>()

  useEffect(() => {
    getInit();
  }, [])


  const getInit = async () => {
    const data = await searchByKeywords(q);
    setData(data)
  }


  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] mb-5">
      <h1 className="text-3xl mt-5">Search result for: {q}</h1>

      <h1 className="mt-5 mb-2 text-2xl">Artists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/artist/${id}`}
        data={
          data.artists?.items
            .filter((artist: any) => artist.name)
            .map((artist: any) => ({
              id: artist.id,
              image: artist?.images?.[0]?.url,
              title: artist.name,
              description: `${formatNumber(artist.followers.total)} followers`,
            })) as any
        }
      />

      <h1 className="mt-5 mb-2 text-2xl">Tracks</h1>

      <DataGrid
        type="button"
        handler={(id: string) => {
          setPlayerId(id);
          setIsPlayerIdChanged(true);
        }}
        data={
          data.tracks?.items
            ?.filter((track: any) => track.name)
            .map((track: any) => ({
              id: track.id,
              image: (track as any)?.album?.images?.[0]?.url,
              title: track.name,
              description: track?.artists
                .map((artist: any) => artist.name)
                .join(", "),
            })) as any
        }
      />

      <h1 className="mt-5 mb-3 text-2xl">Albums</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/album/${id}`}
        data={
          data.albums?.items
            .filter((album: any) => album.name)
            .map((album: any) => ({
              id: album.id,
              image: album?.images?.[0]?.url,
              title: album.name,
              description: (album as any)?.artists
                ?.map((artist: any) => artist?.name)
                ?.join(", "),
            })) as any
        }
      />

      <h1 className="mt-10 mb-3 text-2xl">Playlists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/playlist/${id}`}
        data={
          data.playlists?.items
            .filter((playlist: any) => playlist.name)
            .map((playlist: any) => ({
              id: playlist.id,
              image: playlist?.images[0]?.url,
              title: playlist.name,
              description: playlist?.owner?.display_name,
            })) as any
        }
      />
    </div>
  );
};

export default Search;
