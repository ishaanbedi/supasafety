import EmergencyForm from "../components/EmergencyForm";

const EmergencyContact = () => {
  return (
    <div>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Add/Edit Your Emergency Contacts!
          </h1>
        </div>
        <div className="mt-12">
          <EmergencyForm number={1} />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
