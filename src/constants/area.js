class AreaConstants {
  static areaData = [
    { id: "US-AL", name: "Alabama", flag: "🇺🇸" },
    { id: "US-AK", name: "Alaska", flag: "🇺🇸" },
    { id: "US-AZ", name: "Arizona", flag: "🇺🇸" },
    { id: "US-AR", name: "Arkansas", flag: "🇺🇸" },
    { id: "US-CA", name: "California", flag: "🇺🇸" },
    { id: "US-CO", name: "Colorado", flag: "🇺🇸" },
    { id: "US-CT", name: "Connecticut", flag: "🇺🇸" },
    { id: "US-DE", name: "Delaware", flag: "🇺🇸" },
    { id: "US-FL", name: "Florida", flag: "🇺🇸" },
    { id: "US-GA", name: "Georgia", flag: "🇺🇸" },
    { id: "US-HI", name: "Hawaii", flag: "🇺🇸" },
    { id: "US-ID", name: "Idaho", flag: "🇺🇸" },
    { id: "US-IL", name: "Illinois", flag: "🇺🇸" },
    { id: "US-IN", name: "Indiana", flag: "🇺🇸" },
    { id: "US-IA", name: "Iowa", flag: "🇺🇸" },
    { id: "US-KS", name: "Kansas", flag: "🇺🇸" },
    { id: "US-KY", name: "Kentucky", flag: "🇺🇸" },
    { id: "US-LA", name: "Louisiana", flag: "🇺🇸" },
    { id: "US-ME", name: "Maine", flag: "🇺🇸" },
    { id: "US-MD", name: "Maryland", flag: "🇺🇸" },
    { id: "US-MA", name: "Massachusetts", flag: "🇺🇸" },
    { id: "US-MI", name: "Michigan", flag: "🇺🇸" },
    { id: "US-MN", name: "Minnesota", flag: "🇺🇸" },
    { id: "US-MS", name: "Mississippi", flag: "🇺🇸" },
    { id: "US-MO", name: "Missouri", flag: "🇺🇸" },
    { id: "US-MT", name: "Montana", flag: "🇺🇸" },
    { id: "US-NE", name: "Nebraska", flag: "🇺🇸" },
    { id: "US-NV", name: "Nevada", flag: "🇺🇸" },
    { id: "US-NH", name: "New Hampshire", flag: "🇺🇸" },
    { id: "US-NJ", name: "New Jersey", flag: "🇺🇸" },
    { id: "US-NM", name: "New Mexico", flag: "🇺🇸" },
    { id: "US-NY", name: "New York", flag: "🇺🇸" },
    { id: "US-NC", name: "North Carolina", flag: "🇺🇸" },
    { id: "US-ND", name: "North Dakota", flag: "🇺🇸" },
    { id: "US-OH", name: "Ohio", flag: "🇺🇸" },
    { id: "US-OK", name: "Oklahoma", flag: "🇺🇸" },
    { id: "US-OR", name: "Oregon", flag: "🇺🇸" },
    { id: "US-PA", name: "Pennsylvania", flag: "🇺🇸" },
    { id: "US-RI", name: "Rhode Island", flag: "🇺🇸" },
    { id: "US-SC", name: "South Carolina", flag: "🇺🇸" },
    { id: "US-SD", name: "South Dakota", flag: "🇺🇸" },
    { id: "US-TN", name: "Tennessee", flag: "🇺🇸" },
    { id: "US-TX", name: "Texas", flag: "🇺🇸" },
    { id: "US-UT", name: "Utah", flag: "🇺🇸" },
    { id: "US-VT", name: "Vermont", flag: "🇺🇸" },
    { id: "US-VA", name: "Virginia", flag: "🇺🇸" },
    { id: "US-WA", name: "Washington", flag: "🇺🇸" },
    { id: "US-WV", name: "West Virginia", flag: "🇺🇸" },
    { id: "US-WI", name: "Wisconsin", flag: "🇺🇸" },
    { id: "US-WY", name: "Wyoming", flag: "🇺🇸" },
    { id: "CA", name: "Canada", flag: "🇨🇦" },
    { id: "MX", name: "Mexico", flag: "🇲🇽" },
    { id: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { id: "FR", name: "France", flag: "🇫🇷" },
    { id: "DE", name: "Germany", flag: "🇩🇪" },
    { id: "IT", name: "Italy", flag: "🇮🇹" },
    { id: "JP", name: "Japan", flag: "🇯🇵" },
    { id: "CN", name: "China", flag: "🇨🇳" },
    { id: "IN", name: "India", flag: "🇮🇳" },
    { id: "BR", name: "Brazil", flag: "🇧🇷" },
    { id: "AU", name: "Australia", flag: "🇦🇺" },
  ];
}

export function listCodes() {
  var areaCodes = [];
  for (const object of AreaConstants.areaData) {
    areaCodes.push(object.id);
  }
  return areaCodes;
}

export function getArea(Code) {
  return AreaConstants.areaData.find((x) => x.id == Code);
}
