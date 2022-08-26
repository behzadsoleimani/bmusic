import DataGrid from "../components/DataGrid";
import { FC, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getCategoryInfo } from "../services/category";
import { useParams } from "react-router-dom";

const Category: FC = () => {
  const { id } = useParams();

  
  const [data, setData] = useState<any>()

  useEffect(() => {
    getInit();
  }, [])


  const getInit = async () => {
      const data = await getCategoryInfo(id as string);
      setData(data)
    }


  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] mb-5">
      <h1 className="mt-5 mb-3 text-2xl">Category: {data.category.name}</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/playlist/${id}`}
        data={data.playlists.items
          .filter((playlist: any) => playlist.name)
          .map((playlist: any) => ({
            id: playlist.id,
            image: playlist.images?.[0]?.url,
            title: playlist.name,
            description: playlist?.owner?.display_name,
          }))}
      />
    </div>
  );
};

export default Category;
