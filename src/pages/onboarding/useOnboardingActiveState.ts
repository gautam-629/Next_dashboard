import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

enum OnboardingEnum {
  ON = 'ON',
  INDUSTRY_NOT_FILLED = 'INDUSTRY_NOT_FILLED',
  QUALIFICATION_NOT_FILLED = 'QUALIFICATION_NOT_FILLED',
  EXPERIENCE_NOT_FILLED = 'EXPERIENCE_NOT_FILLED',
  CERTIFICATION_NOT_FILLED = 'CERTIFICATION_NOT_FILLED',
  OFF = 'OFF',
}
const useOnboardingActiveState = () => {
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const [activeState, setActiveState] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // if (userProfile?.onboarding?.includes(OnboardingEnum?.INDUSTRY_NOT_FILLED)) {
    //   setActiveState(0);
    // } else
    // if (userProfile?.onboarding?.includes(OnboardingEnum?.INDUSTRY_NOT_FILLED)) {
    //   setActiveState(0);
    // } else
    if (userProfile?.onboarding?.includes(OnboardingEnum?.QUALIFICATION_NOT_FILLED)) {
      setActiveState(0);
    } else if (userProfile?.onboarding?.includes(OnboardingEnum?.CERTIFICATION_NOT_FILLED)) {
      setActiveState(2);
    } else {
      setActiveState(-1);
    }
    setIsLoading(false);
  }, []);

  return { activeState, isLoading };
};

export default useOnboardingActiveState;
