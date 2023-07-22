export class SkillColors {
  static gitadoraSkill = [
    { id: 1, min: 0, max: 99999, color: "text-white" },
    { id: 2, min: 100000, max: 149999, color: "text-orange-500" },
    { id: 3, min: 150000, max: 199999, color: "text-orange-600" },
    { id: 4, min: 200000, max: 249999, color: "text-yellow-400" },
    { id: 5, min: 250000, max: 299999, color: "text-yellow-500" },
    { id: 6, min: 300000, max: 349999, color: "text-green-500" },
    { id: 7, min: 350000, max: 399999, color: "text-lime-500" },
    { id: 8, min: 400000, max: 449999, color: "text-blue-500" },
    { id: 9, min: 450000, max: 499999, color: "text-cyan-500" },
    { id: 10, min: 500000, max: 549999, color: "text-purple-600" },
    { id: 11, min: 550000, max: 599999, color: "text-purple-500" },
    { id: 12, min: 600000, max: 649999, color: "text-red-500" },
    { id: 13, min: 650000, max: 699999, color: "text-red-700" },
    { id: 14, min: 700000, max: 749999, color: "text-amber-600" },
    { id: 15, min: 750000, max: 799999, color: "text-stone-400" },
    { id: 16, min: 800000, max: 849999, color: "text-yellow-500" },
    {
      id: 17,
      min: 850000,
      max: 999999,
      color:
        "text-transparent bg-clip-text bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600",
    },
  ];

  static jubilitySkill = [
    { id: 1, min: 0, max: 2499, color: "text-white" },
    { id: 2, min: 2500, max: 7499, color: "text-emerald-500" },
    { id: 3, min: 7500, max: 14999, color: "text-green-500" },
    { id: 4, min: 15000, max: 24999, color: "text-sky-500" },
    { id: 5, min: 25000, max: 39999, color: "text-blue-500" },
    { id: 6, min: 40000, max: 54999, color: "text-violet-600" },
    { id: 7, min: 55000, max: 69999, color: "text-purple-600" },
    { id: 8, min: 70000, max: 84999, color: "text-pink-300" },
    { id: 9, min: 85000, max: 94999, color: "text-orange-600" },
    { id: 10, min: 95000, max: 999999, color: "text-yellow-500" },
  ];
}

export function getGitadoraColor(skillPoints) {
  var val = SkillColors.gitadoraSkill.find(
    (x) => skillPoints >= x.min && x.max >= skillPoints
  );
  return val.color;
}

export function getJubilityColor(jubility) {
  var val = SkillColors.jubilitySkill.find(
    (x) => jubility >= x.min && x.max >= jubility
  );
  return val.color;
}
