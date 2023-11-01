import { MinusCircleIcon } from "@heroicons/react/24/solid";

const SkillList = ({
  title,
  placeholder,
  inp,
  setInp,
  oldVal,
  setOldVal,
  type,
  className = "",
  inputClassName = "",
}) => {
  const handleAdd = (inp, setInp, oldVal, setOldVal) => {
    if (inp) {
      setOldVal([...oldVal, inp]);
      setInp("");
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 188 || e.keyCode === 13) {
      if (inp.length > 1) {
        handleAdd(inp, setInp, oldVal, setOldVal);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className={"text-base " + className}>
        {title}
      </label>

      {oldVal.length !== 0 && type == "skill" && (
        <ul className="pl-0 text-sm flex gap-2 flex-wrap">
          {oldVal.map((val, i) => (
            <li
              key={i}
              className="flex items-center px-2 py-1 rounded-full text-white bg-[#daa520]"
            >
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
      {oldVal.length !== 0 && type != "skill" && (
        <ul className="pl-6 list-disc text-sm flex flex-col gap-1">
          {oldVal.map((val, i) => (
            <li className=" gap-2 max-w-lg">
              {val}
              <MinusCircleIcon
                className="h-4 w-max ml-2 inline cursor-pointer text-red-500"
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
          className={
            "border rounded-l-md p-2 valid:border-emerald-300 w-full focus:outline-primary-500 active:border-primary-500 " +
            inputClassName
          }
          onChange={(e) => e.nativeEvent.data !== "," && setInp(e.target.value)}
          onKeyDown={handleKeypress}
          value={inp}
          placeholder={placeholder}
          required={oldVal.length == 0}
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

export default SkillList;
