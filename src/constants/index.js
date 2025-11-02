import Greetings from "@/constants/greetings.json";
import { BishiBashiOptions } from "@/constants/gameOptions/bishiOptions";
import { DDRClassOptions } from "@/constants/gameOptions/ddrclassOptions";
import { DDROptions } from "@/constants/gameOptions/ddrOptions";
import { GFDMOptions } from "@/constants/gameOptions/gfdmOptions";
import { IIDXOptions } from "@/constants/gameOptions/iidxOptions";
import { IIDXClassOptions } from "@/constants/gameOptions/iidxClassOptions";
import { LovePlusOptions } from "@/constants/gameOptions/lovePlusOptions";
import { MusecaOptions } from "@/constants/gameOptions/musecaOptions";
import { NostalgiaOptions } from "@/constants/gameOptions/nostalgiaOptions";
import { PaseliChargeOptions } from "@/constants/gameOptions/paseliOptions";
import { PopnMusicOptions } from "@/constants/gameOptions/popnOptions";
import { ReflecBeatOptions } from "@/constants/gameOptions/reflecOptions";
import { SDVXOptions } from "@/constants/gameOptions/sdvxOptions";
import { WinningElevenOptions } from "@/constants/gameOptions/weOptions";
import { SilentScopeOptions } from "@/constants/gameOptions/silentScopeOptions";
const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

export class GameConstants {
  static BEATSTREAM = "bst";
  static BISHI_BASHI = "bishi";
  static BISHI_BASHI_NEW = "newbishi";
  static DANCE_EVOLUTION = "danevo";
  static DANCE_RUSH = "dancerush";
  static DDR = "ddr";
  static DDRCLASS = "ddrclass";
  static DDROMNI = "ddromni";
  static DRUMMANIA = "dm";
  static EEMALL = "eemall";
  static FUTURETOMTOM = "ftt";
  static GITADORA_DM = "gitadora_dm";
  static GITADORA_GF = "gitadora_gf";
  static GUITARFREAKS = "gf";
  static IIDX = "iidx";
  static IIDXCLASS = "iidxclass";
  static JUBEAT = "jubeat";
  static LOVEPLUS = "loveplus";
  static MGA = "metalgear";
  static MUSECA = "museca";
  static NOSTALGIA = "nost";
  static OTOMEDIUS = "oto";
  static OTOCA = "otoca";
  static PASELI_CHARGE_MACHINE = "paseli";
  static POPN_HELLO = "hpm";
  static POPN_MUSIC = "pnm";
  static QMA = "qma";
  static REFLEC_BEAT = "reflec";
  static ROAD_FIGHTERS = "roadfighters";
  static SDVX = "sdvx";
  static SILENT_HILL = "sha";
  static SILENT_SCOPE = "scope";
  static TSUMTSUM = "tsum";
  static WINNING_ELEVEN = "weac";
}

export class VersionConstants {
  static BEATSTREAM = 1;
  static BEATSTREAM_2 = 2;

  static THE_STAR_BISHI_BASHI = 1;
  static BISHI_BASHI_CHANNEL = 1;

  static DANCE_EVOLUTION = 1;

  static DANCE_RUSH_STARDOM = 1;

  static DDR_CS_SOLO = 200;
  static DDR_1ST_MIX = 1;
  static DDR_2ND_MIX = 2;
  static DDR_3RD_MIX = 3;
  static DDR_4TH_MIX = 4;
  static DDR_5TH_MIX = 5;
  static DDR_MAX = 6;
  static DDR_MAX2 = 7;
  static DDR_EXTREME = 8;
  static DDR_SUPERNOVA = 9;
  static DDR_SUPERNOVA_2 = 10;
  static DDR_X = 11;
  static DDR_X2 = 12;
  static DDR_X3_VS_2ND_MIX = 13;
  static DDR_2013 = 14;
  static DDR_2014 = 15;
  static DDR_ACE = 16;
  static DDR_A20 = 17;
  static DDR_A20_PLUS = 18;
  static DDR_A3 = 19;
  static DDR_WORLD = 20;

  static DRUMMANIA_1ST = 1;
  static DRUMMANIA_2ND = 2;
  static DRUMMANIA_3RD = 3;
  static DRUMMANIA_4TH = 4;
  static DRUMMANIA_5TH = 5;
  static DRUMMANIA_6TH = 6;
  static DRUMMANIA_7TH = 7;
  static DRUMMANIA_8TH = 8;
  static DRUMMANIA_9TH = 9;
  static DRUMMANIA_10TH = 10;
  static DRUMMANIA_V = 11;
  static DRUMMANIA_V2 = 12;
  static DRUMMANIA_V3 = 13;
  static DRUMMANIA_V4 = 14;
  static DRUMMANIA_V5 = 15;
  static DRUMMANIA_V6 = 16;
  static DRUMMANIA_V7 = 17;
  static DRUMMANIA_V8 = 18;

  static EEMALL = 1;
  static EEMALL_2ND = 2;

  static FUTURETOMTOM = 1;
  static FUTURETOMTOM_VER2 = 2;

  static GITADORA = 1;
  static GITADORA_OVERDRIVE = 2;
  static GITADORA_TRIBOOST = 3;
  static GITADORA_TRIBOOST_RE_EVOLVE = 4;
  static GITADORA_MATIXX = 5;
  static GITADORA_EXCHAIN = 6;
  static GITADORA_NEXTAGE = 7;
  static GITADORA_HIGH_VOLTAGE = 8;
  static GITADORA_FUZZUP = 9;

  static GUITARFREAKS_1ST = 0;
  static GUITARFREAKS_2ND = 1;
  static GUITARFREAKS_3RD = 2;
  static GUITARFREAKS_4TH = 3;
  static GUITARFREAKS_5TH = 4;
  static GUITARFREAKS_6TH = 5;
  static GUITARFREAKS_7TH = 6;
  static GUITARFREAKS_8TH = 7;
  static GUITARFREAKS_9TH = 8;
  static GUITARFREAKS_10TH = 9;
  static GUITARFREAKS_11TH = 10;
  static GUITARFREAKS_V = 11;
  static GUITARFREAKS_V2 = 12;
  static GUITARFREAKS_V3 = 13;
  static GUITARFREAKS_V4 = 14;
  static GUITARFREAKS_V5 = 15;
  static GUITARFREAKS_V6 = 16;
  static GUITARFREAKS_V7 = 17;
  static GUITARFREAKS_V8 = 18;

  static IIDX = 1;
  static IIDX_2ND_STYLE = 2;
  static IIDX_3RD_STYLE = 3;
  static IIDX_4TH_STYLE = 4;
  static IIDX_5TH_STYLE = 5;
  static IIDX_6TH_STYLE = 6;
  static IIDX_7TH_STYLE = 7;
  static IIDX_8TH_STYLE = 8;
  static IIDX_9TH_STYLE = 9;
  static IIDX_10TH_STYLE = 10;
  static IIDX_RED = 11;
  static IIDX_HAPPY_SKY = 12;
  static IIDX_DISTORTED = 13;
  static IIDX_GOLD = 14;
  static IIDX_DJ_TROOPERS = 15;
  static IIDX_EMPRESS = 16;
  static IIDX_SIRIUS = 17;
  static IIDX_RESORT_ANTHEM = 18;
  static IIDX_LINCLE = 19;
  static IIDX_TRICORO = 20;
  static IIDX_SPADA = 21;
  static IIDX_PENDUAL = 22;
  static IIDX_COPULA = 23;
  static IIDX_SINOBUZ = 24;
  static IIDX_CANNON_BALLERS = 25;
  static IIDX_ROOTAGE = 26;
  static IIDX_HEROIC_VERSE = 27;
  static IIDX_BISTROVER = 28;
  static IIDX_CASTHOUR = 29;
  static IIDX_RESIDENT = 30;
  static IIDX_EPOLIS = 31;
  static IIDX_PINKY_CRUSH = 32;

  static JUBEAT = 1;
  static JUBEAT_RIPPLES = 2;
  static JUBEAT_RIPPLES_APPEND = 3;
  static JUBEAT_KNIT = 4;
  static JUBEAT_KNIT_APPEND = 5;
  static JUBEAT_COPIOUS = 6;
  static JUBEAT_COPIOUS_APPEND = 7;
  static JUBEAT_SAUCER = 8;
  static JUBEAT_SAUCER_FULFILL = 9;
  static JUBEAT_PROP = 10;
  static JUBEAT_QUBELL = 11;
  static JUBEAT_CLAN = 12;
  static JUBEAT_FESTO = 13;
  static JUBEAT_AVE = 14;

  static LOVEPLUS_ARCADE = 1;
  static LOVEPLUS_CC = 2;

  static METALGEAR_ARCADE = 1;

  static MUSECA = 1;
  static MUSECA_1_PLUS = 2;

  static NOSTALGIA = 1;
  static NOSTALGIA_FORTE = 2;
  static NOSTALGIA_OP_2 = 3;
  static NOSTALGIA_OP_3 = 4;

  static OTOMEDIUS = 1;

  static OTOCA_DOLL = 1;

  static PASELI_CHARGE_MACHINE = 1;

  static HELLO_POPN_MUSIC = 1;

  static POPN_MUSIC = 1;
  static POPN_MUSIC_2 = 2;
  static POPN_MUSIC_3 = 3;
  static POPN_MUSIC_4 = 4;
  static POPN_MUSIC_5 = 5;
  static POPN_MUSIC_6 = 6;
  static POPN_MUSIC_7 = 7;
  static POPN_MUSIC_8 = 8;
  static POPN_MUSIC_9 = 9;
  static POPN_MUSIC_10 = 10;
  static POPN_MUSIC_11 = 11;
  static POPN_MUSIC_IROHA = 12;
  static POPN_MUSIC_CARNIVAL = 13;
  static POPN_MUSIC_FEVER = 14;
  static POPN_MUSIC_ADVENTURE = 15;
  static POPN_MUSIC_PARTY = 16;
  static POPN_MUSIC_THE_MOVIE = 17;
  static POPN_MUSIC_SENGOKU_RETSUDEN = 18;
  static POPN_MUSIC_TUNE_STREET = 19;
  static POPN_MUSIC_FANTASIA = 20;
  static POPN_MUSIC_SUNNY_PARK = 21;
  static POPN_MUSIC_LAPISTORIA = 22;
  static POPN_MUSIC_ECLALE = 23;
  static POPN_MUSIC_USANEKO = 24;
  static POPN_MUSIC_PEACE = 25;
  static POPN_MUSIC_KAIMEI_RIDDLES = 26;
  static POPN_MUSIC_UNILAB = 27;

  static QMA = 1;
  static QMA_II = 2;
  static QMA_III = 3;
  static QMA_IV = 4;
  static QMA_V = 5;
  static QMA_VI = 6;
  static QMA_VII = 7;
  static QMA_VIII = 8;
  static QMA_GATE = 9;
  static QMA_CAMPUS = 10;
  static QMA_DAWN = 11;
  static QMA_TOKYO = 12;
  static QMA_EVOLVE = 13;
  static QMA_MAXIVCORD = 14;
  static QMA_XROSS_VOYAGE = 15;
  static QMA_KIBOU = 16;
  static QMA_MUGEN = 17;

  static REFLEC_BEAT = 1;
  static REFLEC_BEAT_LIMELIGHT = 2;
  static REFLEC_BEAT_COLETTE = 3;
  static REFLEC_BEAT_GROOVIN = 4;
  static REFLEC_BEAT_VOLZZA = 5;
  static REFLEC_BEAT_VOLZZA_2 = 6;
  static REFLEC_BEAT_REFLESIA = 7;

  static ROAD_FIGHTERS = 1;

  static SDVX_BOOTH = 1;
  static SDVX_INFINITE_INFECTION = 2;
  static SDVX_GRAVITY_WARS = 3;
  static SDVX_HEAVENLY_HAVEN = 4;
  static SDVX_VIVID_WAVE = 5;
  static SDVX_EXCEED_GEAR = 6;

  static SILENT_HILL_ARCADE = 1;

  static SILENT_SCOPE_BONE_EATER = 1;

  static DISNEY_TSUM_TSUM = 1;

  static WINNING_ELEVEN_2008 = 1;
  static WINNING_ELEVEN_2010 = 2;
  static WINNING_ELEVEN_2012 = 3;
  static WINNING_ELEVEN_2014 = 4;
}

export function GetRandomMessage() {
  const greetings = Greetings; // Assuming Greetings is a promise

  const key = crypto.getRandomValues(new Uint32Array(1))[0] % greetings.length; // "How random do you want it?" Yes.
  const selected = greetings[key];

  if (typeof selected.header !== "string") {
    selected.comment = "Show me your moves.";
    selected.author = "PhaseII server";
  }

  selected.header =
    typeof selected.header === "string"
      ? selected.header.split("<username>")
      : ["Heyo, ", "!"];

  return selected;
}

const GITADORA_VERSION_DATA = [
  {
    id: VersionConstants.GITADORA,
    label: "Original",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_OVERDRIVE,
    label: "OverDrive",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_TRIBOOST,
    label: "Tri-Boost",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_TRIBOOST_RE_EVOLVE,
    label: "Tri-Boost RE:Evolve",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_MATIXX,
    label: "Matixx",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_EXCHAIN,
    label: "EXCHAIN",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_NEXTAGE,
    label: "Nex+Age",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_HIGH_VOLTAGE,
    label: "HIGH-VOLTAGE",
    maxRivals: 3,
  },
  {
    id: VersionConstants.GITADORA_FUZZUP,
    label: "FUZZUP",
    maxRivals: 3,
  },
];

export const gameData = [
  {
    id: GameConstants.BEATSTREAM,
    name: "BeatStream",
    icon: null,
    cardBG: null,
    noRivals: true,
    useUnicode: true,
    scoreHeaders: [
      { text: "Combos", value: "data.combo" },
      { text: "Medal", value: "data.medal" },
    ],
    chartTable: {
      0: "LIGHT",
      1: "MEDIUM",
      2: "BEAST",
      3: "NIGHTMARE",
    },
    medalTable: {
      0: "",
      1: "FAILED",
      2: "SAVED",
      3: "CLEAR",
      4: "FULL COMBO",
      5: "PERFECT",
    },
    rankTable: {
      0: "PERFECT AAA",
      1: "AAA",
      2: "AA",
      3: "A",
      4: "B",
      5: "C",
      6: "D",
    },
    versions: [
      {
        id: VersionConstants.BEATSTREAM,
        label: "Original",
      },
      {
        id: VersionConstants.BEATSTREAM_2,
        label: "アニムトライヴ",
      },
    ],
  },
  {
    id: GameConstants.BISHI_BASHI,
    name: "The ⭐ Bishi Bashi",
    icon: null,
    cardBG: null,
    noRivals: true,
    noScores: true,
    noRecords: true,
    skip: true,
    useUnicode: true,
    gameOptions: BishiBashiOptions,
    playerHeaders: [
      { text: "Region", value: "region", sortable: true, width: 100 },
      { text: "Home Arcade", value: "homeArcade", sortable: true, width: 150 },
    ],
  },
  {
    id: GameConstants.BISHI_BASHI_NEW,
    name: "BishiBashi Channel",
    icon: null,
    cardBG: null,
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.DANCE_EVOLUTION,
    name: "DanceEvolution",
    icon: null,
    cardBG: null,
    noRivals: true,
    noScores: true,
    noRecords: true,
    skip: true,
    useUnicode: true,
  },
  {
    id: GameConstants.DANCE_RUSH,
    name: "DanceRush",
    icon: null,
    cardBG: null,
    noRivals: true,
    scoreHeaders: [{ text: "Combos", value: "data.combo" }],
    chartTable: {
      0: "1A",
      1: "2A",
      2: "1B",
      3: "2B",
    },
    medalTable: {
      0: "",
      1: "FAILED",
      2: "SAVED",
      3: "CLEAR",
      4: "FULL COMBO",
      5: "PERFECT",
    },
    rankTable: {
      0: "⭐",
      1: "⭐⭐",
      2: "⭐⭐⭐",
      3: "⭐⭐⭐⭐",
      4: "⭐⭐⭐⭐⭐",
    },
    versions: [
      {
        id: VersionConstants.DANCE_RUSH_STARDOM,
        label: "STARDOM",
      },
    ],
  },
  {
    id: GameConstants.DDR,
    name: "DanceDanceRevolution",
    shortName: "DDR",
    icon: null,
    cardBG: null,
    gameOptions: DDROptions,
    useActiveRival: true,
    videoTable: [
      VersionConstants.DDR_ACE,
      VersionConstants.DDR_A20,
      VersionConstants.DDR_A20_PLUS,
      VersionConstants.DDR_A3,
    ],
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Halo", value: "data.halo", width: 80 },
    ],
    chartTable: {
      0: "SP BEGINNER",
      1: "SP BASIC",
      2: "SP DIFFICULT",
      3: "SP EXPERT",
      4: "SP CHALLENGE",
      5: "DP BEGINNER",
      6: "DP BASIC",
      7: "DP DIFFICULT",
      8: "DP EXPERT",
      9: "DP CHALLENGE",
    },
    haloTable: {
      100: "",
      1000: "FAILED",
      2000: "CLEARED",
      600: "",
      4000: "LIFE4 CLEARED",
      200: "FULL COMBO",
      300: "GREAT FULL COMBO",
      400: "PERFECT FULL COMBO",
      500: "MARVELOUS FULL COMBO",
    },
    rankTable: {
      100: "E",
      200: "D",
      233: "D+",
      266: "C-",
      300: "C",
      333: "C+",
      366: "B-",
      400: "B",
      433: "B+",
      466: "A-",
      500: "A",
      533: "A+",
      566: "AA-",
      600: "AA",
      650: "AA+",
      700: "AAA",
    },
    versions: [
      {
        id: VersionConstants.DDR_1ST_MIX,
        label: "1ST MIX",
      },
      {
        id: VersionConstants.DDR_2ND_MIX,
        label: "2ND MIX",
      },
      {
        id: VersionConstants.DDR_3RD_MIX,
        label: "3RD MIX",
      },
      {
        id: VersionConstants.DDR_4TH_MIX,
        label: "4TH MIX",
      },
      {
        id: VersionConstants.DDR_5TH_MIX,
        label: "5TH MIX",
      },
      {
        id: VersionConstants.DDR_MAX,
        label: "MAX",
      },
      {
        id: VersionConstants.DDR_MAX2,
        label: "MAX 2",
      },
      {
        id: VersionConstants.DDR_EXTREME,
        label: "EXTREME",
      },
      {
        id: VersionConstants.DDR_SUPERNOVA,
        label: "SuperNOVA",
      },
      {
        id: VersionConstants.DDR_SUPERNOVA_2,
        label: "SuperNOVA 2",
      },
      {
        id: VersionConstants.DDR_X,
        label: "X",
        maxRivals: 10,
        maxActiveRivals: 1,
      },
      {
        id: VersionConstants.DDR_X2,
        label: "X2",
        maxRivals: 10,
        maxActiveRivals: 1,
      },
      {
        id: VersionConstants.DDR_X3_VS_2ND_MIX,
        label: "X3 vs. 2ND MIX",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_2013,
        label: "(2013)",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_2014,
        label: "(2014)",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_ACE,
        label: "Ace",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_A20,
        label: "A20",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_A20_PLUS,
        label: "A20 PLUS",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_A3,
        label: "A3",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
      {
        id: VersionConstants.DDR_WORLD,
        label: "WORLD",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.DDRCLASS,
    name: "Classic DDR",
    icon: `${ASSET_PATH}/icon/ddr.webp`,
    cardBG: `${ASSET_PATH}/card/ddr.webp`,
    assetId: "ddr",
    noRivals: true,
    noScores: true,
    noRecords: true,
    gameOptions: DDRClassOptions,
    versions: [
      {
        id: VersionConstants.DDR_1ST_MIX,
        label: "1ST MIX",
      },
      {
        id: VersionConstants.DDR_2ND_MIX,
        label: "2ND MIX",
      },
      {
        id: VersionConstants.DDR_3RD_MIX,
        label: "3RD MIX",
      },
      {
        id: VersionConstants.DDR_4TH_MIX,
        label: "4TH MIX",
      },
      {
        id: VersionConstants.DDR_5TH_MIX,
        label: "5TH MIX",
      },
      {
        id: VersionConstants.DDR_MAX,
        label: "MAX",
      },
      {
        id: VersionConstants.DDR_MAX2,
        label: "MAX 2",
      },
      {
        id: VersionConstants.DDR_EXTREME,
        label: "EXTREME",
      },
      {
        id: VersionConstants.DDR_SUPERNOVA,
        label: "SuperNOVA",
      },
      {
        id: VersionConstants.DDR_SUPERNOVA_2,
        label: "SuperNOVA 2",
      },
    ],
  },
  {
    id: GameConstants.DDROMNI,
    name: "DDR OmniMIX",
    icon: `${ASSET_PATH}/icon/ddr.webp`,
    cardBG: `${ASSET_PATH}/card/ddr.webp`,
    assetId: "ddr",
    gameOptions: DDROptions,
    useActiveRival: true,
    videoTable: [VersionConstants.DDR_A20_PLUS],
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Halo", value: "data.halo", width: 80 },
    ],
    chartTable: {
      0: "SP BEGINNER",
      1: "SP BASIC",
      2: "SP DIFFICULT",
      3: "SP EXPERT",
      4: "SP CHALLENGE",
      5: "DP BEGINNER",
      6: "DP BASIC",
      7: "DP DIFFICULT",
      8: "DP EXPERT",
      9: "DP CHALLENGE",
    },
    haloTable: {
      100: "",
      1000: "FAILED",
      2000: "CLEARED",
      600: "",
      4000: "LIFE4 CLEARED",
      200: "FULL COMBO",
      300: "GREAT FULL COMBO",
      400: "PERFECT FULL COMBO",
      500: "MARVELOUS FULL COMBO",
    },
    rankTable: {
      100: "E",
      200: "D",
      233: "D+",
      266: "C-",
      300: "C",
      333: "C+",
      366: "B-",
      400: "B",
      433: "B+",
      466: "A-",
      500: "A",
      533: "A+",
      566: "AA-",
      600: "AA",
      650: "AA+",
      700: "AAA",
    },
    versions: [
      {
        id: VersionConstants.DDR_1ST_MIX,
        label: "1ST MIX",
      },
      {
        id: VersionConstants.DDR_2ND_MIX,
        label: "2ND MIX",
      },
      {
        id: VersionConstants.DDR_3RD_MIX,
        label: "3RD MIX",
      },
      {
        id: VersionConstants.DDR_4TH_MIX,
        label: "4TH MIX",
      },
      {
        id: VersionConstants.DDR_5TH_MIX,
        label: "5TH MIX",
      },
      {
        id: VersionConstants.DDR_MAX,
        label: "MAX",
      },
      {
        id: VersionConstants.DDR_MAX2,
        label: "MAX 2",
      },
      {
        id: VersionConstants.DDR_EXTREME,
        label: "EXTREME",
      },
      {
        id: VersionConstants.DDR_SUPERNOVA,
        label: "SuperNOVA",
      },
      {
        id: VersionConstants.DDR_SUPERNOVA_2,
        label: "SuperNOVA 2",
      },
      {
        id: VersionConstants.DDR_X,
        label: "X",
      },
      {
        id: VersionConstants.DDR_X2,
        label: "X2",
      },
      {
        id: VersionConstants.DDR_X3_VS_2ND_MIX,
        label: "X3 vs. 2ND MIX",
      },
      {
        id: VersionConstants.DDR_2013,
        label: "(2013)",
      },
      {
        id: VersionConstants.DDR_2014,
        label: "(2014)",
      },
      {
        id: VersionConstants.DDR_ACE,
        label: "A",
      },
      {
        id: VersionConstants.DDR_A20,
        label: "A20",
      },
      {
        id: VersionConstants.DDR_A20_PLUS,
        label: "OmniMIX (A20 PLUS)",
        maxRivals: 10,
        maxActiveRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.DRUMMANIA,
    name: "DRUMMANIA",
    icon: null,
    cardBG: null,
    gameOptions: GFDMOptions,
    playerHeaders: [
      {
        text: "SKILL LEVEL",
        value: "profile_skill",
        sortable: true,
        width: 120,
      },
      {
        text: "SKILL POINT",
        value: "skill",
        sortable: true,
        width: 150,
      },
    ],
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Medal", value: "medal", width: 100 },
      { text: "SKILL %", value: "data.skill_perc", width: 90 },
      { text: "SKILL POINT", value: "data.skill_points", width: 140 },
    ],
    chartTable: {
      0: "BEGINNER",
      1: "BASIC",
      2: "ADVANCED",
      3: "EXTREME",
    },
    rankTable: {
      7: "NO PLAY",
      6: "D",
      5: "C",
      4: "B",
      3: "A",
      2: "AA",
      1: "AAA",
      0: "S",
    },
    versions: [
      {
        id: VersionConstants.DRUMMANIA_1ST,
        label: "1ST MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_2ND,
        label: "2ND MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_3RD,
        label: "3RD MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_4TH,
        label: "4TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_5TH,
        label: "5TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_6TH,
        label: "6TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_7TH,
        label: "7TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_8TH,
        label: "8TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_9TH,
        label: "9TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_10TH,
        label: "10TH MIX",
      },
      {
        id: VersionConstants.DRUMMANIA_V,
        label: "V",
      },
      {
        id: VersionConstants.DRUMMANIA_V2,
        label: "V2",
      },
      {
        id: VersionConstants.DRUMMANIA_V3,
        label: "V3",
      },
      {
        id: VersionConstants.DRUMMANIA_V4,
        label: "V4: ROCKxROCK",
        maxRivals: 3,
      },
      {
        id: VersionConstants.DRUMMANIA_V5,
        label: "V5: ROCK TO INFINITY!",
        maxRivals: 3,
      },
      {
        id: VersionConstants.DRUMMANIA_V6,
        label: "V6: BLAZING!!!!",
        maxRivals: 3,
      },
      {
        id: VersionConstants.DRUMMANIA_V7,
        label: "V7",
        maxRivals: 3,
      },
      {
        id: VersionConstants.DRUMMANIA_V8,
        label: "V8",
        maxRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.EEMALL,
    name: "eeMall",
    icon: null,
    cardBG: null,
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
    versions: [
      {
        id: VersionConstants.EEMALL,
        label: "1st Avenue",
      },
      {
        id: VersionConstants.EEMALL_2ND,
        label: "2nd Avenue",
      },
    ],
  },
  {
    id: GameConstants.FUTURETOMTOM,
    name: "Future Tom Tom",
    icon: null,
    cardBG: null,
    noRivals: true,
    noScores: true,
    noRecords: true,
    useUnicode: true,
    versions: [
      {
        id: VersionConstants.FUTURETOMTOM,
        label: "Ver 1",
      },
      {
        id: VersionConstants.FUTURETOMTOM_VER2,
        label: "Ver 2",
      },
    ],
  },
  {
    id: GameConstants.GITADORA_DM,
    name: "GITADORA (Drums)",
    shortName: "GITADORA (DM)",
    icon: null,
    cardBG: null,
    videoTable: [
      VersionConstants.GITADORA,
      VersionConstants.GITADORA_OVERDRIVE,
      VersionConstants.GITADORA_TRIBOOST,
      VersionConstants.GITADORA_TRIBOOST_RE_EVOLVE,
      VersionConstants.GITADORA_MATIXX,
      VersionConstants.GITADORA_EXCHAIN,
      VersionConstants.GITADORA_NEXTAGE,
      VersionConstants.GITADORA_HIGH_VOLTAGE,
      VersionConstants.GITADORA_FUZZUP,
    ],
    noRivals: true,
    playerHeaders: [
      {
        text: "SKILL POINT",
        value: "skill",
        sortable: true,
        width: 150,
      },
    ],
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Medal", value: "medal", width: 140 },
      { text: "SKILL %", value: "data.perc", width: 90 },
      { text: "SKILL POINT", value: "data.new_skill", width: 140 },
    ],
    chartTable: {
      6: "BASIC",
      7: "ADVANCED",
      8: "EXTREME",
      9: "MASTER",
    },
    rankTable: {
      100: "E",
      200: "D",
      300: "C",
      400: "B",
      500: "A",
      600: "S",
      700: "SS",
      800: "EXC",
    },
    difficultyDenom: 10,
    versions: GITADORA_VERSION_DATA,
  },
  {
    id: GameConstants.GITADORA_GF,
    name: "GITADORA (Guitar)",
    shortName: "GITADORA (GF)",
    icon: null,
    cardBG: null,
    videoTable: [
      VersionConstants.GITADORA,
      VersionConstants.GITADORA_OVERDRIVE,
      VersionConstants.GITADORA_TRIBOOST,
      VersionConstants.GITADORA_TRIBOOST_RE_EVOLVE,
      VersionConstants.GITADORA_MATIXX,
      VersionConstants.GITADORA_EXCHAIN,
      VersionConstants.GITADORA_NEXTAGE,
      VersionConstants.GITADORA_HIGH_VOLTAGE,
      VersionConstants.GITADORA_FUZZUP,
    ],
    noRivals: true,
    playerHeaders: [
      {
        text: "SKILL POINT",
        value: "skill",
        sortable: true,
        width: 150,
      },
    ],
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Medal", value: "medal", width: 140 },
      { text: "SKILL %", value: "data.perc", width: 90 },
      { text: "SKILL POINT", value: "data.new_skill", width: 140 },
    ],
    chartTable: {
      1: "GUITAR BASIC",
      2: "GUITAR ADVANCED",
      3: "GUITAR EXTREME",
      4: "GUITAR MASTER",
      11: "BASS BASIC",
      12: "BASS ADVANCED",
      13: "BASS EXTREME",
      14: "BASS MASTER",
    },
    rankTable: {
      100: "E",
      200: "D",
      300: "C",
      400: "B",
      500: "A",
      600: "S",
      700: "SS",
      800: "EXC",
    },
    difficultyDenom: 10,
    versions: GITADORA_VERSION_DATA,
  },
  {
    id: GameConstants.GUITARFREAKS,
    name: "GUITAR FREAKS",
    icon: null,
    cardBG: null,
    gameOptions: GFDMOptions,
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Medal", value: "medal", width: 100 },
      { text: "SKILL %", value: "data.skill_perc", width: 90 },
      { text: "SKILL POINT", value: "data.skill_points", width: 140 },
    ],
    chartTable: {
      0: "GUITAR BEGINNER",
      1: "GUITAR BASIC",
      2: "GUITAR ADVANCED",
      3: "GUITAR EXTREME",
      4: "BASS BEGINNER",
      5: "BASS BASIC",
      6: "BASS ADVANCED",
      7: "BASS EXTREME",
      8: "OPEN BEGINNER",
      9: "OPEN BASIC",
      10: "OPEN ADVANCED",
      11: "OPEN EXTREME",
    },
    rankTable: {
      7: "NO PLAY",
      6: "S",
      5: "AA",
      4: "A",
      3: "B",
      2: "C",
      1: "D",
      0: "F",
    },
    playerHeaders: [
      {
        text: "SKILL LEVEL",
        value: "profile_skill",
        sortable: true,
        width: 120,
      },
      {
        text: "SKILL POINT",
        value: "skill",
        sortable: true,
        width: 150,
      },
    ],
    versions: [
      {
        id: VersionConstants.GUITARFREAKS_1ST,
        label: "1ST MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_2ND,
        label: "2ND MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_3RD,
        label: "3RD MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_4TH,
        label: "4TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_5TH,
        label: "5TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_6TH,
        label: "6TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_7TH,
        label: "7TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_8TH,
        label: "8TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_9TH,
        label: "9TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_10TH,
        label: "10TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_11TH,
        label: "11TH MIX",
      },
      {
        id: VersionConstants.GUITARFREAKS_V,
        label: "V",
      },
      {
        id: VersionConstants.GUITARFREAKS_V2,
        label: "V2",
      },
      {
        id: VersionConstants.GUITARFREAKS_V3,
        label: "V3",
      },
      {
        id: VersionConstants.GUITARFREAKS_V4,
        label: "V4: ROCKxROCK",
        maxRivals: 3,
      },
      {
        id: VersionConstants.GUITARFREAKS_V5,
        label: "V5: ROCK TO INFINITY!",
        maxRivals: 3,
      },
      {
        id: VersionConstants.GUITARFREAKS_V6,
        label: "V6: BLAZING!!!!",
        maxRivals: 3,
      },
      {
        id: VersionConstants.GUITARFREAKS_V7,
        label: "V7",
        maxRivals: 3,
      },
      {
        id: VersionConstants.GUITARFREAKS_V8,
        label: "V8",
        maxRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.IIDX,
    name: "beatmaniaIIDX",
    shortName: "IIDX",
    icon: `${ASSET_PATH}/icon/iidx.webp`,
    cardBG: `${ASSET_PATH}/card/iidx.webp`,
    assetId: "iidx",
    gameOptions: IIDXOptions,
    splitRivals: true,
    videoTable: [
      VersionConstants.IIDX_TRICORO,
      VersionConstants.IIDX_SPADA,
      VersionConstants.IIDX_PENDUAL,
      VersionConstants.IIDX_COPULA,
      VersionConstants.IIDX_SINOBUZ,
      VersionConstants.IIDX_CANNON_BALLERS,
      VersionConstants.IIDX_ROOTAGE,
      VersionConstants.IIDX_HEROIC_VERSE,
      VersionConstants.IIDX_BISTROVER,
      VersionConstants.IIDX_CASTHOUR,
      VersionConstants.IIDX_RESIDENT,
      VersionConstants.IIDX_EPOLIS,
      VersionConstants.IIDX_PINKY_CRUSH,
    ],
    scoreHeaders: [
      { text: "Misses", value: "data.misses", width: 100 },
      { text: "Clear Status", value: "data.medal", width: 100 },
    ],
    chartTable: {
      0: "SP NORMAL",
      1: "SP HYPER",
      2: "SP ANOTHER",
      3: "DP NORMAL",
      4: "DP HYPER",
      5: "DP ANOTHER",
      6: "SP BEGINNER",
      7: "SP LEGGENDARIA",
      8: "DP BEGINNER",
      9: "DP LEGGENDARIA",
    },
    rankTable: {
      100: "E",
      200: "D",
      300: "C",
      400: "B",
      500: "A",
      600: "S",
      700: "SS",
      800: "EXC",
    },
    medalTable: {
      50: "NO PLAY",
      100: "FAILED",
      200: "ASSIST CLEAR",
      300: "EAST CLEAR",
      400: "CLEAR",
      500: "HARD CLEAR",
      600: "EX HARD CLEAR",
      700: "FULL COMBO",
    },
    playerHeaders: [
      { text: "SP DAN", value: "sgrade", width: 100 },
      { text: "DP DAN", value: "dgrade", width: 100 },
      {
        text: "SP DJPOINT",
        value: "stats.single_dj_points",
        sortable: true,
        width: 150,
      },
      {
        text: "DP DJPOINT",
        value: "stats.double_dj_points",
        sortable: true,
        width: 150,
      },
    ],
    versions: [
      {
        id: VersionConstants.IIDX,
        label: "1st Style",
      },
      {
        id: VersionConstants.IIDX_2ND_STYLE,
        label: "2nd Style",
      },
      {
        id: VersionConstants.IIDX_3RD_STYLE,
        label: "3rd Style",
      },
      {
        id: VersionConstants.IIDX_4TH_STYLE,
        label: "4th Style",
      },
      {
        id: VersionConstants.IIDX_5TH_STYLE,
        label: "5th Style",
      },
      {
        id: VersionConstants.IIDX_6TH_STYLE,
        label: "6th Style",
      },
      {
        id: VersionConstants.IIDX_7TH_STYLE,
        label: "7th Style",
      },
      {
        id: VersionConstants.IIDX_8TH_STYLE,
        label: "8th Style",
      },
      {
        id: VersionConstants.IIDX_9TH_STYLE,
        label: "9th Style",
      },
      {
        id: VersionConstants.IIDX_10TH_STYLE,
        label: "10th Style",
      },
      {
        id: VersionConstants.IIDX_RED,
        label: "RED",
      },
      {
        id: VersionConstants.IIDX_HAPPY_SKY,
        label: "HAPPY SKY",
      },
      {
        id: VersionConstants.IIDX_DISTORTED,
        label: "DistorteD",
      },
      {
        id: VersionConstants.IIDX_GOLD,
        label: "GOLD",
      },
      {
        id: VersionConstants.IIDX_DJ_TROOPERS,
        label: "DJ TROOPERS",
      },
      {
        id: VersionConstants.IIDX_EMPRESS,
        label: "EMPRESS",
      },
      {
        id: VersionConstants.IIDX_SIRIUS,
        label: "SIRIUS",
      },
      {
        id: VersionConstants.IIDX_RESORT_ANTHEM,
        label: "Resort Anthem",
      },
      {
        id: VersionConstants.IIDX_LINCLE,
        label: "Lincle",
      },
      {
        id: VersionConstants.IIDX_TRICORO,
        label: "tricoro",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_SPADA,
        label: "SPADA",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_PENDUAL,
        label: "PENDUAL",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_COPULA,
        label: "COPULA",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_SINOBUZ,
        label: "SINOBUZ",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_CANNON_BALLERS,
        label: "CANNON BALLERS",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_ROOTAGE,
        label: "ROOTAGE",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_HEROIC_VERSE,
        label: "HEROIC VERSE",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_BISTROVER,
        label: "BISTROVER",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_CASTHOUR,
        label: "CastHour",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_RESIDENT,
        label: "RESIDENT",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_EPOLIS,
        label: "EPOLIS",
        maxRivals: 5,
      },
      {
        id: VersionConstants.IIDX_PINKY_CRUSH,
        label: "Pinky Crush",
        maxRivals: 5,
      },
    ],
  },
  {
    id: GameConstants.IIDXCLASS,
    name: "Classic IIDX",
    icon: `${ASSET_PATH}/icon/iidx.webp`,
    cardBG: `${ASSET_PATH}/card/iidx.webp`,
    assetId: "iidx",
    gameOptions: IIDXClassOptions,
    noRivals: true,
    noScores: true,
    noRecords: true,
    playerHeaders: [
      { text: "SP DAN", value: "sgrade", width: 100 },
      { text: "DP DAN", value: "dgrade", width: 100 },
      {
        text: "SP DJPOINT",
        value: "stats.single_dj_points",
        sortable: true,
        width: 150,
      },
      {
        text: "DP DJPOINT",
        value: "stats.double_dj_points",
        sortable: true,
        width: 150,
      },
    ],
    versions: [
      {
        id: VersionConstants.IIDX,
        label: "1st Style",
      },
      {
        id: VersionConstants.IIDX_2ND_STYLE,
        label: "2nd Style",
      },
      {
        id: VersionConstants.IIDX_3RD_STYLE,
        label: "3rd Style",
      },
      {
        id: VersionConstants.IIDX_4TH_STYLE,
        label: "4th Style",
      },
      {
        id: VersionConstants.IIDX_5TH_STYLE,
        label: "5th Style",
      },
      {
        id: VersionConstants.IIDX_6TH_STYLE,
        label: "6th Style",
      },
      {
        id: VersionConstants.IIDX_7TH_STYLE,
        label: "7th Style",
      },
      {
        id: VersionConstants.IIDX_8TH_STYLE,
        label: "8th Style",
      },
      {
        id: VersionConstants.IIDX_9TH_STYLE,
        label: "9th Style",
      },
      {
        id: VersionConstants.IIDX_10TH_STYLE,
        label: "10th Style",
      },
      {
        id: VersionConstants.IIDX_RED,
        label: "RED",
      },
      {
        id: VersionConstants.IIDX_HAPPY_SKY,
        label: "HAPPY SKY",
      },
      {
        id: VersionConstants.IIDX_DISTORTED,
        label: "DistorteD",
      },
      {
        id: VersionConstants.IIDX_GOLD,
        label: "GOLD",
      },
      {
        id: VersionConstants.IIDX_DJ_TROOPERS,
        label: "DJ TROOPERS",
      },
      {
        id: VersionConstants.IIDX_EMPRESS,
        label: "EMPRESS",
      },
      {
        id: VersionConstants.IIDX_SIRIUS,
        label: "SIRIUS",
      },
      {
        id: VersionConstants.IIDX_RESORT_ANTHEM,
        label: "Resort Anthem",
      },
      {
        id: VersionConstants.IIDX_LINCLE,
        label: "Lincle",
      },
    ],
  },
  {
    id: GameConstants.JUBEAT,
    name: "jubeat",
    icon: null,
    cardBG: null,
    scoreHeaders: [
      { text: "Combos", value: "data.combo", width: 80 },
      { text: "Medal", value: "data.medal", width: 120 },
      { text: "Music Rate", value: "data.music_rate", width: 120 },
    ],
    chartTable: {
      0: "BASIC",
      1: "ADVANCED",
      2: "EXTREME",
      3: "BASIC (HARD MODE)",
      4: "ADVANCED (HARD MODE)",
      5: "EXTREME (HARD MODE)",
    },
    rankTable: {
      100: "E",
      200: "D",
      300: "C",
      400: "B",
      500: "A",
      600: "S",
      700: "SS",
      800: "EXC",
    },
    medalTable: {
      100: "FAILED",
      200: "CLEARED",
      300: "NEARLY FULL COMBO",
      400: "FULL COMBO",
      500: "NEARLY EXCELLENT",
      600: "EXCELLENT",
    },
    playerHeaders: [
      { text: "Jubility", value: "jubility", sortable: true, width: 120 },
    ],
    versions: [
      {
        id: VersionConstants.JUBEAT,
        label: "Original",
      },
      {
        id: VersionConstants.JUBEAT_RIPPLES,
        label: "Ripples",
      },
      {
        id: VersionConstants.JUBEAT_RIPPLES_APPEND,
        label: "Ripples (Append)",
      },
      {
        id: VersionConstants.JUBEAT_KNIT,
        label: "Knit",
      },
      {
        id: VersionConstants.JUBEAT_KNIT_APPEND,
        label: "Knit (Append)",
      },
      {
        id: VersionConstants.JUBEAT_COPIOUS,
        label: "Copious",
      },
      {
        id: VersionConstants.JUBEAT_COPIOUS_APPEND,
        label: "Copious (Append)",
      },
      {
        id: VersionConstants.JUBEAT_SAUCER,
        label: "Saucer",
        maxRivals: 3,
      },
      {
        id: VersionConstants.JUBEAT_SAUCER_FULFILL,
        label: "Saucer Fulfill",
        maxRivals: 3,
      },
      {
        id: VersionConstants.JUBEAT_PROP,
        label: "Prop",
        maxRivals: 3,
      },
      {
        id: VersionConstants.JUBEAT_QUBELL,
        label: "Qubell",
        maxRivals: 3,
      },
      {
        id: VersionConstants.JUBEAT_CLAN,
        label: "Clan",
        maxRivals: 3,
      },
      {
        id: VersionConstants.JUBEAT_FESTO,
        label: "Festo",
        maxRivals: 3,
      },
      {
        id: VersionConstants.JUBEAT_AVE,
        label: "Avenue",
        maxRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.LOVEPLUS,
    name: "LovePlus",
    icon: null,
    cardBG: null,
    noRivals: true,
    noScores: true,
    noRecords: true,
    skip: true,
    playerHeaders: [
      { text: "Girlfriend", value: "gf", sortable: true, width: 100 },
    ],
    gameOptions: LovePlusOptions,
    versions: [
      {
        id: VersionConstants.LOVEPLUS_ARCADE,
        label: "Medal",
      },
      {
        id: VersionConstants.LOVEPLUS_CC,
        label: "Colorful Clip",
      },
    ],
  },
  {
    id: GameConstants.MGA,
    name: "Metal Gear Arcade",
    icon: null,
    cardBG: null,
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.MUSECA,
    name: "Museca",
    icon: null,
    cardBG: null,
    gameOptions: MusecaOptions,
    chartTable: {
      0: "GREEN",
      1: "ORANGE",
      2: "RED",
    },
    scoreHeaders: [
      { text: "Combos", value: "combo", width: 80 },
      { text: "Halo", value: "halo", width: 80 },
    ],
    versions: [
      {
        id: VersionConstants.MUSECA,
        label: "Original",
      },
      {
        id: VersionConstants.MUSECA_1_PLUS,
        label: "1 + 1/2",
      },
    ],
  },
  {
    id: GameConstants.NOSTALGIA,
    name: "Nostalgia",
    icon: null,
    cardBG: null,
    gameOptions: NostalgiaOptions,
    chartTable: {
      0: "NORMAL",
      1: "HARD",
      2: "EXPERT",
      3: "REAL",
    },
    scoreHeaders: [
      { text: "Combos", value: "combo", width: 80 },
      { text: "Halo", value: "halo", width: 80 },
    ],
    versions: [
      {
        id: VersionConstants.NOSTALGIA,
        label: "Original",
      },
      {
        id: VersionConstants.NOSTALGIA_FORTE,
        label: "Forte",
      },
      {
        id: VersionConstants.NOSTALGIA_OP_2,
        label: "OP.2",
      },
      {
        id: VersionConstants.NOSTALGIA_OP_3,
        label: "OP.3",
      },
    ],
  },
  {
    id: GameConstants.OTOMEDIUS,
    name: "Otomedius",
    icon: null,
    cardBG: null,
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.OTOCA,
    name: "Otoca d' Or",
    icon: null,
    cardBG: null,
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.PASELI_CHARGE_MACHINE,
    name: "PASELI Charge Machine",
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
    gameOptions: PaseliChargeOptions,
  },
  {
    id: GameConstants.POPN_HELLO,
    name: "Hello! Pop'n Music",
    icon: `${ASSET_PATH}/icon/popn.webp`,
    cardBG: `${ASSET_PATH}/card/popn.webp`,
    assetId: "popn",
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.POPN_MUSIC,
    name: "pop'n music",
    shortName: "pop'n",
    icon: `${ASSET_PATH}/icon/popn.webp`,
    cardBG: `${ASSET_PATH}/card/popn.webp`,
    assetId: "popn",
    useUnicode: true,
    maxLength: 6,
    gameOptions: PopnMusicOptions,
    chartTable: {
      0: "EASY",
      1: "NORMAL",
      2: "HYPER",
      3: "EX",
    },
    scoreHeaders: [
      { text: "Combos", value: "combo", width: 80 },
      { text: "Halo", value: "halo", width: 80 },
    ],
    versions: [
      {
        id: 0,
        label: "CS and Licenses",
      },
      {
        id: VersionConstants.POPN_MUSIC,
        label: "Original",
      },
      {
        id: VersionConstants.POPN_MUSIC_2,
        label: "2",
      },
      {
        id: VersionConstants.POPN_MUSIC_3,
        label: "3",
      },
      {
        id: VersionConstants.POPN_MUSIC_4,
        label: "4",
      },
      {
        id: VersionConstants.POPN_MUSIC_5,
        label: "5",
      },
      {
        id: VersionConstants.POPN_MUSIC_6,
        label: "6",
      },
      {
        id: VersionConstants.POPN_MUSIC_7,
        label: "7",
      },
      {
        id: VersionConstants.POPN_MUSIC_8,
        label: "8",
      },
      {
        id: VersionConstants.POPN_MUSIC_9,
        label: "9",
      },
      {
        id: VersionConstants.POPN_MUSIC_10,
        label: "10",
      },
      {
        id: VersionConstants.POPN_MUSIC_11,
        label: "11",
      },
      {
        id: VersionConstants.POPN_MUSIC_IROHA,
        label: "いろは (Iroha)",
      },
      {
        id: VersionConstants.POPN_MUSIC_CARNIVAL,
        label: "カーニバル (Carnival)",
      },
      {
        id: VersionConstants.POPN_MUSIC_FEVER,
        label: "FEVER!",
      },
      {
        id: VersionConstants.POPN_MUSIC_ADVENTURE,
        label: "ADVENTURE",
      },
      {
        id: VersionConstants.POPN_MUSIC_PARTY,
        label: "PARTY♪",
      },
      {
        id: VersionConstants.POPN_MUSIC_THE_MOVIE,
        label: "THE MOVIE",
      },
      {
        id: VersionConstants.POPN_MUSIC_SENGOKU_RETSUDEN,
        label: "せんごく列伝 (Sengoku Retsuden)",
      },
      {
        id: VersionConstants.POPN_MUSIC_TUNE_STREET,
        label: "TUNE STREET",
        maxRivals: 2,
      },
      {
        id: VersionConstants.POPN_MUSIC_FANTASIA,
        label: "fantasia",
        maxRivals: 2,
      },
      {
        id: VersionConstants.POPN_MUSIC_SUNNY_PARK,
        label: "Sunny Park",
        maxRivals: 2,
      },
      {
        id: VersionConstants.POPN_MUSIC_LAPISTORIA,
        label: "ラピストリア (Lapistoria)",
        maxRivals: 4,
      },
      {
        id: VersionConstants.POPN_MUSIC_ECLALE,
        label: "éclale",
        maxRivals: 4,
      },
      {
        id: VersionConstants.POPN_MUSIC_USANEKO,
        label: "うさぎと猫と少年の夢 (Usaneko)",
        maxRivals: 4,
      },
      {
        id: VersionConstants.POPN_MUSIC_PEACE,
        label: "peace",
        maxRivals: 4,
      },
      {
        id: VersionConstants.POPN_MUSIC_KAIMEI_RIDDLES,
        label: "解明リドルズ (Kaimei riddles)",
        maxRivals: 4,
      },
      {
        id: VersionConstants.POPN_MUSIC_UNILAB,
        label: "UniLab",
        maxRivals: 4,
      },
    ],
  },
  {
    id: GameConstants.QMA,
    name: "Quiz Magic Academy",
    icon: null,
    cardBG: null,
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.REFLEC_BEAT,
    name: "ReflecBeat",
    icon: null,
    cardBG: null,
    useUnicode: true,
    gameOptions: ReflecBeatOptions,
    chartTable: {
      0: "BASIC",
      1: "MEDIUM",
      2: "HARD",
      3: "SPECIAL",
    },
    scoreHeaders: [
      { text: "Combos", value: "combo", width: 80 },
      { text: "Misses", value: "misses", width: 80 },
      { text: "Halo", value: "halo", width: 80 },
    ],
    versions: [
      {
        id: VersionConstants.REFLEC_BEAT,
        label: "Original",
      },
      {
        id: VersionConstants.REFLEC_BEAT_LIMELIGHT,
        label: "Limelight",
        maxRivals: 3,
      },
      {
        id: VersionConstants.REFLEC_BEAT_COLETTE,
        label: "Colette",
        maxRivals: 3,
      },
      {
        id: VersionConstants.REFLEC_BEAT_GROOVIN,
        label: "groovin'!!",
        maxRivals: 3,
      },
      {
        id: VersionConstants.REFLEC_BEAT_VOLZZA,
        label: "VOLZZA",
        maxRivals: 3,
      },
      {
        id: VersionConstants.REFLEC_BEAT_VOLZZA_2,
        label: "VOLZZA 2",
        maxRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.ROAD_FIGHTERS,
    name: "Road Fighters 3D",
    icon: `${ASSET_PATH}/icon/rf.webp`,
    cardBG: `${ASSET_PATH}/card/rf.webp`,
    assetId: "rf",
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
  },
  {
    id: GameConstants.SDVX,
    name: "SOUND VOLTEX",
    shortName: "SDVX",
    icon: null,
    cardBG: null,
    gameOptions: SDVXOptions,
    chartTable: {
      0: "NOVICE",
      1: "ADVANCED",
      2: "EXHAUST",
      3: "INFINITE",
      4: "MAXIMUM",
    },
    scoreHeaders: [
      { text: "Combos", value: "combo", width: 80 },
      { text: "Halo", value: "halo", width: 80 },
    ],
    playerHeaders: [
      { text: "Skill Level", value: "skill_level", sortable: true, width: 100 },
      { text: "BLOCK", value: "block", sortable: false, width: 100 },
      { text: "PACKET", value: "packet", sortable: false, width: 100 },
    ],
    versions: [
      {
        id: VersionConstants.SDVX_BOOTH,
        label: "BOOTH",
        maxRivals: 3,
      },
      {
        id: VersionConstants.SDVX_INFINITE_INFECTION,
        label: "-II- Infinite Infection",
        maxRivals: 3,
      },
      {
        id: VersionConstants.SDVX_GRAVITY_WARS,
        label: "GRAVITY WARS",
        maxRivals: 3,
      },
      {
        id: VersionConstants.SDVX_HEAVENLY_HAVEN,
        label: "HEAVENLY HAVEN",
        maxRivals: 3,
      },
      {
        id: VersionConstants.SDVX_VIVID_WAVE,
        label: "VIVID WAVE",
        maxRivals: 3,
      },
      {
        id: VersionConstants.SDVX_EXCEED_GEAR,
        label: "EXCEED GEAR",
        maxRivals: 3,
      },
    ],
  },
  {
    id: GameConstants.SILENT_SCOPE,
    name: "SILENT SCOPE: BONE EATER",
    skip: true,
    noRivals: true,
    noScores: true,
    noRecords: true,
    useUnicode: true,
    gameOptions: SilentScopeOptions,
  },
  {
    id: GameConstants.TSUMTSUM,
    name: "Tsum Tsum",
    skip: false,
    noRivals: true,
    noScores: false,
    noRecords: true,
    useUnicode: true,
    chartTable: {
      0: "Game Mode",
    },
  },
  {
    id: GameConstants.WINNING_ELEVEN,
    name: "World Soccer",
    icon: `${ASSET_PATH}/icon/we.webp`,
    cardBG: `${ASSET_PATH}/card/we.webp`,
    assetId: "we",
    skip: false,
    noRivals: true,
    noScores: true,
    noRecords: true,
    gameOptions: WinningElevenOptions,
    versions: [
      {
        id: VersionConstants.WINNING_ELEVEN_2008,
        label: "Winning Eleven Arcade Championship 2008",
      },
      {
        id: VersionConstants.WINNING_ELEVEN_2010,
        label: "Winning Eleven Arcade Championship 2010",
      },
      {
        id: VersionConstants.WINNING_ELEVEN_2012,
        label: "Winning Eleven Arcade Championship 2012",
      },
      {
        id: VersionConstants.WINNING_ELEVEN_2014,
        label: "Winning Eleven Arcade Championship 2014",
      },
    ],
  },
];

export function getGameInfo(game) {
  var requestedData = gameData.find((item) => item.id === game);

  // try finding by game's name.
  if (!requestedData) {
    requestedData = gameData.find((item) => item.name === game);
  }

  if (!requestedData) {
    return null;
  }

  if (!requestedData.icon) {
    requestedData.icon = `${ASSET_PATH}/icon/${game}.webp`;
  }
  if (!requestedData.cardBG) {
    requestedData.cardBG = `${ASSET_PATH}/card/${game}.webp`;
  }
  return requestedData;
}

export function getGameTitle(game, version) {
  const gameObject = gameData.find((x) => x.id == game);
  var output = gameObject.name;

  const versions = gameObject.versions;
  if (versions !== undefined) {
    const thisVersion = versions.find((x) => x.id == version);
    if (thisVersion !== undefined) {
      output += ` ${thisVersion.name}`;
    }
  }

  return output;
}

export function getRivalInfo(game, version) {
  const gameObject = gameData.find((x) => x.id == game);
  var output = null;

  const versions = gameObject.versions;
  if (versions !== undefined) {
    const thisVersion = versions.find((x) => x.id == version);
    if (thisVersion !== undefined) {
      output = thisVersion.maxRivals;
    }
  }

  return output;
}
