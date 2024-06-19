# Wuthering Waves Combat Monitor

## Screenshot

![Example screenshot](./example.png)

## How it works?

_Credits: [MorphTheMoth/WuwaDpsMeter](https://github.com/MorphTheMoth/WuwaDpsMeter) gave me an idea of tracking the log file._

Log file of WW contains a wealth of informations, including buffs, skill activations.
This application watches log, gathers meaningful data, and displays in easy-readable format.

## Caveats

- Unfortunately damage to the entity parts does not follow actual damage, which means we cannot calculate DPS accurately.
- Not all buffs are tracked(trackable buff lists are whitelisted).

## Credits

- [MorphTheMoth/WuwaDpsMeter](https://github.com/MorphTheMoth/WuwaDpsMeter) gave me an idea of tracking the log file.
- Button icons in the app are from [SVG Repo](https://www.svgrepo.com/).
- Background image and executable icon file are from [Official Weibo](https://weibo.com/u/7730797357).
- Trackable buff lists are extracted manually from [Arikatsu/WutheringWaves_Data](https://github.com/Arikatsu/WutheringWaves_Data).
