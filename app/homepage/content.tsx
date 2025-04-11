import React from "react";
import Image from "next/image";

const HomePageContent = () => {
  return (
    <>
      <div
        className="hero h-120"
        style={{
          backgroundImage: "url(/homepage/faculty_of_computing.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div>
            <h1 className="mb-15 text-5xl font-bold">
              Quality Management System
            </h1>
            <p className=" text-3xl">Faculty of Computing</p>
          </div>
        </div>
      </div>

      <div className="flex mx-15 my-8 flex-col">
        <div className="justify-items-center border-solid mx-8">
          <Image
            src="/homepage/organizationchart_fc_2025.jpg"
            width={1285}
            height={800}
            alt="Organization Chart FC 2025"
          />
        </div>

        <div className="divider"></div>

        <div className="card rounded-none lg:card-side bg-base-100 shadow-md my-5 lg:h-[650px]">
          <figure className="lg:w-1/2 h-full">
            <Image
              // src="/homepage/awan-bangunan-FC_1.png"
              src="/homepage/cardpic_FC.png"
              width={950}
              height={650}
              alt="FC picture"
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body lg:w-1/2 flex flex-col justify-center">
            <div className="p-5">
              <div className="text-center mx-9 my-7">
                <p className="font-bold text-2xl p-4">VISION</p>
                <p className="text-gray-700 text-base">
                  To be a recognized world-class faculty with academic and
                  research excellence in computing technology
                </p>
              </div>

              <div className="text-center my-7 mx-9">
                <p className="font-bold text-2xl p-4">MISSION</p>
                <p className="text-gray-700 text-base">
                  To develop future-oriented and industry relevant digital
                  talents, innovative solutions, and effective services in
                  computing technology that will contribute to the nation's
                  wealth creation.
                </p>
              </div>

              <div className=" mx-9 my-7 flex flex-col items-center">
                <p className="font-bold text-2xl p-4 text-center ">
                  STRATEGIC OBJECTIVES
                </p>
                <ul className="list-disc text-left ml-5 text-gray-700 text-base">
                  <li>
                    Produce excellence and future-oriented talents in computing
                    research and education.
                  </li>
                  <li>
                    Produce life-ready graduates with premium employment and
                    contribute professionally and ethically in society.
                  </li>
                  <li>
                    Enhance and strengthen flexible inclusive computing
                    education.
                  </li>
                  <li>Championing for excellence in computing research.</li>
                  <li>
                    Provide the best services and facilities to support the
                    faculty's strategy and desired stakeholders’ experience.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageContent;
