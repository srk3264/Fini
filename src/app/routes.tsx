import { createBrowserRouter } from "react-router";
import Onboarding1 from "../imports/Onboarding1";
import Onboarding2 from "../imports/Onboarding2";
import Onboarding3 from "../imports/Onboarding3";
import OnboardingLayout from "./components/OnboardingLayout";
import AuthLayout from "./components/AuthLayout";
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from "./components/OnboardingScreens";
import { FunctionalSignUpScreen, FunctionalSignInScreen } from "./components/FunctionalAuthScreens";
import PostSignupOnboardingLayout from "./components/PostSignupOnboardingLayout";
import Journal from "./components/Journal";
import AIInsights from "./components/AIInsights";
import {
  NicknameStep,
  AIPersonaStep,
  GenderStep,
  OccupationStep,
  FaithStep,
  RelationshipStatusStep,
  BirthdayStep,
  NotificationsStep,
  LoadingStep,
} from "./components/PostSignupOnboarding";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: OnboardingLayout,
    children: [
      { index: true, Component: OnboardingScreen1 },
      { path: "step-2", Component: OnboardingScreen2 },
      { path: "step-3", Component: OnboardingScreen3 },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "sign-up", Component: FunctionalSignUpScreen },
      { path: "sign-in", Component: FunctionalSignInScreen },
    ],
  },
  {
  path: "/insights",
  Component: AIInsights,
},
{
path: "/journal",
    element: <Journal />,
},
  {
    path: "/onboarding",
    Component: PostSignupOnboardingLayout,
    children: [
      { path: "nickname", Component: NicknameStep },
      { path: "ai-persona", Component: AIPersonaStep },
      { path: "gender", Component: GenderStep },
      { path: "occupation", Component: OccupationStep },
      { path: "faith", Component: FaithStep },
      { path: "relationship-status", Component: RelationshipStatusStep },
      { path: "birthday", Component: BirthdayStep },
      { path: "notifications", Component: NotificationsStep },
      { path: "loading", Component: LoadingStep },
    ],
  },
  {
    path: "/dashboard",
    Component: Journal,
  },
]);