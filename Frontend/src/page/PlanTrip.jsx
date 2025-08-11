import React from "react";
// import DestinationSelector from "../component/DestinationSelector";
import TravelDates from "../component/TravelDates";
import Travelers from "../component/Traveler";

function PlanTrip() {
  return (
    <>
      <section className="h-[60vh]">
        <DestinationSelector />
      </section>
      <section className="h-[40vh]">
        <TravelDates />
      </section>
      <section className="h-[30vh]">
        <Travelers />
      </section>
      <section className="flex text-center justify-center">
        <button className="w-80 py-3 text-white font-medium rounded-full bg-gradient-to-r from-green-400 to-blue-200 hover:opacity-90 transition duration-200">
          Review Trip Summary
        </button>
      </section>
    </>
  );
}

export default PlanTrip;
