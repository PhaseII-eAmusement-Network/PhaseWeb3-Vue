export const applicationIntents = [
  {
    id: "network",
    label: "Read Network",
    tip: "View network news, public profiles, and public arcades",
  },
  {
    id: "read_user",
    label: "Read User",
    tip: "Allows this app to read a user that has authenticated through it",
  },
  {
    id: "update_user",
    label: "Update User",
    tip: "Allows this app to update a user that has authenticated through it",
  },
  {
    id: "read_profiles",
    label: "Read Profiles",
    tip: "Allows this app to read the game profiles of a user that has authenticated through it",
  },
  {
    id: "update_profiles",
    label: "Update Profiles",
    tip: "Allows this app to update the game profiles of a user that has authenticated through it",
  },
  {
    id: "read_scores",
    label: "Read Scores",
    tip: "Allows this app to read the scores and records of a user that has authenticated through it",
  },
  {
    id: "read_arcade",
    label: "Read Arcades",
    tip: "Allows this app to read the arcades of a user that has authenticated through it",
  },
  {
    id: "update_arcade",
    label: "Update Arcades",
    tip: "Allows this app to update an arcade of a user that has authenticated through it",
  },
  {
    id: "webhook",
    label: "Webhook Registrations",
    tip: "Allows this app to add and remove webhook registrations for a user that has authenticated through it",
  },
];

export const getIntentById = (id) => {
  return applicationIntents.find((intent) => intent.id === id) || null;
};

export const applicationWebhooks = [
  {
    id: "network.news",
    type: "network",
    short: "news",
    label: "Network News",
    tip: "Called when a new news post is uploaded",
  },
  {
    id: "network.maintenance",
    type: "network",
    short: "maintenance",
    label: "Network Maintenance",
    tip: "Called when a maintenance window is posted",
  },
  {
    id: "arcade.event",
    type: "arcade",
    short: "event",
    label: "Arcade PCB Events",
    tip: "Called when a PCB event is sent. Requires an arcade to be specified",
    fields: ["arcadeId"],
  },
  {
    id: "arcade.paseli",
    type: "arcade",
    short: "paseli",
    label: "Arcade PASELI",
    tip: "Called when a PASELI transaction completes. Requires an arcade to be specified",
    fields: ["arcadeId"],
  },
];
