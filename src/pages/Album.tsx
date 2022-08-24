import { FC, Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { AppStateValue } from "../context/state";
import { formatDuration } from "../utils/functions";
import { getAlbumInfo } from "../services/album";

const Album: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = AppStateValue();

  const { id } = useParams();
 
  
  const [data, setData] = useState<any>()

  useEffect(() => {
    getInit();
  }, [])


  const getInit = async () => {
      const data = await getAlbumInfo(id as string);
      setData(data)
    }


  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] my-10 flex flex-col md:flex-row items-start gap-10">
      <div className="flex-shrink-0 md:sticky top-10 flex flex-col items-center w-full md:w-auto">
        <img
          className="w-[300px] h-[300px] object-cover"
          src={data.images?.[0]?.url}
          alt=""
        />
        <h1 className="text-center text-2xl font-semibold my-3">{data.name}</h1>
        <div className="flex flex-wrap justify-center text-gray-400">
          {data.artists.map((artist: any, index: any,) => (
            <Fragment key={artist.id}>
              {index !== 0 && <span>, </span>}
              <Link to="">{artist.name}</Link>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="flex-grow w-full md:w-auto">
        {data.tracks.items.map((track: any) => (
          <button
            key={track.id}
            onClick={() => {
              setPlayerId(track.id);
              setIsPlayerIdChanged(true);
            }}
            className="w-full flex justify-between items-center p-2 text-left bg-dark hover:bg-dark-hovered transition duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="text-xl text-gray-400 w-5 text-right">
                {track.track_number}
              </div>
              <div>
                <h1 className="font-medium">{track.name}</h1>
                <p className="text-slate-400">
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </p>
              </div>
            </div>
            <div>{formatDuration(track.duration_ms)}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Album;
