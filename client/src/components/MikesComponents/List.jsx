import { MinusCircleIcon } from "@heroicons/react/24/solid";

const List = ({ title, placeholder, inp, setInp, oldVal, setOldVal, type,className }) => {
  const handleAdd = (inp, setInp, oldVal, setOldVal) => {
    if (inp) {
      setOldVal([...oldVal, inp]);
      setInp("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className={"text-base"+className}>
        {title}
      </label>

      {type == "skill" && (
        <ul className="pl-6 text-sm flex gap-2">
          {oldVal.map((val, i) => (
            <li className="flex items-center px-2 py-1 rounded-full text-primary-500 bg-primary-100">
              {val}
              <MinusCircleIcon
                className="h-4 cursor-pointer text-red-500 ml-2"
                onClick={() => {
                  let arr = oldVal;
                  arr.splice(i, 1);
                  setOldVal([...arr]);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      {type != "skill" && (
        <ul className="pl-6 list-disc text-sm flex flex-col gap-1">
          {oldVal.map((val, i) => (
            <li className="max-w-lg">{val}
              <MinusCircleIcon
                className="h-4 w-4 ml-2 inline cursor-pointer text-red-500"
                onClick={() => {
                  let arr = oldVal;
                  arr.splice(i, 1);
                  setOldVal([...arr]);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="flex">
        <input
          type="text"
          className="border rounded-l-md p-2 valid:border-emerald-300 w-full"
          onChange={(e) => setInp(e.target.value)}
          value={inp}
          placeholder={placeholder}
          required={oldVal.length==0}
        />
        <div
          onClick={() => handleAdd(inp, setInp, oldVal, setOldVal)}
          className="px-4 py-2 bg-white rounded-r-md border hover:bg-primary-100/50 text-primary-500 text-sm cursor-pointer"
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default List;
