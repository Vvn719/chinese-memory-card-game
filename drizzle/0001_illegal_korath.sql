ALTER TABLE `words` ADD `khmer` text DEFAULT '' NOT NULL;
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-sports', '運動', '球類與活動', '🏅', '1');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-motorcycle', '機車配備', '方向燈、車燈、排氣管與油門', '🛵', '2');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-dental', '牙齒相關', '拔牙、牙膏、蛀牙與刷牙', '🦷', '3');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-football-field', '足球場', '球員、比賽與球場角色', '⚽', '4');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-transport', '來上課的方式', '走路、跑步、騎車', '🚲', '5');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-gas-station', '加油站會話', '問路與加油', '⛽', '6');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-weather', '天氣會話', '早上、下午與下雨', '🌦️', '7');
--> statement-breakpoint
INSERT OR IGNORE INTO `units` (`id`, `title`, `subtitle`, `icon`, `sort_order`) VALUES ('unit-directions', '方向', '轉彎、直走與停車', '🧭', '8');
--> statement-breakpoint
UPDATE `units` SET `title` = '機車配備', `subtitle` = '方向燈、車燈、排氣管與油門' WHERE `id` = 'unit-motorcycle';
--> statement-breakpoint
UPDATE `units` SET `title` = '牙齒相關', `subtitle` = '拔牙、牙膏、蛀牙與刷牙' WHERE `id` = 'unit-dental';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('baseball', 'unit-sports', '棒球', 'ㄅㄤˋ ㄑㄧㄡˊ', 'កីឡាបេស្បល', NULL, '⚾', 'coral', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'កីឡាបេស្បល' WHERE `id` = 'baseball';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('basketball', 'unit-sports', '籃球', 'ㄌㄢˊ ㄑㄧㄡˊ', 'កីឡាបាល់បោ', NULL, '🏀', 'orange', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'កីឡាបាល់បោ' WHERE `id` = 'basketball';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('football', 'unit-sports', '足球', 'ㄗㄨˊ ㄑㄧㄡˊ', 'បាល់ទាត់', NULL, '⚽', 'mint', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'បាល់ទាត់' WHERE `id` = 'football';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('swimming', 'unit-sports', '游泳', 'ㄧㄡˊ ㄩㄥˇ', 'ហែលទឹក', NULL, '🏊', 'blue', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ហែលទឹក' WHERE `id` = 'swimming';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('badminton', 'unit-sports', '羽毛球', 'ㄩˇ ㄇㄠˊ ㄑㄧㄡˊ', 'វាយសី', NULL, '🏸', 'violet', '4');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'វាយសី' WHERE `id` = 'badminton';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('volleyball', 'unit-sports', '排球', 'ㄆㄞˊ ㄑㄧㄡˊ', 'បាល់ទ', NULL, '🏐', 'yellow', '5');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'បាល់ទ' WHERE `id` = 'volleyball';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('direction-light', 'unit-motorcycle', '方向燈', 'ㄈㄤ ㄒㄧㄤˋ ㄉㄥ', 'ភ្លើងស៊ីញ៉ូ', '/unit-images/direction-light.webp', NULL, 'orange', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ភ្លើងស៊ីញ៉ូ' WHERE `id` = 'direction-light';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('vehicle-light', 'unit-motorcycle', '車燈', 'ㄔㄜ ㄉㄥ', 'ភ្លើងម៉ូតូ', NULL, '💡', 'yellow', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ភ្លើងម៉ូតូ' WHERE `id` = 'vehicle-light';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('exhaust-pipe', 'unit-motorcycle', '排氣管', 'ㄆㄞˊ ㄑㄧˋ ㄍㄨㄢˇ', 'បំពង់ផ្សែង', '/unit-images/exhaust-pipe.webp', NULL, 'blue', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'បំពង់ផ្សែង' WHERE `id` = 'exhaust-pipe';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('throttle', 'unit-motorcycle', '油門', 'ㄧㄡˊ ㄇㄣˊ', 'ដៃហ្គាស', NULL, '🏍️', 'mint', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ដៃហ្គាស' WHERE `id` = 'throttle';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('extract-tooth', 'unit-dental', '拔牙', 'ㄅㄚˊ ㄧㄚˊ', 'ដកធ្មេញ', '/unit-images/tooth-extraction.webp', NULL, 'violet', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ដកធ្មេញ' WHERE `id` = 'extract-tooth';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('toothpaste', 'unit-dental', '牙膏', 'ㄧㄚˊ ㄍㄠ', 'ថ្នាំដុសធ្មេញ', '/unit-images/toothpaste.webp', NULL, 'mint', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ថ្នាំដុសធ្មេញ' WHERE `id` = 'toothpaste';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('cavity', 'unit-dental', '蛀牙', 'ㄓㄨˋ ㄧㄚˊ', 'ធ្មេញពុក', '/unit-images/cavity.webp', NULL, 'coral', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ធ្មេញពុក' WHERE `id` = 'cavity';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('brush-teeth', 'unit-dental', '刷牙', 'ㄕㄨㄚ ㄧㄚˊ', 'ដុសធ្មេញ', '/unit-images/brushing-teeth.webp', NULL, 'blue', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ដុសធ្មេញ' WHERE `id` = 'brush-teeth';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('football-player', 'unit-football-field', '足球員', 'ㄗㄨˊ ㄑㄧㄡˊ ㄩㄢˊ', 'កីឡាករបាល់ទាត់', NULL, '⚽', 'coral', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'កីឡាករបាល់ទាត់' WHERE `id` = 'football-player';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('football-match', 'unit-football-field', '足球比賽', 'ㄗㄨˊ ㄑㄧㄡˊ ㄅㄧˇ ㄙㄞˋ', 'ការប្រកួតបាល់ទាត់', NULL, '🏆', 'orange', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ការប្រកួតបាល់ទាត់' WHERE `id` = 'football-match';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('goalkeeper', 'unit-football-field', '守門員', 'ㄕㄡˇ ㄇㄣˊ ㄩㄢˊ', 'អ្នកចាំទី', NULL, '🧤', 'mint', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'អ្នកចាំទី' WHERE `id` = 'goalkeeper';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('football-goal', 'unit-football-field', '足球門', 'ㄗㄨˊ ㄑㄧㄡˊ ㄇㄣˊ', 'ទីបាល់ទាត់', NULL, '🥅', 'blue', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ទីបាល់ទាត់' WHERE `id` = 'football-goal';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('referee', 'unit-football-field', '裁判', 'ㄘㄞˊ ㄆㄢˋ', 'អាជ្ញាកណ្តាល', NULL, '🟨', 'violet', '4');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'អាជ្ញាកណ្តាល' WHERE `id` = 'referee';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('football-field', 'unit-football-field', '足球場地', 'ㄗㄨˊ ㄑㄧㄡˊ ㄔㄤˇ ㄉㄧˋ', 'ទីលានបាល់ទាត់', NULL, '🏟️', 'yellow', '5');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ទីលានបាល់ទាត់' WHERE `id` = 'football-field';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('walking', 'unit-transport', '走路', 'ㄗㄡˇ ㄌㄨˋ', 'ដើរ', NULL, '🚶', 'coral', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ដើរ' WHERE `id` = 'walking';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('running', 'unit-transport', '跑步', 'ㄆㄠˇ ㄅㄨˋ', 'ការរត់', NULL, '🏃', 'orange', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ការរត់' WHERE `id` = 'running';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('riding-bicycle', 'unit-transport', '騎自行車', 'ㄑㄧˊ ㄗˋ ㄒㄧㄥˊ ㄔㄜ', 'ការជិះកង់', NULL, '🚲', 'mint', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ការជិះកង់' WHERE `id` = 'riding-bicycle';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('riding-motorcycle', 'unit-transport', '騎摩托車', 'ㄑㄧˊ ㄇㄛˊ ㄊㄨㄛ ㄔㄜ', 'ជិះម៉ូតូ', NULL, '🛵', 'blue', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ជិះម៉ូតូ' WHERE `id` = 'riding-motorcycle';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('ask-gas-station', 'unit-gas-station', '請問哪裡有加油站', 'ㄑㄧㄥˇ ㄨㄣˋ ㄋㄚˇ ㄌㄧˇ ㄧㄡˇ ㄐㄧㄚ ㄧㄡˊ ㄓㄢˋ', 'ខ្ញុំសួរថា ទីណាខ្លះមានបូទ្លែប្រេងឥន្ធនៈ?', NULL, '⛽', 'coral', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ខ្ញុំសួរថា ទីណាខ្លះមានបូទ្លែប្រេងឥន្ធនៈ?' WHERE `id` = 'ask-gas-station';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('two-kilometers-ahead', 'unit-gas-station', '往前直走兩公里就有', 'ㄨㄤˇ ㄑㄧㄢˊ ㄓˊ ㄗㄡˇ ㄌㄧㄤˇ ㄍㄨㄥ ㄌㄧˇ ㄐㄧㄡˋ ㄧㄡˇ', 'ដំឡើងទៅខាងមុខម្កល់ពីរខ្ទង់គីឡូម៉ែត្រនឹងមាន', NULL, '➡️', 'orange', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ដំឡើងទៅខាងមុខម្កល់ពីរខ្ទង់គីឡូម៉ែត្រនឹងមាន' WHERE `id` = 'two-kilometers-ahead';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('ask-fuel-type', 'unit-gas-station', '請問要加哪種汽油', 'ㄑㄧㄥˇ ㄨㄣˋ ㄧㄠˋ ㄐㄧㄚ ㄋㄚˇ ㄓㄨㄥˇ ㄑㄧˋ ㄧㄡˊ', 'ខ្ញុំសួរថា ត្រូវបញ្ចូលប្រេងម៉ូទ័រទៅប្រភេទណា?', NULL, '❓', 'mint', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ខ្ញុំសួរថា ត្រូវបញ្ចូលប្រេងម៉ូទ័រទៅប្រភេទណា?' WHERE `id` = 'ask-fuel-type';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('regular-gasoline', 'unit-gas-station', '我要加普通汽油', 'ㄨㄛˇ ㄧㄠˋ ㄐㄧㄚ ㄆㄨˇ ㄊㄨㄥ ㄑㄧˋ ㄧㄡˊ', 'ខ្ញុំចង់បូមប្រេងឆេះធម្មតា', NULL, '⛽', 'blue', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ខ្ញុំចង់បូមប្រេងឆេះធម្មតា' WHERE `id` = 'regular-gasoline';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('weather-today', 'unit-weather', '請問今天的天氣如何', 'ㄑㄧㄥˇ ㄨㄣˋ ㄐㄧㄣ ㄊㄧㄢ ㄉㄜ˙ ㄊㄧㄢ ㄑㄧˋ ㄖㄨˊ ㄏㄜˊ', 'អាកាសធាតុថ្ងៃនេះយ៉ាងដូចម្តេច?', NULL, '🌤️', 'coral', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'អាកាសធាតុថ្ងៃនេះយ៉ាងដូចម្តេច?' WHERE `id` = 'weather-today';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('good-morning-weather', 'unit-weather', '今天早上天氣很好', 'ㄐㄧㄣ ㄊㄧㄢ ㄗㄠˇ ㄕㄤˋ ㄊㄧㄢ ㄑㄧˋ ㄏㄣˇ ㄏㄠˇ', 'អាកាសធាតុពេលព្រឹកនេះល្អណាស់។', NULL, '☀️', 'orange', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'អាកាសធាតុពេលព្រឹកនេះល្អណាស់។' WHERE `id` = 'good-morning-weather';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('rainy-afternoon', 'unit-weather', '今天下午好像會下雨', 'ㄐㄧㄣ ㄊㄧㄢ ㄒㄧㄚˋ ㄨˇ ㄏㄠˇ ㄒㄧㄤˋ ㄏㄨㄟˋ ㄒㄧㄚˋ ㄩˇ', 'រសៀលនេះមើលទៅដូចជាភ្លៀង។', NULL, '🌧️', 'blue', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'រសៀលនេះមើលទៅដូចជាភ្លៀង។' WHERE `id` = 'rainy-afternoon';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('turn-left', 'unit-directions', '左轉', 'ㄗㄨㄛˇ ㄓㄨㄢˇ', 'បត់ឆ្វេង', NULL, '⬅️', 'coral', '0');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'បត់ឆ្វេង' WHERE `id` = 'turn-left';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('go-straight', 'unit-directions', '直走', 'ㄓˊ ㄗㄡˇ', 'ទៅមុខត្រង់', NULL, '⬆️', 'orange', '1');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ទៅមុខត្រង់' WHERE `id` = 'go-straight';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('stop-vehicle', 'unit-directions', '停車', 'ㄊㄧㄥˊ ㄔㄜ', 'ឈប់ឡាន', NULL, '🛑', 'mint', '2');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'ឈប់ឡាន' WHERE `id` = 'stop-vehicle';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('turn-right', 'unit-directions', '右轉', 'ㄧㄡˋ ㄓㄨㄢˇ', 'បត់ស្តាំ', NULL, '➡️', 'blue', '3');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'បត់ស្តាំ' WHERE `id` = 'turn-right';
--> statement-breakpoint
INSERT OR IGNORE INTO `words` (`id`, `unit_id`, `word`, `zhuyin`, `khmer`, `image_url`, `emoji`, `color`, `sort_order`) VALUES ('u-turn', 'unit-directions', '迴轉', 'ㄏㄨㄟˊ ㄓㄨㄢˇ', 'បត់ត្រឡប់ក្រោយ', NULL, '↩️', 'violet', '4');
--> statement-breakpoint
UPDATE `words` SET `khmer` = 'បត់ត្រឡប់ក្រោយ' WHERE `id` = 'u-turn';
