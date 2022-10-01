import { useState, useEffect } from "react";
import { BiRename } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import supabase from "../utils/supabase";
const EmergencyForm1 = ({ number }) => {
  const [name1, setName1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [name2, setName2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [relation2, setRelation2] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("emergency_contacts").insert([
      {
        email: supabase.auth.user().email,
        emergency: [
          {
            name1: name1,
            phone1: phone1,
            relation1: relation1,
          },
          {
            name2: name2,
            phone2: phone2,
            relation2: relation2,
          },
        ],
      },
    ]);
    if (error) {
      alert(error.message);
    } else {
      alert("Emergency Contacts Added!");
      setShowModal(true);
    }
  };
  const getUser = async (e) => {
    try {
      const { data, error } = await supabase
        .from("emergency_contacts")
        .select("*")
        .eq("email", supabase.auth.user().email);
      if (error) {
        alert(error.message);
      } else {
        setName1(data[0].emergency[0].name1);
        setPhone1(data[0].emergency[0].phone1);
        setRelation1(data[0].emergency[0].relation1);
        setName2(data[0].emergency[1].name2);
        setPhone2(data[0].emergency[1].phone2);
        setRelation2(data[0].emergency[1].relation2);
      }
    } catch {
      setName1("");
      setPhone1("");
      setRelation1("");
      setName2("");
      setPhone2("");
      setRelation2("");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="bg-gray-200 mx-2 py-12 rounded-md">
      <h1 className="text-center font-black">
        Details of Emergency Contact #{number}
      </h1>
      <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div>
          <div className="relative">
            <input
              type="name"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter the name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              required
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <BiRename />
            </span>
          </div>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter phone number"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              required
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <AiOutlineMail />
            </span>
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter relation"
              value={relation1}
              onChange={(e) => setRelation1(e.target.value)}
              required
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <AiOutlineUserAdd />
            </span>
          </div>
        </div>
      </form>
      <h1 className="text-center font-black mt-12">
        Details of Emergency Contact #{number + 1}
      </h1>
      <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div>
          <div className="relative">
            <input
              type="name"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter the name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              required
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <BiRename />
            </span>
          </div>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter phone"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              required
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <AiOutlineMail />
            </span>
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter relation"
              value={relation2}
              onChange={(e) => setRelation2(e.target.value)}
              required
            />

            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <AiOutlineUserAdd />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-rose-500 hover:bg-rose-400 active:bg-rose-600 rounded-lg"
            onClick={handleAdd}
          >
            Add user
          </button>
        </div>
      </form>
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#395B64] outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-[#E8F1F2]">
                      Configure for WhatsApp
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <p className="text-white px-2 mt-12 flex flex-col">
                    Click the following button to verify SupaSafety for WhatsApp
                    from both the emergency contacts number.
                    <a href="http://wa.me/+14155238886?text=join%20depend-break">
                      <button className="my-12 inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-rose-500 hover:bg-rose-400 active:bg-rose-600 rounded-lg">
                        VERIFY
                      </button>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
};

export default EmergencyForm1;
