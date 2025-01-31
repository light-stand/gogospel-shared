export const navigationOptions = [
  {
    title: "screen.explore",
    url: "/explore",
    icon: "compass-outline",
    activeIcon: "compass",
    key: "explore",
  },
  {
    title: "screen.connections",
    url: "/connections",
    icon: "chat-outline",
    activeIcon: "chat",
    key: "connections",
  },
  {
    title: "screen.missions",
    url: "/missions",
    icon: "handshake-outline",
    activeIcon: "handshake",
    key: "missions",
  },
  {
    title: "screen.profile",
    url: "/my-profile",
    icon: "account-outline",
    activeIcon: "account",
    key: "profile",
  },
] as const;
