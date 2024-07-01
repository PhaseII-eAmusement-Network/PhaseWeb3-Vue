export const DDRSettings = [
  {
    id: "fastSlow",
    name: "Fast/Slow Display",
    help: "Enable or disable displaying of Fast/Slow",
    type: Boolean,
  },
  {
    id: "comboPosition",
    name: "Combo Position",
    help: "Change order of the combo and notes",
    type: Boolean,
  },
  {
    id: "weight",
    name: "Weight (kg)",
    help: "Set your weight for in-game workout mode",
    type: Number,
  },
  {
    id: "dancer",
    name: "Character",
    help: "Set your background dancer",
    type: Array,
    options: [
      { id: 0, label: "Afro" },
      { id: 1, label: "Emi" },
    ],
  },
  {
    id: "arrow",
    name: "Arrow Skin",
    help: "Set your arrow skin",
    type: Array,
    options: [
      { id: 0, label: "Normal" },
      { id: 1, label: "Classic" },
    ],
  },
];
