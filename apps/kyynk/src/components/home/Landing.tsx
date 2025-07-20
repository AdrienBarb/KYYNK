import React from 'react';

const Landing = async () => {
  return (
    <div className="bg-primary flex justify-center items-center mx-8 rounded-md px-8 py-16 h-3/4">
      <div className="flex flex-col justify-between items-center gap-16 max-w-5xl w-full">
        <div className="flex flex-col text-center items-center justify-center lg:max-w-lg">
          <h1
            data-id="homepage-title"
            className="text-3xl lg:text-5xl font-bold font-rubik text-secondary"
          >
            REAL CONVERSATIONS. PRIVATE MOMENTS.
          </h1>
          <h2 className="text-l lg:text-xl font-light font-karla text-secondary mt-4">
            Chat one-on-one with the hottest creators. Nudes, and personal
            replies — just for you.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
