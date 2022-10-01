import React from "react";

const EmergencyContact = () => {
  return (
    <div>
      <div>
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
          placeholder="Name"
          type="text"
          id="name"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="phone">
          Phone
        </label>
        <input
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
          placeholder="Phone Number"
          type="tel"
          id="phone"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="phone">
          Your Relation
        </label>
        <input
          className="w-full p-3 text-sm border-gray-200 rounded-lg"
          placeholder="Your Relation"
          type="text"
          id="relation"
        />
      </div>
    </div>
  );
};

export default EmergencyContact;
