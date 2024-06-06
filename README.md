# Wuthering Waves Combat Monitor

## Screenshot

![Example screenshot](./example.png)

## How it works?

_Credits: [MorphTheMoth/WuwaDpsMeter](https://github.com/MorphTheMoth/WuwaDpsMeter) gave me an idea of tracking the mob hp._

Log file of WW has lots of informations, including life values of the entity parts, so we can calculate DPS by tracking them.

## Caveats

- Unfortunately not all monsters have part information. In other words, this approach could not be applied to all situations.
- Scale of the life value is fluctuating. Naive comparison between different type of monsters could lead a wrong result.
