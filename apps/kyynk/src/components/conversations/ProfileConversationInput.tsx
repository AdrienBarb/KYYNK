import ConversationInput from './ConversationInput';
import TypingCarousel from './TypingCarousel';

const ProfileConversationInput = () => {
  return (
    <div className="w-full h-[80dvh] flex flex-col items-center justify-center">
      <TypingCarousel
        texts={[
          'Let’s talk... just you and me...',
          'Don’t be shy, I’m all yours now...',
          'I have something naughty to tell you...',
        ]}
      />

      <ConversationInput />
    </div>
  );
};

export default ProfileConversationInput;
