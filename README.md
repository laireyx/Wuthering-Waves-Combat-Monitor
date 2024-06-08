# Wuthering Waves Combat Monitor

## Screenshot

![Example screenshot](./example.png)

## How it works?

_Credits: [MorphTheMoth/WuwaDpsMeter](https://github.com/MorphTheMoth/WuwaDpsMeter) gave me an idea of tracking the mob hp._

Log file of WW contains a wealth of informations, including life values of the entity parts, allowing us to calculate DPS by tracking them.

## Caveats

- Unfortunately not all monsters have part information. In other words, this approach could not be applied to all situations.
- Scale of the life value fluctuates a lot. Naive comparison between different types of monsters could lead a wrong result.
