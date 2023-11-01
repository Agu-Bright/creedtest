// SecondTab.js

import React, { useState, useEffect, useContext } from "react";
import "./Post-service.css";
import SkillList from "../../components/common/SkillList";
import { useNavigate } from "react-router-dom";
import { AddServicesContext } from "../../contexts/ServicesContext";
import { LoaderContext } from "../../contexts/LoaderContext";
const Service_details = () => {
  const [skillsetInput, setSkillsetInput] = useState("");
  const {
    name,
    category,
    location,
    description,
    setDescription,
    skills,
    setSkills,
    duration,
    setDuration,
    selectDuration,
    setSelectDuration,
    methodOfPayment,
    setMethodOfPayment,
    fixedMinimumPrice,
    setFixedMinimumPrice,
    fixedMaximumPrice,
    setFixedMaximumPrice,
    hourlyMaximumPrice,
    setHourlyMaximumPrice,
    hourlyMinimumPrice,
    setHourlyMinimumPrice,
    addService,
  } = useContext(AddServicesContext);

  const { setLoading } = useContext(LoaderContext);
  // function fixed_price()
  // {
  //   useEffect(() => {
  //     const Activeinputs = document.getElementById("input-section-fixed");
  //     const Destroybutton = document.getElementById("next-button");
  //     Destroybutton.style.display="none";
  //     Activeinputs.style.backgroundColor="#ddd";
  //   }, []);
  // }

  const navigate = useNavigate();
  return (
    <div className="Service-details">
      <label for="service-description" className="block mb-2">
        Description of service
      </label>
      <textarea
        name="service-description"
        placeholder="Describe the service you want to offer, how long it takes, what your future client should know etc"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <space />

      <div>
        <SkillList
          type="skill"
          title={"Which skills are you offering?"}
          placeholder={"Ex: React, Photoshop, Illustrator"}
          inp={skillsetInput}
          setInp={setSkillsetInput}
          oldVal={skills}
          setOldVal={setSkills}
          className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm mt-3 -mb-1"
          inputClassName="border-gray-400 border-solid"
        />
      </div>

      <space />
      <p>Duration of service</p>
      <div className="duration_of_service">
        <div>
          <label for="number-duration" className="block mb-2">
            Enter number
          </label>
          <input
            name="number-duration"
            type="number"
            max={50}
            placeholder="input number of"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label for="duration-service" className="block mb-2">
            Select duration
          </label>
          <select
            name="duration-service"
            value={selectDuration}
            onChange={(e) => setSelectDuration(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>

      <space />
      <p>How do you want to get paid?</p>
      <label for="how-do-you-want-to-get-paid" className="block mb-2">
        Select option
      </label>
      <select
        name="how-do-you-want-to-get-paid"
        onChange={(e) => {
          setFixedMinimumPrice("");
          setHourlyMinimumPrice("");
          setFixedMaximumPrice("");
          setHourlyMaximumPrice("");
          setMethodOfPayment(e.target.value);
        }}
      >
        <option value="fixed">Fixed</option>
        <option value="hourly">hourly</option>
      </select>

      <div className="flex-container-inputs">
        <div
          style={{
            backgroundColor:
              methodOfPayment === "fixed" ? "#ddd" : "transparent",
          }}
          className="fixed_hourly-price-container"
        >
          <p>Fixed price (₦)</p>
          <div className="flex">
            <div>
              <label for="minimum-fixed" className="block mb-2">
                min: fixed price
              </label>
              <input
                value={fixedMinimumPrice}
                onChange={(e) => setFixedMinimumPrice(e.target.value)}
                name="minimum-fixed"
                placeholder="e.g 25,000"
                type="number"
                id="min-fixed"
              ></input>
            </div>
            <div className="to">to</div>
            <div>
              <label for="max-fixed">max: fixed price</label>
              <input
                value={fixedMaximumPrice}
                onChange={(e) => setFixedMaximumPrice(e.target.value)}
                name="max-fixed"
                placeholder="e.g 500,000"
                type="number"
                id="max-fixed"
              ></input>
              <br></br>
            </div>
          </div>
        </div>
        <div className="vertical_stroke"></div>
        <div
          className="fixed_hourly-price-container"
          id="input-section-hourly"
          style={{
            backgroundColor:
              methodOfPayment === "hourly" ? "#ddd" : "transparent",
          }}
        >
          <p>Paid hourly (₦)</p>
          <div className="flex">
            <div>
              <label for="minimum-fixed">min: price/hr</label>
              <input
                value={hourlyMinimumPrice}
                onChange={(e) => setHourlyMinimumPrice(e.target.value)}
                name="minimum-fixed"
                placeholder="e.g 1,500"
                id="min-hourly"
                type="number"
              ></input>
            </div>
            <div className="to">to</div>

            <div>
              <label for="max-fixed">max: price/hr</label>
              <input
                value={hourlyMaximumPrice}
                onChange={(e) => setHourlyMaximumPrice(e.target.value)}
                name="max-fixed"
                placeholder="e.g 5,000"
                id="max-hourly"
                type="number"
              />
              <br></br>
            </div>
          </div>
        </div>
      </div>

      <space />
      <button
        onClick={() => {
          if (
            name &&
            category &&
            location &&
            duration &&
            selectDuration &&
            methodOfPayment
          ) {
            setLoading(true);
            addService().then((res) => {
              setLoading(false);
              res.ok && navigate("/dashboard/browse/services");
            });
          }
        }}
        className="final_button-1"
      >
        Post Service
      </button>
      <space />
    </div>
  );
};
export default Service_details;
