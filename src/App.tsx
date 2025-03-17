import { framer } from "framer-plugin";
import { useState, useEffect } from "react";
import "./App.css";

framer.showUI({
  position: "top right",
  width: 500,
  height: 490,
});

type Sound = {
  name: string;
  url: string;
  image: string;
  metaphors: string;
};

const initialSounds: Sound[] = [{
  name: "v-09-09-8-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-09-8-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-09-8-11.png",
  metaphors: "heartbeat,pulsating,touching,palpating",
},
{
  name: "v-09-09-8-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-09-8-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-09-8-20.png",
  metaphors: "heartbeat,touching,animal",
},
{
  name: "v-09-09-8-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-09-8-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-09-8-24.png",
  metaphors: "motor,coming and going",
},
{
  name: "v-09-10-11-55",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-11-55.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-11-55.png",
  metaphors: "alarm,jumping,sliding,phone",
},
{
  name: "v-09-10-11-58",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-11-58.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-11-58.png",
  metaphors: "purring,snoring,animal,coming and going",
},
{
  name: "v-09-10-12-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-11.png",
  metaphors: "alarm,electric shock",
},
{
  name: "v-09-10-12-13",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-13.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-13.png",
  metaphors: "alarm,touching,musical instruments,battery,bip,phone,celebration",
},
{
  name: "v-09-10-12-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-16.png",
  metaphors: "musical instruments,bip",
},
{
  name: "v-09-10-12-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-2.png",
  metaphors: "snoring,buzzing",
},
{
  name: "v-09-10-12-6",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-6.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-6.png",
  metaphors: "snoring,bell,walking,alarm,coming and going",
},
{
  name: "v-09-10-12-9",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-9.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-9.png",
  metaphors: "touching,alarm,musical instruments,battery,animal",
},
{
  name: "v-09-10-3-52",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-3-52.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-3-52.png",
  metaphors: "touching,morse code,phone,alarm",
},
{
  name: "v-09-10-3-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-3-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-3-56.png",
  metaphors: "pistol",
},
{
  name: "v-09-10-4-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-2.png",
  metaphors: "touching,pulsating",
},
{
  name: "v-09-10-4-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-20.png",
  metaphors: "heartbeat,scratching,animal,touching",
},
{
  name: "v-09-10-4-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-23.png",
  metaphors: "heartbeat,touching,scratching,clock",
},
{
  name: "v-09-10-4-25",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-25.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-25.png",
  metaphors: "motor,heartbeat,touching",
},
{
  name: "v-09-10-4-6",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-6.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-6.png",
  metaphors: "touching,coming and going,animal",
},
{
  name: "v-09-10-6-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-16.png",
  metaphors: "touching,bip,heartbeat",
},
{
  name: "v-09-10-6-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-22.png",
  metaphors: "pistol,electric shock,motor,working",
},
{
  name: "v-09-10-6-27",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-27.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-27.png",
  metaphors: "touching,bip,alarm,musical instruments,battery",
},
{
  name: "v-09-10-6-38",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-38.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-38.png",
  metaphors: "getting close,motor",
},
{
  name: "v-09-10-6-43",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-43.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-43.png",
  metaphors: "pulsating,game,touching,snoring,sliding",
},
{
  name: "v-09-10-6-46",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-46.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-46.png",
  metaphors: "bomb",
},
{
  name: "v-09-10-6-5",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-5.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-5.png",
  metaphors: "touching,musical instruments,battery,heartbeat,clock",
},
{
  name: "v-09-10-6-59",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-59.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-59.png",
  metaphors: "motor,buzzing,animal,working,shaking",
},
{
  name: "v-09-10-7-34",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-7-34.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-7-34.png",
  metaphors: "touching,palpating,heartbeat",
},
{
  name: "v-09-10-7-36",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-7-36.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-7-36.png",
  metaphors: "buzzing,animal,coming and going,bell",
},
{
  name: "v-09-10-7-9",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-7-9.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-7-9.png",
  metaphors: "touching",
},
{
  name: "v-09-10-8-5",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-8-5.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-8-5.png",
  metaphors: "game,palpating,alarm",
},
{
  name: "v-09-10-8-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-8-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-8-7.png",
  metaphors: "game,pulsating,palpating,touching,buzzing",
},
{
  name: "v-09-11-3-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-12.png",
  metaphors: "alarm,phone,SOS",
},
{
  name: "v-09-11-3-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-16.png",
  metaphors: "alarm,phone,musical instruments,battery",
},
{
  name: "v-09-11-3-19",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-19.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-19.png",
  metaphors: "morse code,horn,game,phone,alarm",
},
{
  name: "v-09-11-3-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-21.png",
  metaphors: "heartbeat,phone",
},
{
  name: "v-09-11-3-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-24.png",
  metaphors: "motor",
},
{
  name: "v-09-11-3-4",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-4.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-4.png",
  metaphors: "alarm,motor",
},
{
  name: "v-09-11-3-43",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-43.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-43.png",
  metaphors: "dancing,touching,musical instruments",
},
{
  name: "v-09-11-3-50",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-50.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-50.png",
  metaphors: "game,jumping",
},
{
  name: "v-09-11-3-54",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-54.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-54.png",
  metaphors: "heartbeat,pulsating,touching,clock,jumping",
},
{
  name: "v-09-11-3-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-56.png",
  metaphors: "vibration",
},
{
  name: "v-09-11-3-8",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-8.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-8.png",
  metaphors: "motor",
},
{
  name: "v-09-11-4-1",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-1.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-1.png",
  metaphors: "touching,musical instruments,battery,game",
},
{
  name: "v-09-11-4-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-12.png",
  metaphors: "motor,bell,game,alarm",
},
{
  name: "v-09-11-4-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-22.png",
  metaphors: "buzzing,celebration,horn,alarm",
},
{
  name: "v-09-11-4-3",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-3.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-3.png",
  metaphors: "touching,morse code,working,jumping",
},
{
  name: "v-09-11-4-41",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-41.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-41.png",
  metaphors: "coming and going,going away,working,heartbeat",
},
{
  name: "v-09-11-4-54",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-54.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-54.png",
  metaphors: "touching,alarm,pulsating,bip,palpating,phone",
},
{
  name: "v-09-11-4-8",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-8.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-8.png",
  metaphors: "touching",
},
{
  name: "v-09-12-1-0",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-0.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-0.png",
  metaphors: "palpating,nature,animal",
},
{
  name: "v-09-12-1-19",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-19.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-19.png",
  metaphors: "drop",
},
{
  name: "v-09-12-1-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-23.png",
  metaphors: "bip,game,palpating",
},
{
  name: "v-09-12-1-29",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-29.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-29.png",
  metaphors: "bip,game,heartbeat,scratching,animal,musical instruments,battery,touching",
},
{
  name: "v-09-12-1-39",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-39.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-39.png",
  metaphors: "musical instruments,battery,echo,bell",
},
{
  name: "v-09-12-1-48",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-48.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-48.png",
  metaphors: "touching,pulsating,bip",
},
{
  name: "v-09-12-1-53",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-53.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-53.png",
  metaphors: "heartbeat,musical instruments,battery",
},
{
  name: "v-09-12-2-17",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-17.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-17.png",
  metaphors: "pistol,motor,animal",
},
{
  name: "v-09-12-2-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-20.png",
  metaphors: "touching,game",
},
{
  name: "v-09-12-2-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-23.png",
  metaphors: "alarm,bip,sliding,scratching,animal",
},
{
  name: "v-09-12-2-40",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-40.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-40.png",
  metaphors: "walking",
},
{
  name: "v-09-12-8-10",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-10.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-10.png",
  metaphors: "motor,snoring,horn,animal",
},
{
  name: "v-09-12-8-13",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-13.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-13.png",
  metaphors: "motor,buzzing,animal,snoring",
},
{
  name: "v-09-12-8-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-21.png",
  metaphors: "touching,bip,clock,palpating",
},
{
  name: "v-09-12-8-27",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-27.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-27.png",
  metaphors: "bip,bell,nature",
},
{
  name: "v-09-12-8-30",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-30.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-30.png",
  metaphors: "animal,snoring,nature",
},
{
  name: "v-09-12-8-32",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-32.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-32.png",
  metaphors: "animal",
},
{
  name: "v-09-16-1-43",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-16-1-43.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-16-1-43.png",
  metaphors: "bip",
},
{
  name: "v-09-16-1-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-16-1-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-16-1-56.png",
  metaphors: "alarm,coming and going,game,bell,horn,jumping",
},
{
  name: "v-09-18-1-55",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-1-55.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-1-55.png",
  metaphors: "heartbeat,touching",
},
{
  name: "v-09-18-2-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-2-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-2-7.png",
  metaphors: "bip",
},
{
  name: "v-09-18-4-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-12.png",
  metaphors: "jumping,animal,game,musical instruments,battery,alarm",
},
{
  name: "v-09-18-4-15",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-15.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-15.png",
  metaphors: "bip,touching,palpating",
},
{
  name: "v-09-18-4-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-16.png",
  metaphors: "bip,bell,game,heartbeat,phone,frogs,animal",
},
{
  name: "v-09-18-4-18",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-18.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-18.png",
  metaphors: "bip,horn,alarm,game,nature,animal,touching",
},
{
  name: "v-09-18-4-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-22.png",
  metaphors: "breathing,pulsating,heartbeat",
},
{
  name: "v-09-18-4-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-56.png",
  metaphors: "coming and going,alarm,sliding",
},
{
  name: "v-09-23-6-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-23-6-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-23-6-24.png",
  metaphors: "animal,motor,sliding,coming and going",
},
{
  name: "v-09-26-1-39",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-26-1-39.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-26-1-39.png",
  metaphors: "pulsating",
},
{
  name: "v-10-09-1-1",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-1.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-1.png",
  metaphors: "touching,battery",
},
{
  name: "v-10-09-1-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-11.png",
  metaphors: "scratching",
},
{
  name: "v-10-09-1-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-12.png",
  metaphors: "alarm,musical instruments,game",
},
{
  name: "v-10-09-1-14",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-14.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-14.png",
  metaphors: "phone,musical instruments,battery,bip,music,singing,celebration",
},
{
  name: "v-10-09-1-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-16.png",
  metaphors: "motor",
},
{
  name: "v-10-09-1-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-20.png",
  metaphors: "snoring,nature",
},
{
  name: "v-10-09-1-8",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-8.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-8.png",
  metaphors: "buzzing,animal,celebration",
},
{
  name: "v-10-09-5-0",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-0.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-0.png",
  metaphors: "alarm,touching",
},
{
  name: "v-10-09-5-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-2.png",
  metaphors: "touching,morse code",
},
{
  name: "v-10-09-5-4",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-4.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-4.png",
  metaphors: "alarm,bell,electric shock",
},
{
  name: "v-10-09-5-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-7.png",
  metaphors: "electric shock,pistol,bip,game",
},
{
  name: "v-10-10-1-10",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-10.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-10.png",
  metaphors: "ovni",
},
{
  name: "v-10-10-1-18",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-18.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-18.png",
  metaphors: "morse code,alarm,bip,game,heartbeat,palpating",
},
{
  name: "v-10-10-1-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-21.png",
  metaphors: "phone,alarm,working",
},
{
  name: "v-10-10-1-5",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-5.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-5.png",
  metaphors: "sliding,coming and going,alarm,game",
},
{
  name: "v-10-18-11-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-18-11-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-18-11-11.png",
  metaphors: "phone,alarm,bip,game",
},
{
  name: "v-10-21-2-48",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-2-48.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-2-48.png",
  metaphors: "musical instruments,battery,cymbal,explosion touching",
},
{
  name: "v-10-21-3-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-11.png",
  metaphors: "touching,game",
},
{
  name: "v-10-21-3-17",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-17.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-17.png",
  metaphors: "buzzing,alarm",
},
{
  name: "v-10-21-3-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-2.png",
  metaphors: "bip,clock",
},
{
  name: "v-10-21-3-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-21.png",
  metaphors: "buzzing",
},
{
  name: "v-10-21-3-30",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-30.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-30.png",
  metaphors: "bip,buzzing,electric shock,alarm",
},
{
  name: "v-10-21-3-33",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-33.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-33.png",
  metaphors: "touching,bip,palpating,clock",
},
{
  name: "v-10-21-3-39",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-39.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-39.png",
  metaphors: "alarm,game,fail game,pistol,electric shock",
},
{
  name: "v-10-21-3-4",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-4.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-4.png",
  metaphors: "touching,jumping,musical instruments,battery,coming and going,SOS,celebration,pistol,alarm,palpating",
},
{
  name: "v-10-21-3-45",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-45.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-45.png",
  metaphors: "alarm,phone,musical instruments,battery,game,celebration",
},
{
  name: "v-10-21-3-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-7.png",
  metaphors: "motor,getting close,coming and going,sliding",
},
{
  name: "v-10-23-1-10",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-10.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-10.png",
  metaphors: "coming and going,phone,alarm,horn,bip",
},
{
  name: "v-10-23-1-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-16.png",
  metaphors: "phone,alarm,SOS,horn,game,bip,palpating",
},
{
  name: "v-10-23-1-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-21.png",
  metaphors: "coming and going,motor,snoring,something moving,something rolling,sliding",
},
{
  name: "v-10-23-1-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-23.png",
  metaphors: "motor,electric shock,snoring,coming and going,stopping,growl,chainsaw,a door closing",
},
{
  name: "v-10-23-1-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-24.png",
  metaphors: "motor,pistol,buzzing,animal,coming and going,celebration",
},
{
  name: "v-10-28-7-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-22.png",
  metaphors: "SOS,alarm,bip,touching,battery",
},
{
  name: "v-10-28-7-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-23.png",
  metaphors: "alarm,touching",
},
{
  name: "v-10-28-7-26",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-26.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-26.png",
  metaphors: "scratching,animal,nature",
},
{
  name: "v-10-28-7-29",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-29.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-29.png",
  metaphors: "working,coming and going,motor",
},
{
  name: "v-10-28-7-31",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-31.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-31.png",
  metaphors: "walking,touching,clock",
},
{
  name: "v-10-28-7-33",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-33.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-33.png",
  metaphors: "buzzing,motor",
},
{
  name: "v-10-28-7-35",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-35.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-35.png",
  metaphors: "buzzing,animal,fog horn",
},
{
  name: "v-10-28-7-36",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-36.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-36.png",
  metaphors: "buzzing,electric shock,motor,snoring,phone,animal",
},
{
  name: "v-10-29-4-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-29-4-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-29-4-20.png",
  metaphors: "snoring,motor,coming and going,breathing",
},
{
  name: "v-10-29-4-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-29-4-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-29-4-22.png",
  metaphors: "motor,game",
},
];

export function App() {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [filteredSounds, setFilteredSounds] = useState<Sound[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal de autenticación
  const [messageModalVisible, setMessageModalVisible] = useState(false);  // Modal para mostrar el mensaje
  const [message, setMessage] = useState("");  // Mensaje que se va a mostrar
  const [uploadModalVisible, setUploadModalVisible] = useState(false); // Modal de subida de sonido
  const [soundDetails, setSoundDetails] = useState({
    name: "",
    description: "",
    metaphors: "",
    file: null as File | null,
  });

  useEffect(() => {
    const storedSounds = localStorage.getItem("sounds");
    if (storedSounds) {
      setSounds(JSON.parse(storedSounds));
      setFilteredSounds(JSON.parse(storedSounds));
    } else {
      setSounds(initialSounds);
      setFilteredSounds(initialSounds);
      localStorage.setItem("sounds", JSON.stringify(initialSounds));
    }

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      functionRefreshToken(storedRefreshToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (filter) {
      const filtered = sounds.filter((sound) =>
        sound.metaphors
          .toLowerCase()
          .split(",")
          .some((metaphor) => metaphor.trim().includes(filter.toLowerCase()))
      );
      setFilteredSounds(filtered);
    } else {
      setFilteredSounds(sounds);
    }
  }, [filter, sounds]);

  const functionRefreshToken = async (refreshToken: any) => {
    const data = new FormData();
    data.append("client_id", "sk4SYvtNWujw8dwXsjub");
    data.append(
      "client_secret",
      "BISQF8r4KvtJAnTciMYXuyigPKwBmT4B4AvibBpf"
    );
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", refreshToken);
    
    const requestOptions = {
      method: "POST",
      body: data,
      headers: {
        "origin": "https://framer.com",
      },
    };

    const request = await fetch(
      "https://freesound.org/apiv2/oauth2/access_token/",
      requestOptions
    );
    const response = await request.json();

    if (response.access_token) {
      localStorage.setItem("authToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      setIsLoggedIn(true);
      setModalVisible(false);
      await getUniqueId();
    }
  };

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch((err) => console.error("Error reproduciendo el sonido:", err));
  };

  const saveMetaphors = (newMetaphors: string) => {
    if (selectedSound) {
      const updatedSounds = sounds.map((sound) =>
        sound.name === selectedSound.name
          ? { ...sound, metaphors: newMetaphors }
          : sound
      );
      setSounds(updatedSounds);
      setFilteredSounds(updatedSounds);
      localStorage.setItem("sounds", JSON.stringify(updatedSounds));
      setSelectedSound(null);
    }
  };

  const authenticateUser = () => {
    setModalVisible(true); // Mostrar el modal cuando el usuario no está autenticado
  };

  const handleAuthCodeSubmit = async () => {
    const code = (document.getElementById("authCode") as HTMLInputElement).value;
    if (code) {
      const data = new FormData();
      data.append("client_id", "sk4SYvtNWujw8dwXsjub");
      data.append(
        "client_secret",
        "BISQF8r4KvtJAnTciMYXuyigPKwBmT4B4AvibBpf"
      );
      data.append("grant_type", "authorization_code");
      data.append("code", code);

      const requestOptions = {
        method: "POST",
        body: data,
        headers: {
          "origin": "https://framer.com",
        },
      };

      const request = await fetch(
        "https://freesound.org/apiv2/oauth2/access_token/",
        requestOptions
      );


      const response = await request.json();
      if (response.access_token) {
        localStorage.setItem("authToken", response.access_token);
        localStorage.setItem("refreshToken", response.refresh_token);
        setIsLoggedIn(true);
        setModalVisible(false);
        await getUniqueId();

        return true;
      } else {
        return false;
      }
    }
  };

  async function getUniqueId() {
    // Guardar Unique ID
    const header = new Headers();
    const authToken = localStorage.getItem("authToken");
    header.append("Authorization", "Bearer " + authToken);
    const requestOptions = {
      method: "GET",
      headers: header,
    };
    const request = await fetch(
      "https://freesound.org/apiv2/me/",
      requestOptions
    );

    const response = await request.json();
    localStorage.setItem("uniqueId", response.unique_id);
  }

  async function getArraySound(file, threshold = 0.5, sampleStep = 100) {
    const context = new(window.AudioContext)();

    // Leer archivo como arrayBuffer y decodificar
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);

    const data = audioBuffer.getChannelData(0); // Obtener datos del primer canal (mono)
    const sampleRate = audioBuffer.sampleRate; // Frecuencia de muestreo del archivo de audio

    const pattern = [];
    let vibrate = false; // Indica si estamos en vibración o pausa
    let currentDuration = 0; // Tiempo actual acumulado de vibración o pausa

    const msPerStep = (1000 / sampleRate) * sampleStep; // Tiempo en ms para cada ⁠sampleStep

    // Recorrer los datos del audio tomando muestras a intervalos de ⁠sampleStep
    for (let i = 0; i < data.length; i += sampleStep) {
      const amplitude = Math.abs(data[i]); // Obtener valor absoluto de la amplitud en este paso

      if (amplitude > threshold) {
        // Si la amplitud es mayor que el umbral, estamos en un período de vibración
        if (vibrate) {
          // Si ya estamos vibrando, acumulamos tiempo de vibración
          currentDuration += msPerStep;
        } else {
          // Si estábamos en pausa, guardamos el tiempo de pausa y comenzamos a vibrar
          if (currentDuration > 0) pattern.push(Math.round(currentDuration)); // Agregar duración de pausa
          vibrate = true; // Cambiamos a modo vibración
          currentDuration = msPerStep; // Empezamos a contar tiempo de vibración
        }
      } else {
        // Si la amplitud es menor o igual al umbral, estamos en un período de pausa
        if (vibrate) {
          // Si estábamos vibrando, guardamos el tiempo de vibración y comenzamos a pausar
          if (currentDuration > 0) pattern.push(Math.round(currentDuration)); // Agregar duración de vibración
          vibrate = false; // Cambiamos a modo pausa
          currentDuration = msPerStep; // Empezamos a contar tiempo de pausa
        } else {
          // Si ya estamos en pausa, acumulamos tiempo de pausa
          currentDuration += msPerStep;
        }
      }
    }

    // Agregar la última vibración o pausa si quedó algo pendiente
    if (currentDuration > 0) pattern.push(Math.round(currentDuration));
    return pattern;
  }

  async function getSoundToArray(soundUrl: string) {
    const header = new Headers();
    const authToken = localStorage.getItem("authToken");
    header.append("Authorization", "Bearer " + authToken);

    // Usamos el proxy corsproxy.io para evitar problemas de CORS
    const request = await fetch(
      `https://corsproxy.io/?url=${soundUrl}`
    );

    if (request.ok) {
      // Get the file as a blob
      const fileBlob = await request.blob();
      const array = await getArraySound(fileBlob);
      return array;
    } else {
      console.error("Error fetching sound:", request.statusText);
    }
    }


  const insertButtonOnCanvas = async (soundUrl: string) => {
    const pattern = await getSoundToArray(soundUrl);
    const patternString = JSON.stringify(pattern);
    const instance = await framer.addComponentInstance({
      url: "https://framer.com/m/Vibrate-ElkP.js@vp5tTtxDs8IVVNJUEcLu"
    });

    instance.setAttributes({
      controls: {
        vibrationPattern: patternString,
      }
    });
  };

  // Función para manejar el modal de subir sonido
  const handleOpenUploadModal = () => {
    setUploadModalVisible(true);
  };


// Funcion para limpiar el modal de input de sonido nuevo
const clearInput = () => {
  setSoundDetails({
    name: "",
    description: "",
    metaphors: "",
    file: null,
  });
};

// Función para manejar el envío del formulario de subida de sonido
const handleUploadSound = async () => {
  // Bloquear el botón de subida
  const uploadButton = document.getElementById("uploadSound") as HTMLButtonElement;
  uploadButton.disabled = true;

  const name = soundDetails.name.trim();
  const description = soundDetails.description.trim();
  const tags = soundDetails.metaphors.trim();
  const file = soundDetails.file;

  try {
    // Validar que todos los campos estén completos
    if (description === "" || tags === "" || !file) {
      setMessage("All fields must be filled in");
      setMessageModalVisible(true);
      return;
    }

    // Validar que haya al menos 3 tags
    if (tags.split(",").length < 3) {
      setMessage("Please enter at least 3 tags, separated by a comma.");
      setMessageModalVisible(true);
      return;
    }

    // Validar que el nombre del sonido no exista en el arreglo de sounds
    if (sounds.some((sound) => sound.name === name)) {
      setMessage("The name already exists in the sound list. Please choose another one.");
      setMessageModalVisible(true);
      return;
    }

    // Crear el FormData para enviar el archivo

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tags", tags);
    formData.append("description", description);
    formData.append("license", "Creative Commons 0");
    formData.append("audiofile", file);

    const header = new Headers();
    const authToken = localStorage.getItem("authToken");
    header.append("Authorization", "Bearer " + authToken);
    const requestOptions = {
      method: "POST",
      headers: header,
      body: formData,
    };

    // Subir el sonido a Freesound
    const response = await fetch(
      "https://freesound.org/apiv2/sounds/upload/",
      requestOptions
    );

    const uniqueId = localStorage.getItem("uniqueId");
    if (!uniqueId) {
      await getUniqueId();
    }

    const data = await response.json();

    if (data.id) {
      // Si el sonido se sube exitosamente, actualizar la lista de sonidos
      const key = data.id.toString();
      const sound_data = {
        key: key,
        metaphors: tags,
        url: `https://cdn.freesound.org/previews/${key.slice(
            0,
            3
          )}/${key}_${uniqueId}-lq.mp3`,
        image: `https://cdn.freesound.org/displays/${key.slice(
            0,
            3
          )}/${key}_${uniqueId}_wave_bw_M.png`,
      };

      const newSound: Sound = {
        name: sound_data.key,
        url: sound_data.url,
        image: sound_data.image,
        metaphors: tags, // Tags como etiquetas
      };

      // Agregar un delay de 3 segundos para que el sonido se suba correctamente
      setTimeout(() => {
        const updatedSounds = [...sounds, newSound];
        setSounds(updatedSounds);
        setFilteredSounds(updatedSounds);
        localStorage.setItem("sounds", JSON.stringify(updatedSounds)); // Actualizar en localStorage
  
        // Cerrar el modal de subida y mostrar el mensaje de éxito
        setUploadModalVisible(false);
        clearInput();
        setMessage("Sound uploaded successfully! Please wait a few minutes for it to appear in the sound list.");
        setMessageModalVisible(true); // Mostrar el modal de mensaje
      }, 3000);

    } else {
      // Si ocurre un error al subir el sonido
      setMessage("Error loading sound. Please try again.");
      setMessageModalVisible(true); // Mostrar el modal de mensaje
    }
  } catch (error) {
    console.error("Error uploading sound:", error);
    setMessage("Error uploading sound. Please try again.");
    setMessageModalVisible(true); // Mostrar el modal de mensaje
  } finally {
    // Desbloquear el botón de subida
    uploadButton.disabled = false;
  }
};
  

  // Manejar cambios en el formulario de subida
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSoundDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSoundDetails((prevDetails) => ({
        ...prevDetails,
        file,
      }));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Haptic Vibrations</h2>
      {!isLoggedIn ? (
        <button 
        className="btn btn-blue w-100 mb-5"
        onClick={authenticateUser}>Login in Freesound</button>
      ) : (
        <div>
          <button 
          className="btn w-100 mb-5 btn-custom"
          onClick={handleOpenUploadModal}
          >Upload sound</button>
        </div>
      )}

    {/* Modal para mostrar el mensaje */}
    {messageModalVisible && (
      <div
        id="messageModal"
        className="modal message-modal">
        <div className="msg-modal-content modal-content">
          <h5>{message}</h5>
          <button
            onClick={() => setMessageModalVisible(false)}
            className="btn btn-fit btn-blue"
          >
            Close
          </button>
        </div>
      </div>
      )}


      {/* Modal para ingresar el código de autorización */}
      {modalVisible && (
        <div id="registrationModal" className="modal registration-modal">
          <div className="modal-content reg-modal-content">
          <span
          className="close"
          onClick={() => setModalVisible(false)}
          >
            &times;
          </span>
            <h5>Register in FreeSound</h5>
            <p>
              You need to register with FreeSound in order to upload sounds.
              Please click on the button below to register or log in.
              After logging in, enter the ‘Authorisation Code’.
            </p>
            <button 
              id="registerButton" 
              className="btn btn-blue mb-5"
              onClick={() => window.open('https://freesound.org/apiv2/oauth2/authorize/?client_id=sk4SYvtNWujw8dwXsjub&response_type=code&state=xyz', '_blank')}
            >
              Register/Login
            </button>
            <input
              type="text"
              id="authCode"
              placeholder="Código de autorización"
              required
            />
            <button
              id="saveAuthCode"
              onClick={handleAuthCodeSubmit}
              className="btn btn-custom"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Modal de subir sonido */}
      {uploadModalVisible && (
    <div id="uploadModal" className="modal" style={{ display: "block" }}>
     <div
      className="modal-content upload-modal"
      style={{ backgroundColor:"rgb(62, 62, 62)"}}
    >
      <span
        className="close"
        onClick={() => setUploadModalVisible(false)}
      >
        &times;
      </span>
      <h4>Upload your own sound</h4>
      <label htmlFor="name" style={{ marginTop: "10px" }}>
        Name
      </label>
      <input
        type="text"
        id="name"
        className="uploadInput"
        value={soundDetails.name}
        onChange={handleInputChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        className="uploadInput"
        value={soundDetails.description}
        onChange={handleInputChange}
      />
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        id="metaphors"
        className="uploadInput"
        value={soundDetails.metaphors}
        onChange={handleInputChange}
        />
      <label htmlFor="soundFile">Sound file</label>
      <input
        type="file"
        id="soundFile"
        className="uploadInput file"
        onChange={handleFileChange}
      />
      <div className="d-flex flex-row justify-content-center">
          <button
            onClick={() => setUploadModalVisible(false)}
            className="btn btn-fit btn-danger"
          >
            Cancel
          </button>
          <button
          id="uploadSound"
          onClick={handleUploadSound}
          className="btn btn-fit btn-custom"
          >
            Upload sound
          </button>
      </div>
    </div>
  </div>
)}


      {/* Lista de sonidos */}
      <input
        type="text"
        placeholder="Search by tags"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />

      <div id="sound-list">
        {filteredSounds.map((sound) => (
          <div
            key={sound.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={sound.image}
              alt={sound.name}
              width="50"
              height="50"
              style={{ marginRight: "20px", borderRadius: "8px" }}
            />
            <div style={{ flexGrow: 1 }}>
              <div>
                <strong>Name:</strong> {sound.name}
              </div>
              <div>
                <strong>Tags:</strong> {sound.metaphors}
              </div>
            </div>
            <button
              onClick={() => playSound(sound.url)}
              className="svg"
              title="Play sound" 
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedSound(sound)}
              className="svg"
              title="Edit tags"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
              </svg>
            </button>
            <button
              onClick={() => insertButtonOnCanvas(sound.url)}
              className="svg"
              title="Insert in Framer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> 
              </svg>
            </button>
          </div>
        ))}
      </div>

      {selectedSound && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              position: "relative",
            }}
          >
            <span
            onClick={() => setSelectedSound(null)}
            className="close"
          >
            &times;
          </span>
            <h4>Edit tags</h4>
            <textarea
              value={selectedSound.metaphors}
              onChange={(e) =>
                setSelectedSound({ ...selectedSound, metaphors: e.target.value })
              }
              rows={4}
              style={{ width: "100%", marginBottom: "20px" }}
            />
              <div className="d-flex flex-row justify-content-center">
                <button
                  onClick={() => setSelectedSound(null)}
                  className="btn btn-fit btn-danger"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveMetaphors(selectedSound.metaphors)}
                  className="btn btn-fit btn-custom"
                >
                  Save
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
