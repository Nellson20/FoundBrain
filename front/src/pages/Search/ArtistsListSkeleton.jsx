import Skeleton from "../../components/Skeleton/Skeleton";
import "./ArtistsListSkeleton.scss";
const ArtistsListSkeleton = () => {
  return (
    <div className="artists-list-skeleton flex flex-column gap-5 mb-15">
      <div className="top align-items-center p-15">
        <Skeleton height={15} width="20%" />
      </div>
      <div className="center flex justify-content-between gap-5 p-15">
        <div className="flex flex-column align-items-center gap-10 p-15">
          <Skeleton height={100} width={100} radius="50%" />
          <Skeleton height={20} width={100} />
        </div>
        <div className="flex flex-column align-items-center gap-10 p-15">
          <Skeleton height={100} width={100} radius="50%" />
          <Skeleton height={20} width={100} />
        </div>
        <div className="flex flex-column align-items-center gap-10 p-15">
          <Skeleton height={100} width={100} radius="50%" />
          <Skeleton height={20} width={100} />
        </div>
        <div className="flex flex-column align-items-center gap-10 p-15">
          <Skeleton height={100} width={100} radius="50%" />
          <Skeleton height={20} width={100} />
        </div>
        <div className="flex flex-column align-items-center gap-10 p-15">
          <Skeleton height={100} width={100} radius="50%" />
          <Skeleton height={20} width={100} />
        </div>
      </div>
      <div className="bottom flex align-items-center justify-content-center p-15">
        <Skeleton height={15} width="40%" />
      </div>
    </div>
  );
};

export default ArtistsListSkeleton;
