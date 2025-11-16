# Welcome to my Strudel Application

This is an application taking inspriration by the physcial launchpad.

Created by Simon Tran

## Prequequiste

Make sure that you either have Node.js and npm (or yarn) before try to install any modules

## How to install

1. Run this on your prefered terminal 

```
git clone https://github.com/nhantran1711/strudel_reactor_assignment.git
```

2. Then this

```
cd strudel_reactor_assignment
```

3. Download the modules if you havent then run it

```
npm install
npm run start
```


## Controls

There are couple features that I implemented

### Controls center

- **Play**: only when the code is already run or update, first initial will never work
- **Stop**: stop the music and the application
- **Run**/ Update: both works the same way for UX


### Spinning Cat

The uiauia cat will spin whenever there is some music.... so be careful


### Effects section

- **Save Beat**: Save the current strudel code into local storage, if you accidentally delete the code, it wont be gone...
- **Load Beat**: Load the saved code into the main from local storage

### Tempo Slider

A slider to adjust the speed of the application

### Graph

Implemented with the slider tempo, update whenver the tempo change to help you visualize

### Instrumental Panel

Tick boxes for adjust the music


### Export and Import Json

If you like your current setting of tempo and instrumental, click **export** json to save a custom json into your clipboard

**Import** the json to change the current setting to the prefered one

