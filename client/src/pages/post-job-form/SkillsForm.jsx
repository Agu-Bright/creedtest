import React, { useState, Fragment } from 'react'
import { occupations } from "../../../data/occupations";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const SkillsForm = () => {
  const [query, setQuery] = useState("");
  const [occupationValue, setOccupationValue] = useState('');

  const filteredOccupations =
		query === ""
			? occupations
			: occupations.filter((occupation) =>
					occupation.occupation
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

  return (
    <Combobox value={occupationValue} onChange={setOccupationValue}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-[14px] bg-white text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-400 sm:text-sm border focus:outline-yellow-400 focus:outline">
          <Combobox.Input
            placeholder="Occupation"
            style={{text: '#7a8593'}}
            className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4 border-none"
            displayValue={(occupation) => occupation.occupation}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 bg-white border-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOccupations.length === 0 && query !== "" ? (
              <Combobox.Option
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active
                    ? "bg-primary-500 text-white"
                    : "text-gray-900"
                }`
              }
              value={{ id: null, occupation: query }}
            >
              "{query}"
            </Combobox.Option>
            ) : (
              filteredOccupations.map((occupation) => (
                <Combobox.Option
                  key={occupation.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary-500 text-white"
                        : "text-gray-900"
                    }`
                  }
                  value={occupation}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {occupation.occupation}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-primary-500"
                          }`}
                        >
                          <CheckIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

export default SkillsForm