import { StarIcon, UserIcon } from "@heroicons/react/24/solid";

const NoReviews = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 mb-4">
      <div className="lg:-mr-10">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(() => (
            <StarIcon className="h-4 lg:h-6 text-primary-500/90" />
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          <div
            onClick={() => setOutwards(!outwards)}
            className="bg-yellow-200 w-max h-max text-primary-500 rounded-full p-2 "
          >
            <UserIcon className="h-6" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-2 lg:h-3 lg:hidden w-32 bg-zinc-300 rounded-sm"></div>
            <div className="h-2 lg:h-3 lg:hidden w-16 bg-zinc-300 rounded-sm"></div>
            <div className="h-2 lg:h-3 lg:hidden w-24 bg-zinc-300 rounded-sm"></div>
            <div className="h-2 lg:h-3 lg:block w-60 hidden bg-zinc-300 rounded-sm"></div>
            <div className="h-2 lg:h-3 lg:block w-36 hidden bg-zinc-300 rounded-sm"></div>
            <div className="h-2 lg:h-3 lg:block w-44 hidden bg-zinc-300 rounded-sm"></div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block"></div>
      <div className="hidden lg:block"></div>
      <div className="-ml-10 hidden lg:block">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(() => (
            <StarIcon className="h-4 lg:h-6 text-primary-500/90" />
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          <div
            onClick={() => setOutwards(!outwards)}
            className="bg-yellow-200 w-max h-max text-primary-500 rounded-full p-2 "
          >
            <UserIcon className="h-6" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-3 w-60 bg-zinc-300 rounded-sm"></div>
            <div className="h-3 w-36 bg-zinc-300 rounded-sm"></div>
            <div className="h-3 w-44 bg-zinc-300 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoReviews;
