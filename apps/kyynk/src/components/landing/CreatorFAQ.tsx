import React from 'react';
import LandingHeader from '@/components/home/LandingHeader';

const CreatorFAQ = () => {
  const data = {
    rows: [
      {
        title: 'What is KYYNK?',
        content:
          'KYYNK is a European adult platform that allows verified creators to earn money by chatting privately with fans and sharing personalized video content. The focus is on real connection through conversation, not subscriptions.',
      },
      {
        title: 'How does it work for creators?',
        content:
          'After creating a profile and verifying your identity, you can start receiving paid messages from fans. Members purchase credits which they use to chat with you, unlock your videos, or send tips. You earn money with every interaction — from text replies to custom content.',
      },
      {
        title: 'What makes KYYNK different?',
        content:
          'KYYNK offers a creator-first model with 0% fees for the first 3 months and only 10% after. There are no subscriptions — members pay only for what they want. The platform is focused on chat and personalized media, not mass distribution, and is fully based in the EU with strong privacy and compliance standards.',
      },
      {
        title: 'What kind of content can I sell?',
        content:
          'KYYNK is designed for creators who prefer direct interaction. You can earn from paid chats, voice notes, custom nude videos, and photo replies tailored to each fan.',
      },
      {
        title: 'Is it safe and private?',
        content:
          'Yes. Every creator is verified with government ID before they can sell content. All content is reviewed before publication to ensure compliance, and creators can block or report users at any time. You control what you share and who you engage with.',
      },
      {
        title: 'How do I get paid?',
        content:
          'Earnings are credited instantly from each transaction. You keep 90% of every sale, and you can withdraw your balance at any time using our secure payout system.',
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

export default CreatorFAQ;
