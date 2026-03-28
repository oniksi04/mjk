const games = [
  {
    id: 1,
    name: "Shared Shirt",
    description: "Find the footballer who has played for both of the given clubs.",
    difficulty: "Medium",
    route: "/games/sharedshirt",
    icon: "/assets/icons/logoSS.webp"
  },
  {
    id: 2,
    name: "BadgeGuessr",
    description: "Identify the football club from its badge or crest.",
    difficulty: "Easy",
    route: "/games/badgeguessr",
    icon: "/assets/icons/logoBG.webp"
  },
  {
    id: 5,
    name: "Football HiLo",
    description: "Guess whether the next player has a higher or lower stat — goals, assists, market value and more.",
    difficulty: "Easy",
    route: "/games/footballhilo",
    icon: "/assets/icons/logoHL.webp"
  },
  {
    id: 4,
    name: "Career Conundrum",
    description: "Guess the player based on the clubs they played for throughout their career.",
    difficulty: "Hard",
    route: "/games/careerconundrum",
    icon: null
  },
  {
    id: 3,
    name: "KitGuessr",
    description: "Recognize the club by looking at its football kit.",
    difficulty: "Medium",
    route: "/games/kitguessr",
    icon: "/assets/icons/logoKG.webp"
  },
  {
    id: 6,
    name: "StadiumGuessr",
    description: "Identify the football stadium based on an image or clue.",
    difficulty: "Medium",
    route: "/games/stadiumguessr",
    icon: null
  },
  {
    id: 7,
    name: "Goalless",
    description: "Name a player who played for the club but never scored a goal for them.",
    difficulty: "Hard",
    route: "/games/goalless",
    icon: null
  },
  {
    id: 8,
    name: "Tenaball",
    description: "A challenge to name ten valid football answers within a specific category.",
    difficulty: "Hard",
    route: "/games/tenaball",
    icon: null
  }
];

export default games;