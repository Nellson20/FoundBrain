import Skeleton from "../../components/Skeleton/Skeleton";
import "./MusiquesListSkeleton.scss";

const MusiquesListSkeleton = () => {
  return (
    <div className="musiques-list-skeleton flex flex-column gap-5 mb-15">
      <div className="top flex align-items-center p-15">
        <Skeleton height={15} width="20%" />
      </div>
      <div className="center flex gap-15">
        <Skeleton height="12vw" width="18vw" />
        <div className="right">
            <Skeleton height={15} width='60%' className="mb-5 mt-5"/>
            <Skeleton height={8} width='40%' />
            <div className="flex align-items-center gap-10 py-15">
                <Skeleton height={30} width={30} radius='50%'/>
                <Skeleton height={12} width={100}/>
            </div>
            <Skeleton width='90%' height={8} className='mb-10'/>
            <Skeleton width='60%' height={8} />
        </div>
      </div>
      <div className="bottom flex align-items-center justify-content-center p-15">
        <Skeleton height={15} width="40%" />
      </div>
    </div>
  );
};

export default MusiquesListSkeleton;
