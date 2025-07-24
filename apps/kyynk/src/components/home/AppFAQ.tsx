import React, { FC } from 'react';
import LandingHeader from '@/components/home/LandingHeader';

interface Props {}

const AppFAQ: FC<Props> = ({}) => {
  const data = {
    rows: [
      {
        title: 'What is KYYNK?',
        content:
          'KYYNK is a platform where adult creators and fans connect through private conversations. No subscriptions, no spam — just real chats, custom nudes, and personal interactions.',
      },
      {
        title: 'How do I talk to a creator?',
        content:
          'You buy credits, choose a creator you like, and start chatting. Every message is personal. You can even request custom pictures in your conversation.',
      },
      {
        title: 'How do creators earn money?',
        content:
          'Creators earn credits for each message they send or nude they share. They can withdraw their earnings anytime. During the first month, they keep 100% of what they earn.',
      },
      {
        title: 'Is this anonymous and secure?',
        content:
          'Yes. Your data is encrypted and never shared. Billing is discreet. We verify all creators to ensure a safe and respectful environment.',
      },
      {
        title: 'Who can become a creator on KYYNK?',
        content:
          'Anyone over 18 with verified ID can apply to join. We’re looking for confident, respectful people ready to build real connections with fans.',
      },
    ],
  };

  return (
    <section className="max-w-4xl mx-auto py-16">
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
