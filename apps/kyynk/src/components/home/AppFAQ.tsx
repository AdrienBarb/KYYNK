import React, { FC } from 'react';
import LandingHeader from '@/components/home/LandingHeader';

interface Props {}

const AppFAQ: FC<Props> = ({}) => {
  const data = {
    rows: [
      {
        title: 'What is KYYNK?',
        content:
          'KYYNK is a platform designed specifically for adult content creators to sell and monetize their content.',
      },
      {
        title: 'Who can create an account on KYYNK?',
        content:
          'Anyone can create an account, as long as they are producing adult content.',
      },
      {
        title: 'What is the commission structure?',
        content:
          'For the first three months, we don’t take any commission. After that period, a 10% commission is applied to cover our operational costs.',
      },
    ],
  };

  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <LandingHeader title="FREQUENTLY ASKED QUESTIONS" />
      <div className="flex flex-col gap-4">
        {data.rows.map((item, index) => (
          <div key={index} className="bg-primary rounded-md p-4">
            <h2 className="text-lg font-medium">{item.title}</h2>
            <h3 className="text-sm font-thin">{item.content}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppFAQ;
