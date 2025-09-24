import { UserProfile } from "./User";
import { MaterialIconType } from "@/components/ui";

export type ProfileActions = "logout" | "openVerificationCode" | "openHelp";

export type ProfileOption = {
  label?: string;
  items: {
    icon: MaterialIconType;
    label: string;
    href?: string;
    action?: ProfileActions;
    disabled?: boolean;
  }[];
}[];

export const getProfileOptions = (user?: UserProfile): ProfileOption => [
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
        icon: "help-rhombus-outline",
        label: "user.profile.options.help",
        action: "openHelp",
      },
      {
        icon: "bell",
        label: "user.profile.options.notification",
        href: "/settings",
        disabled: true,
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
    ].filter(Boolean) as ProfileOption[number]["items"],
  },
];

export const getPublicProfileOptions = (user?: UserProfile): ProfileOption => [
  {
    items: [
      // TODO
      // {
      //   icon: "handshake-outline",
      //   label: "user.profile.options.done",
      //   href: "/settings",
      // },
      // TODO
      // {
      //   icon: "handshake-outline",
      //   label: "user.profile.myMissions",
      //   href: "/settings",
      // },
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
