export type WordEntry = {
  id: string;
  word: string;
  zhuyin: string;
  khmer: string;
  imageUrl: string | null;
  emoji: string | null;
  color: string;
};

export type Unit = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  sortOrder: number;
  words: WordEntry[];
};

export const COLORS = ["coral", "orange", "mint", "blue", "violet", "yellow"];

export const DEFAULT_UNITS: Unit[] = [
  {
    id: "unit-sports",
    title: "運動",
    subtitle: "球類與活動",
    icon: "🏅",
    sortOrder: 1,
    words: [
      { id: "baseball", word: "棒球", zhuyin: "ㄅㄤˋ ㄑㄧㄡˊ", khmer: "កីឡាបេស្បល", emoji: "⚾", imageUrl: null, color: "coral" },
      { id: "basketball", word: "籃球", zhuyin: "ㄌㄢˊ ㄑㄧㄡˊ", khmer: "កីឡាបាល់បោ", emoji: "🏀", imageUrl: null, color: "orange" },
      { id: "football", word: "足球", zhuyin: "ㄗㄨˊ ㄑㄧㄡˊ", khmer: "បាល់ទាត់", emoji: "⚽", imageUrl: null, color: "mint" },
      { id: "swimming", word: "游泳", zhuyin: "ㄧㄡˊ ㄩㄥˇ", khmer: "ហែលទឹក", emoji: "🏊", imageUrl: null, color: "blue" },
      { id: "badminton", word: "羽毛球", zhuyin: "ㄩˇ ㄇㄠˊ ㄑㄧㄡˊ", khmer: "វាយសី", emoji: "🏸", imageUrl: null, color: "violet" },
      { id: "volleyball", word: "排球", zhuyin: "ㄆㄞˊ ㄑㄧㄡˊ", khmer: "បាល់ទ", emoji: "🏐", imageUrl: null, color: "yellow" },
    ],
  },
  {
    id: "unit-motorcycle",
    title: "機車配備",
    subtitle: "方向燈、車燈、排氣管與油門",
    icon: "🛵",
    sortOrder: 2,
    words: [
      { id: "direction-light", word: "方向燈", zhuyin: "ㄈㄤ ㄒㄧㄤˋ ㄉㄥ", khmer: "ភ្លើងស៊ីញ៉ូ", emoji: null, imageUrl: "/unit-images/direction-light.webp", color: "orange" },
      { id: "vehicle-light", word: "車燈", zhuyin: "ㄔㄜ ㄉㄥ", khmer: "ភ្លើងម៉ូតូ", emoji: "💡", imageUrl: null, color: "yellow" },
      { id: "exhaust-pipe", word: "排氣管", zhuyin: "ㄆㄞˊ ㄑㄧˋ ㄍㄨㄢˇ", khmer: "បំពង់ផ្សែង", emoji: null, imageUrl: "/unit-images/exhaust-pipe.webp", color: "blue" },
      { id: "throttle", word: "油門", zhuyin: "ㄧㄡˊ ㄇㄣˊ", khmer: "ដៃហ្គាស", emoji: "🏍️", imageUrl: null, color: "mint" },
    ],
  },
  {
    id: "unit-dental",
    title: "牙齒相關",
    subtitle: "拔牙、牙膏、蛀牙與刷牙",
    icon: "🦷",
    sortOrder: 3,
    words: [
      { id: "extract-tooth", word: "拔牙", zhuyin: "ㄅㄚˊ ㄧㄚˊ", khmer: "ដកធ្មេញ", emoji: null, imageUrl: "/unit-images/tooth-extraction.webp", color: "violet" },
      { id: "toothpaste", word: "牙膏", zhuyin: "ㄧㄚˊ ㄍㄠ", khmer: "ថ្នាំដុសធ្មេញ", emoji: null, imageUrl: "/unit-images/toothpaste.webp", color: "mint" },
      { id: "cavity", word: "蛀牙", zhuyin: "ㄓㄨˋ ㄧㄚˊ", khmer: "ធ្មេញពុក", emoji: null, imageUrl: "/unit-images/cavity.webp", color: "coral" },
      { id: "brush-teeth", word: "刷牙", zhuyin: "ㄕㄨㄚ ㄧㄚˊ", khmer: "ដុសធ្មេញ", emoji: null, imageUrl: "/unit-images/brushing-teeth.webp", color: "blue" },
    ],
  },
  {
    id: "unit-football-field",
    title: "足球場",
    subtitle: "球員、比賽與球場角色",
    icon: "⚽",
    sortOrder: 4,
    words: [
      { id: "football-player", word: "足球員", zhuyin: "ㄗㄨˊ ㄑㄧㄡˊ ㄩㄢˊ", khmer: "កីឡាករបាល់ទាត់", emoji: "⚽", imageUrl: null, color: "coral" },
      { id: "football-match", word: "足球比賽", zhuyin: "ㄗㄨˊ ㄑㄧㄡˊ ㄅㄧˇ ㄙㄞˋ", khmer: "ការប្រកួតបាល់ទាត់", emoji: "🏆", imageUrl: null, color: "orange" },
      { id: "goalkeeper", word: "守門員", zhuyin: "ㄕㄡˇ ㄇㄣˊ ㄩㄢˊ", khmer: "អ្នកចាំទី", emoji: "🧤", imageUrl: null, color: "mint" },
      { id: "football-goal", word: "足球門", zhuyin: "ㄗㄨˊ ㄑㄧㄡˊ ㄇㄣˊ", khmer: "ទីបាល់ទាត់", emoji: "🥅", imageUrl: null, color: "blue" },
      { id: "referee", word: "裁判", zhuyin: "ㄘㄞˊ ㄆㄢˋ", khmer: "អាជ្ញាកណ្តាល", emoji: "🟨", imageUrl: null, color: "violet" },
      { id: "football-field", word: "足球場地", zhuyin: "ㄗㄨˊ ㄑㄧㄡˊ ㄔㄤˇ ㄉㄧˋ", khmer: "ទីលានបាល់ទាត់", emoji: "🏟️", imageUrl: null, color: "yellow" },
    ],
  },
  {
    id: "unit-transport",
    title: "來上課的方式",
    subtitle: "走路、跑步、騎車",
    icon: "🚲",
    sortOrder: 5,
    words: [
      { id: "walking", word: "走路", zhuyin: "ㄗㄡˇ ㄌㄨˋ", khmer: "ដើរ", emoji: "🚶", imageUrl: null, color: "coral" },
      { id: "running", word: "跑步", zhuyin: "ㄆㄠˇ ㄅㄨˋ", khmer: "ការរត់", emoji: "🏃", imageUrl: null, color: "orange" },
      { id: "riding-bicycle", word: "騎自行車", zhuyin: "ㄑㄧˊ ㄗˋ ㄒㄧㄥˊ ㄔㄜ", khmer: "ការជិះកង់", emoji: "🚲", imageUrl: null, color: "mint" },
      { id: "riding-motorcycle", word: "騎摩托車", zhuyin: "ㄑㄧˊ ㄇㄛˊ ㄊㄨㄛ ㄔㄜ", khmer: "ជិះម៉ូតូ", emoji: "🛵", imageUrl: null, color: "blue" },
    ],
  },
  {
    id: "unit-gas-station",
    title: "加油站會話",
    subtitle: "問路與加油",
    icon: "⛽",
    sortOrder: 6,
    words: [
      { id: "ask-gas-station", word: "請問哪裡有加油站", zhuyin: "ㄑㄧㄥˇ ㄨㄣˋ ㄋㄚˇ ㄌㄧˇ ㄧㄡˇ ㄐㄧㄚ ㄧㄡˊ ㄓㄢˋ", khmer: "ខ្ញុំសួរថា ទីណាខ្លះមានបូទ្លែប្រេងឥន្ធនៈ?", emoji: "⛽", imageUrl: null, color: "coral" },
      { id: "two-kilometers-ahead", word: "往前直走兩公里就有", zhuyin: "ㄨㄤˇ ㄑㄧㄢˊ ㄓˊ ㄗㄡˇ ㄌㄧㄤˇ ㄍㄨㄥ ㄌㄧˇ ㄐㄧㄡˋ ㄧㄡˇ", khmer: "ដំឡើងទៅខាងមុខម្កល់ពីរខ្ទង់គីឡូម៉ែត្រនឹងមាន", emoji: "➡️", imageUrl: null, color: "orange" },
      { id: "ask-fuel-type", word: "請問要加哪種汽油", zhuyin: "ㄑㄧㄥˇ ㄨㄣˋ ㄧㄠˋ ㄐㄧㄚ ㄋㄚˇ ㄓㄨㄥˇ ㄑㄧˋ ㄧㄡˊ", khmer: "ខ្ញុំសួរថា ត្រូវបញ្ចូលប្រេងម៉ូទ័រទៅប្រភេទណា?", emoji: "❓", imageUrl: null, color: "mint" },
      { id: "regular-gasoline", word: "我要加普通汽油", zhuyin: "ㄨㄛˇ ㄧㄠˋ ㄐㄧㄚ ㄆㄨˇ ㄊㄨㄥ ㄑㄧˋ ㄧㄡˊ", khmer: "ខ្ញុំចង់បូមប្រេងឆេះធម្មតា", emoji: "⛽", imageUrl: null, color: "blue" },
    ],
  },
  {
    id: "unit-weather",
    title: "天氣會話",
    subtitle: "早上、下午與下雨",
    icon: "🌦️",
    sortOrder: 7,
    words: [
      { id: "weather-today", word: "請問今天的天氣如何", zhuyin: "ㄑㄧㄥˇ ㄨㄣˋ ㄐㄧㄣ ㄊㄧㄢ ㄉㄜ˙ ㄊㄧㄢ ㄑㄧˋ ㄖㄨˊ ㄏㄜˊ", khmer: "អាកាសធាតុថ្ងៃនេះយ៉ាងដូចម្តេច?", emoji: "🌤️", imageUrl: null, color: "coral" },
      { id: "good-morning-weather", word: "今天早上天氣很好", zhuyin: "ㄐㄧㄣ ㄊㄧㄢ ㄗㄠˇ ㄕㄤˋ ㄊㄧㄢ ㄑㄧˋ ㄏㄣˇ ㄏㄠˇ", khmer: "អាកាសធាតុពេលព្រឹកនេះល្អណាស់។", emoji: "☀️", imageUrl: null, color: "orange" },
      { id: "rainy-afternoon", word: "今天下午好像會下雨", zhuyin: "ㄐㄧㄣ ㄊㄧㄢ ㄒㄧㄚˋ ㄨˇ ㄏㄠˇ ㄒㄧㄤˋ ㄏㄨㄟˋ ㄒㄧㄚˋ ㄩˇ", khmer: "រសៀលនេះមើលទៅដូចជាភ្លៀង។", emoji: "🌧️", imageUrl: null, color: "blue" },
    ],
  },
  {
    id: "unit-directions",
    title: "方向",
    subtitle: "轉彎、直走與停車",
    icon: "🧭",
    sortOrder: 8,
    words: [
      { id: "turn-left", word: "左轉", zhuyin: "ㄗㄨㄛˇ ㄓㄨㄢˇ", khmer: "បត់ឆ្វេង", emoji: "⬅️", imageUrl: null, color: "coral" },
      { id: "go-straight", word: "直走", zhuyin: "ㄓˊ ㄗㄡˇ", khmer: "ទៅមុខត្រង់", emoji: "⬆️", imageUrl: null, color: "orange" },
      { id: "stop-vehicle", word: "停車", zhuyin: "ㄊㄧㄥˊ ㄔㄜ", khmer: "ឈប់ឡាន", emoji: "🛑", imageUrl: null, color: "mint" },
      { id: "turn-right", word: "右轉", zhuyin: "ㄧㄡˋ ㄓㄨㄢˇ", khmer: "បត់ស្តាំ", emoji: "➡️", imageUrl: null, color: "blue" },
      { id: "u-turn", word: "迴轉", zhuyin: "ㄏㄨㄟˊ ㄓㄨㄢˇ", khmer: "បត់ត្រឡប់ក្រោយ", emoji: "↩️", imageUrl: null, color: "violet" },
    ],
  },
];
