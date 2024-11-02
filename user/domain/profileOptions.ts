import { ProfileOptions } from "../components/ProfileOptions";
import { UserProfile } from "./User";

export const getProfileOptions = (user?: UserProfile): ProfileOptions => [
  {
    label: "user.profile.options.profile",
    items: [
      {
        icon: "pencil",
        label: "user.profile.edit",
        href: "/profile/edit",
      },
      // {
      //   icon: "hand-heart",
      //   label: "user.profile.options.connectedVolunteers",
      //   href: "/settings",
      // },
      {
        icon: "comment-check-outline",
        label: "user.profile.options.feedback",
        href: `/feedback/${user?.user_id}`,
      },
    ],
  },
  {
    label: "user.profile.options.settings",
    items: [
      {
        icon: "bell",
        label: "user.profile.options.notification",
        href: "/settings",
      },
      !user?.is_verified && {
        icon: "lock-check-outline",
        label: "user.profile.options.verificationCode",
        action: "openVerificationCode",
      },
      {
        icon: "logout",
        label: "user.profile.options.logout",
        action: "logout",
      },
    ].filter(Boolean) as ProfileOptions[number]["items"],
  },
];

export const getPublicProfileOptions = (user?: UserProfile): ProfileOptions => [
  {
    items: [
      {
        icon: "handshake-outline",
        label: "user.profile.options.done",
        href: "/settings",
      },
      {
        icon: "handshake-outline",
        label: "user.profile.myMissions",
        href: "/settings",
      },
      // {
      //   icon: "hand-heart",
      //   label: "user.profile.options.connectedVolunteers",
      //   href: "/settings",
      // },
      {
        icon: "comment-check-outline",
        label: "user.profile.options.feedback",
        href: `/feedback/${user?.user_id}`,
      },
    ],
  },
];
