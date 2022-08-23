import DataGrid from "../components/DataGrid";
import { FC, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AppStateValue } from "../context/state";
import { getHomeContent } from "../services/home";

const Home: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = AppStateValue();
  const [data, setData] = useState<any>()

  useEffect(() => {
    getInit();
  }, [])


  const getInit = async () => {
      const data = await getHomeContent();
      setData(data)
    }
  



  if (!data) return <Loader />;


  return (
    <div className="mx-[5vw] pb-6">
      <h1 className="mt-5 mb-3 text-2xl">Recommended</h1>

      <DataGrid
        type="button"
        handler={(id: string) => {
          setPlayerId(id);
          setIsPlayerIdChanged(true);
        }}
        data={data.recommendations.tracks
          .filter((track: any) => track.name && track.preview_url)
          .map((track: any) => ({
            id: track.id,
            image: (track as any)?.album?.images?.[0]?.url,
            title: track.name,
            description: track?.artists.map((artist: any) => artist.name).join(", "),
          }))}
      />

      <h1 className="mt-5 mb-3 text-2xl">New Releases</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/album/${id}`}
        data={data.newReleases.albums.items
          .filter((album: any) => album.name)
          .map((album: any) => ({
            id: album.id,
            image: album.images?.[0]?.url,
            title: album.name,
            description: (album as any)?.artists
              ?.map((artist: any) => artist?.name)
              ?.join(", "),
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Top Playlists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/playlist/${id}`}
        data={data.topPlaylists
          .filter((playlist: any) => playlist.name)
          .map((playlist: any) => ({
            id: playlist.id,
            image: playlist.images?.[0]?.url,
            title: playlist.name,
            description: playlist?.owner?.display_name,
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Featured Playlists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/playlist/${id}`}
        data={data.featuredPlaylists.playlists.items
          .filter((playlist: any) => playlist.name)
          .map((playlist: any) => ({
            id: playlist.id,
            image: playlist.images?.[0]?.url,
            title: playlist.name,
            description: playlist?.owner?.display_name,
          }))}
      />

      <h1 className="mt-10 mb-3 text-2xl">Categories</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/category/${id}`}
        data={data.categories.categories.items.map((category: any) => ({
          id: category.id,
          image: category.icons?.[0]?.url,
          title: category.name,
        }))}
      />
    </div>
  );
};

export default Home;
