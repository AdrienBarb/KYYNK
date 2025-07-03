'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useOnboarding } from '@/hooks/onboarding/useOnboarding';
import UserTypeStep from '@/components/onboarding/UserTypeStep';
import PreferencesStep from '@/components/onboarding/PreferencesStep';
import ProfilePictureStep from '@/components/onboarding/ProfilePictureStep';
import MessagePriceStep from '@/components/onboarding/MessagePriceStep';
import { useQueryState } from 'nuqs';

const OnboardingPage = () => {
  const [step, setStep] = useQueryState('step');

  const {
    currentStep,
    onboardingData,
    isPending,
    handleUserTypeSelect,
    handlePreferencesToggle,
    handleProfilePictureUpdate,
    handleMessagePriceChange,
    handleContinue,
    handleSkip,
    goToPreviousStep,
    canContinue,
    hasNextStep,
    hasPreviousStep,
  } = useOnboarding(step, setStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'user-type':
        return (
          <UserTypeStep
            selectedUserType={onboardingData.userType}
            onUserTypeSelect={handleUserTypeSelect}
          />
        );
      case 'preferences':
        return (
          <PreferencesStep
            selectedPreferences={onboardingData.preferences}
            onPreferenceToggle={handlePreferencesToggle}
          />
        );
      case 'profile-picture':
        return (
          <ProfilePictureStep
            profileImageId={onboardingData.profileImageId}
            onProfilePictureUpdate={handleProfilePictureUpdate}
          />
        );
      case 'message-price':
        return (
          <MessagePriceStep
            selectedPrice={onboardingData.fiatMessage || '0'}
            onPriceChange={handleMessagePriceChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex items-center justify-center w-full flex-col max-w-2xl p-8 bg-primary">
      <div className="mb-8">{renderStepContent()}</div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          {hasPreviousStep && (
            <Button
              variant="secondary"
              onClick={goToPreviousStep}
              className="flex items-center gap-2 bg-white text-primary border-white hover:bg-gray-100 w-24"
            >
              Back
            </Button>
          )}

          <Button
            onClick={handleContinue}
            disabled={!canContinue || isPending}
            isLoading={isPending}
            className="flex items-center gap-2 bg-white text-primary border-white hover:bg-gray-100 w-24"
          >
            {hasNextStep ? 'Continue' : 'Finish'}
          </Button>
        </div>

        {hasNextStep && currentStep !== 'user-type' && (
          <Button
            variant="link"
            onClick={handleSkip}
            className="text-sm text-secondary"
          >
            Skip
          </Button>
        )}
      </div>
    </Card>
  );
};

export default OnboardingPage;
