export const CCJOptions = {
  1: [
    {
      id: "allow_global_in_local",
      name: "Allow Global Matching in Local",
      help: "Allow the server to match-make network wide rather than force a local machine. Not all modes are supported.",
      type: "Boolean",
    },
    {
      id: "login_event",
      name: "Login Event",
      help: "Enable a specific Login Event, separate from the login bonus. Only one can be enabled at a time, and some events may be disabled in newer builds.",
      type: "Array",
      options: [
        { id: 0, label: "Disabled" },
        { id: 1, label: "Quiz Magic Academy Stamp Book" },
        { id: 2, label: "KAC2023 Stamp Book" },
      ],
    },
    {
      id: "logout_event",
      name: "Logout Event",
      help: "Enable a specific Logout Event. Only one can be enabled at a time, and some events may be disabled in newer builds.",
      type: "Array",
      options: [
        { id: 0, label: "Disabled" },
        // { id: 1, label: "Yocchan Ekiden" },
        { id: 2, label: "2023 BINGO BINGO JOKERS" },
        { id: 3, label: "Yocchan business trip Hanami (1)" },
        { id: 4, label: "Yocchan business trip Hanami (2)" },
        // { id: 5, label: "O-chan, you can't do it!" },
        { id: 6, label: "Chase Chase Jewelry Leisures (Treasure Hunt)" },
        { id: 7, label: "Yocchan business trip Wedding" },
        { id: 8, label: "Yocchan business trip Chase Sea House" },
        // { id: 9, label: "Festival de business trip Yocchan-do" },
        { id: 10, label: "Yocchan business trip Idol" },
      ],
    },
    {
      id: "info_text",
      name: "Information Message",
      help: "An announcement on the news banner.",
      type: "String",
    },
  ],
};
