export const DDRClassOptions = {
  10: [
    {
      id: "zukin_on",
      name: "ZUKIN WARS! Event",
      help: "Activates the ZUKIN WARS event.",
      type: "Boolean",
    },
    {
      id: "episode",
      name: "ZUKIN WARS! Episode",
      help: "Sets the current episode of the ZUKIN WARS! event.",
      type: "Array",
      options: [
        { id: 0, label: "Episode 1" },
        { id: 1, label: "Episode 2" },
        { id: 2, label: "Episode 3" },
        { id: 3, label: "Episode 4" },
        { id: 4, label: "Episode 5" },
        { id: 5, label: "Episode 6" },
      ],
    },
    {
      id: "team",
      name: "ZUKIN WARS! Team",
      help: "Sets the team you will compete with.",
      type: "Array",
      options: [
        { id: 0, label: "Green" },
        { id: 1, label: "Red" },
        { id: 2, label: "Yellow" },
      ],
    },
    {
      id: "phase",
      name: "Game Unlock Phase",
      help: "Sets the content unlock period.",
      type: "Array",
      options: [
        { id: 0, label: "Phase 0" },
        { id: 1, label: "Phase 1" },
        { id: 2, label: "Phase 2" },
        { id: 3, label: "Phase 3" },
        { id: 4, label: "Phase 4" },
        { id: 5, label: "Phase 5" },
        { id: 6, label: "Phase 6" },
        { id: 7, label: "Phase MAX!" },
      ],
    },
    {
      id: "news_title",
      name: "News Title",
      help: "Title of your news post",
      type: "String",
    },
    {
      id: "news_body",
      name: "News Body",
      help: "Body of your news post. Newlines must have a space if you're doing double newlines.",
      type: "LargeText",
    },
    {
      id: "info_msg",
      name: "Information Message",
      help: "An announcement on the demo play screen.",
      type: "String",
    },
  ],
};
