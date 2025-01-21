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
  metaphors: "latido del corazón,pulsante,tocando,palpando",
},
{
  name: "v-09-09-8-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-09-8-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-09-8-20.png",
  metaphors: "latido del corazón,tocando,animal",
},
{
  name: "v-09-09-8-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-09-8-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-09-8-24.png",
  metaphors: "motor,yendo o viniendo",
},
{
  name: "v-09-10-11-55",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-11-55.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-11-55.png",
  metaphors: "alarma,saltando,deslizando,teléfono",
},
{
  name: "v-09-10-11-58",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-11-58.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-11-58.png",
  metaphors: "ronroneando,roncando,animal,yendo o viniendo",
},
{
  name: "v-09-10-12-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-11.png",
  metaphors: "alarma,shock eléctrico",
},
{
  name: "v-09-10-12-13",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-13.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-13.png",
  metaphors: "alarma,tocando,instrumentos musicales,batería,bip,teléfono,celebración",
},
{
  name: "v-09-10-12-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-16.png",
  metaphors: "instrumentos musicales,bip",
},
{
  name: "v-09-10-12-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-2.png",
  metaphors: "roncando,zumbido",
},
{
  name: "v-09-10-12-6",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-6.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-6.png",
  metaphors: "roncando,campana,caminando,alarma,yendo o viniendo",
},
{
  name: "v-09-10-12-9",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-12-9.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-12-9.png",
  metaphors: "tocando,alarma,instrumentos musicales,batería,animal",
},
{
  name: "v-09-10-3-52",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-3-52.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-3-52.png",
  metaphors: "tocando,código morse,teléfono,alarma",
},
{
  name: "v-09-10-3-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-3-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-3-56.png",
  metaphors: "pistola",
},
{
  name: "v-09-10-4-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-2.png",
  metaphors: "tocando,pulsante",
},
{
  name: "v-09-10-4-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-20.png",
  metaphors: "latido del corazón,rascando,animal,tocando",
},
{
  name: "v-09-10-4-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-23.png",
  metaphors: "latido del corazón,tocando,rascando,reloj",
},
{
  name: "v-09-10-4-25",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-25.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-25.png",
  metaphors: "motor,latido del corazón,tocando",
},
{
  name: "v-09-10-4-6",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-4-6.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-4-6.png",
  metaphors: "tocando,yendo o viniendo,animal",
},
{
  name: "v-09-10-6-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-16.png",
  metaphors: "tocando,bip,latido del corazón",
},
{
  name: "v-09-10-6-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-22.png",
  metaphors: "pistola,shock eléctrico,motor,andando",
},
{
  name: "v-09-10-6-27",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-27.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-27.png",
  metaphors: "tocando,bip,alarma,instrumentos musicales,batería",
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
  metaphors: "pulsante,juego,tocando,roncando,deslizando",
},
{
  name: "v-09-10-6-46",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-46.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-46.png",
  metaphors: "",
},
{
  name: "v-09-10-6-5",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-5.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-5.png",
  metaphors: "tocando,instrumentos musicales,batería,latido del corazón,reloj",
},
{
  name: "v-09-10-6-59",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-6-59.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-6-59.png",
  metaphors: "motor,zumbido,animal,andando,shaking",
},
{
  name: "v-09-10-7-34",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-7-34.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-7-34.png",
  metaphors: "tocando,palpando,latido del corazón",
},
{
  name: "v-09-10-7-36",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-7-36.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-7-36.png",
  metaphors: "zumbido,animal,yendo o viniendo,campana",
},
{
  name: "v-09-10-7-9",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-7-9.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-7-9.png",
  metaphors: "tocando",
},
{
  name: "v-09-10-8-5",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-8-5.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-8-5.png",
  metaphors: "juego,palpando,alarma",
},
{
  name: "v-09-10-8-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-10-8-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-10-8-7.png",
  metaphors: "juego,pulsante,palpando,tocando,zumbido",
},
{
  name: "v-09-11-3-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-12.png",
  metaphors: "alarma,teléfono,SOS",
},
{
  name: "v-09-11-3-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-16.png",
  metaphors: "alarma,teléfono,instrumentos musicales,batería",
},
{
  name: "v-09-11-3-19",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-19.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-19.png",
  metaphors: "código morse,bocina,juego,teléfono,alarma",
},
{
  name: "v-09-11-3-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-21.png",
  metaphors: "latido del corazón,teléfono",
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
  metaphors: "alarma,motor",
},
{
  name: "v-09-11-3-43",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-43.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-43.png",
  metaphors: "dancing,tocando,instrumentos musicales",
},
{
  name: "v-09-11-3-50",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-50.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-50.png",
  metaphors: "juego,saltando",
},
{
  name: "v-09-11-3-54",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-54.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-54.png",
  metaphors: "latido del corazón,pulsante,tocando,reloj,saltando",
},
{
  name: "v-09-11-3-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-3-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-3-56.png",
  metaphors: "",
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
  metaphors: "tocando,instrumentos musicales,batería,juego",
},
{
  name: "v-09-11-4-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-12.png",
  metaphors: "motor,campana,juego,alarma",
},
{
  name: "v-09-11-4-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-22.png",
  metaphors: "zumbido,celebración,bocina,alarma",
},
{
  name: "v-09-11-4-3",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-3.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-3.png",
  metaphors: "tocando,código morse,andando,saltando",
},
{
  name: "v-09-11-4-41",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-41.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-41.png",
  metaphors: "yendo o viniendo,going away,andando,latido del corazón",
},
{
  name: "v-09-11-4-54",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-54.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-54.png",
  metaphors: "tocando,alarma,pulsante,bip,palpando,teléfono",
},
{
  name: "v-09-11-4-8",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-11-4-8.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-11-4-8.png",
  metaphors: "tocando",
},
{
  name: "v-09-12-1-0",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-0.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-0.png",
  metaphors: "palpando,naturaleza,animal",
},
{
  name: "v-09-12-1-19",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-19.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-19.png",
  metaphors: "",
},
{
  name: "v-09-12-1-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-23.png",
  metaphors: "bip,juego,palpando",
},
{
  name: "v-09-12-1-29",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-29.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-29.png",
  metaphors: "bip,juego,heartbeat,rascando,animal,instrumentos musicales,batería,tocando",
},
{
  name: "v-09-12-1-39",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-39.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-39.png",
  metaphors: "instrumentos musicales,batería,echo,campana",
},
{
  name: "v-09-12-1-48",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-48.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-48.png",
  metaphors: "tocando,pulsante,bip",
},
{
  name: "v-09-12-1-53",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-1-53.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-1-53.png",
  metaphors: "latido del corazón,instrumentos musicales,batería",
},
{
  name: "v-09-12-2-17",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-17.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-17.png",
  metaphors: "pistola,motor,animal",
},
{
  name: "v-09-12-2-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-20.png",
  metaphors: "tocando,juego",
},
{
  name: "v-09-12-2-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-23.png",
  metaphors: "alarma,bip,deslizando,rascando,animal",
},
{
  name: "v-09-12-2-40",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-2-40.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-2-40.png",
  metaphors: "caminando",
},
{
  name: "v-09-12-8-10",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-10.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-10.png",
  metaphors: "motor,roncando,bocina,animal",
},
{
  name: "v-09-12-8-13",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-13.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-13.png",
  metaphors: "motor,zumbido,animal,roncando",
},
{
  name: "v-09-12-8-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-21.png",
  metaphors: "tocando,bip,reloj,palpando",
},
{
  name: "v-09-12-8-27",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-27.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-27.png",
  metaphors: "bip,campana,naturaleza",
},
{
  name: "v-09-12-8-30",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-12-8-30.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-12-8-30.png",
  metaphors: "animal,roncando,naturaleza",
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
  metaphors: "alarma,yendo o viniendo,juego,campana,bocina,saltando",
},
{
  name: "v-09-18-1-55",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-1-55.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-1-55.png",
  metaphors: "latido del corazón,tocando",
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
  metaphors: "saltando,animal,juego,instrumentos musicales,batería,alarma",
},
{
  name: "v-09-18-4-15",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-15.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-15.png",
  metaphors: "bip,tocando,palpando",
},
{
  name: "v-09-18-4-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-16.png",
  metaphors: "bip,campana,juego,latido del corazón,teléfono,ranas,animal",
},
{
  name: "v-09-18-4-18",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-18.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-18.png",
  metaphors: "bip,bocina,alarma,juego,naturaleza,animal,tocando",
},
{
  name: "v-09-18-4-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-22.png",
  metaphors: "respirando,pulsante,latido del corazón",
},
{
  name: "v-09-18-4-56",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-18-4-56.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-18-4-56.png",
  metaphors: "yendo o viniendo,alarma,deslizando",
},
{
  name: "v-09-23-6-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-23-6-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-23-6-24.png",
  metaphors: "animal,motor,deslizando,yendo o viniendo",
},
{
  name: "v-09-26-1-39",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-09-26-1-39.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-09-26-1-39.png",
  metaphors: "pulsante",
},
{
  name: "v-10-09-1-1",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-1.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-1.png",
  metaphors: "tocando,batería",
},
{
  name: "v-10-09-1-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-11.png",
  metaphors: "rascando",
},
{
  name: "v-10-09-1-12",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-12.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-12.png",
  metaphors: "alarma,instrumentos musicales,juego",
},
{
  name: "v-10-09-1-14",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-14.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-14.png",
  metaphors: "teléfono,instrumentos musicales,batería,bip,music,singing,celebración",
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
  metaphors: "roncando,naturaleza",
},
{
  name: "v-10-09-1-8",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-1-8.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-1-8.png",
  metaphors: "zumbido,animal,celebración",
},
{
  name: "v-10-09-5-0",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-0.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-0.png",
  metaphors: "alarma,tocando",
},
{
  name: "v-10-09-5-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-2.png",
  metaphors: "tocando,código morse",
},
{
  name: "v-10-09-5-4",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-4.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-4.png",
  metaphors: "alarma,campana,shock eléctrico",
},
{
  name: "v-10-09-5-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-09-5-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-09-5-7.png",
  metaphors: "shock eléctrico,pistola,bip,juego",
},
{
  name: "v-10-10-1-10",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-10.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-10.png",
  metaphors: "",
},
{
  name: "v-10-10-1-18",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-18.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-18.png",
  metaphors: "código morse,alarma,bip,juego,latido del corazón,palpando",
},
{
  name: "v-10-10-1-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-21.png",
  metaphors: "teléfono,alarma,andando",
},
{
  name: "v-10-10-1-5",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-10-1-5.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-10-1-5.png",
  metaphors: "deslizando,yendo o viniendo,alarma,juego",
},
{
  name: "v-10-18-11-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-18-11-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-18-11-11.png",
  metaphors: "teléfono,alarma,bip,juego",
},
{
  name: "v-10-21-2-48",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-2-48.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-2-48.png",
  metaphors: "instrumentos musicales,batería,cymbal,explosion tocando",
},
{
  name: "v-10-21-3-11",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-11.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-11.png",
  metaphors: "tocando,juego",
},
{
  name: "v-10-21-3-17",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-17.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-17.png",
  metaphors: "zumbido,alarma",
},
{
  name: "v-10-21-3-2",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-2.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-2.png",
  metaphors: "bip,reloj",
},
{
  name: "v-10-21-3-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-21.png",
  metaphors: "",
},
{
  name: "v-10-21-3-30",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-30.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-30.png",
  metaphors: "bip,zumbido,shock eléctrico,alarma",
},
{
  name: "v-10-21-3-33",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-33.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-33.png",
  metaphors: "tocando,bip,palpando,reloj",
},
{
  name: "v-10-21-3-39",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-39.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-39.png",
  metaphors: "alarma,juego,fail juego,pistola,shock eléctrico",
},
{
  name: "v-10-21-3-4",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-4.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-4.png",
  metaphors: "tocando,saltando,instrumentos musicales,batería,yendo o viniendo,SOS,celebración,pistola,alarma,palpando",
},
{
  name: "v-10-21-3-45",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-45.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-45.png",
  metaphors: "alarma,teléfono,instrumentos musicales,batería,juego,celebración",
},
{
  name: "v-10-21-3-7",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-21-3-7.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-21-3-7.png",
  metaphors: "motor,getting close,coming & going,deslizando",
},
{
  name: "v-10-23-1-10",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-10.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-10.png",
  metaphors: "yendo o viniendo,teléfono,alarma,bocina,bip",
},
{
  name: "v-10-23-1-16",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-16.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-16.png",
  metaphors: "teléfono,alarma,SOS,bocina,juego,bip,palpando",
},
{
  name: "v-10-23-1-21",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-21.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-21.png",
  metaphors: "yendo o viniendo,motor,roncando,something moving,something rolling,deslizando",
},
{
  name: "v-10-23-1-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-23.png",
  metaphors: "motor,shock eléctrico,roncando,yendo o viniendo,stopping,growl,chainsaw,a door closing",
},
{
  name: "v-10-23-1-24",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-23-1-24.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-23-1-24.png",
  metaphors: "motor,pistola,zumbido,animal,yendo o viniendo,celebración",
},
{
  name: "v-10-28-7-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-22.png",
  metaphors: "SOS,alarma,bip,tocando,batería",
},
{
  name: "v-10-28-7-23",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-23.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-23.png",
  metaphors: "alarma,tocando",
},
{
  name: "v-10-28-7-26",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-26.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-26.png",
  metaphors: "rascando,animal,naturaleza",
},
{
  name: "v-10-28-7-29",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-29.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-29.png",
  metaphors: "andando,yendo o viniendo,motor",
},
{
  name: "v-10-28-7-31",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-31.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-31.png",
  metaphors: "caminando,tocando,reloj",
},
{
  name: "v-10-28-7-33",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-33.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-33.png",
  metaphors: "zumbido,motor",
},
{
  name: "v-10-28-7-35",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-35.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-35.png",
  metaphors: "zumbido,animal,fog bocina",
},
{
  name: "v-10-28-7-36",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-28-7-36.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-28-7-36.png",
  metaphors: "zumbido,shock eléctrico,motor,roncando,teléfono,animal",
},
{
  name: "v-10-29-4-20",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-29-4-20.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-29-4-20.png",
  metaphors: "roncando,motor,yendo o viniendo,respirando",
},
{
  name: "v-10-29-4-22",
  url: "https://www.cs.ubc.ca/~seifi/VibViz/vteffects/v-10-29-4-22.wav",
  image: "https://www.cs.ubc.ca/~seifi/VibViz/PNGglyph/v-10-29-4-22.png",
  metaphors: "motor,juego",
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
    } else {
      setModalVisible(true); // Si no está logueado, muestra el modal de login
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
    console.log("A");
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

      console.log(request)

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

    const msPerStep = (1000 / sampleRate) * sampleStep; // Tiempo en ms para cada ⁠ sampleStep ⁠

    // Recorrer los datos del audio tomando muestras a intervalos de ⁠ sampleStep ⁠
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
    console.log(pattern);
    return pattern;
  }

  async function getSoundToArray(soundUrl: string) {
    const header = new Headers();
    const authToken = localStorage.getItem("authToken");
    header.append("Authorization", "Bearer " + authToken);
    // Add the X-Requested-With header to satisfy CORS Anywhere requirements
    header.append("X-Requested-With", "XMLHttpRequest");
    const requestOptions = {
      method: "GET",
      headers: header,
    };

    const request = await fetch(
      `https://cors-anywhere.herokuapp.com/${soundUrl}`, // Use CORS Anywhere proxy
      requestOptions
    );

    if (request.ok) {
      // Get the file as a blob
      const fileBlob = await request.blob();
      console.log(fileBlob);
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
      setMessage("Todos los campos son obligatorios");
      setMessageModalVisible(true);
      return;
    }

    // Validar que haya al menos 3 tags
    if (tags.split(",").length < 3) {
      setMessage("Por favor, ingrese al menos 3 tags.");
      setMessageModalVisible(true);
      return;
    }

    // Validar que el nombre del sonido no exista en el arreglo de sounds
    if (sounds.some((sound) => sound.name === name)) {
      setMessage("El nombre ya existe en la lista de sonidos. Por favor, elija otro.");
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
    console.log(data);
    console.log(uniqueId)
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
        metaphors: tags, // Tags como metáforas
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
        setMessage("Sonido subido exitosamente! Aguarde unos minutos para que aparezca en la lista de sonidos.");
        setMessageModalVisible(true); // Mostrar el modal de mensaje
      }, 3000);

    } else {
      // Si ocurre un error al subir el sonido
      setMessage("Error al cargar el sonido. Por favor, inténtelo de nuevo.");
      setMessageModalVisible(true); // Mostrar el modal de mensaje
    }
  } catch (error) {
    console.error("Error al subir el sonido:", error);
    setMessage("Error al subir el sonido. Por favor, inténtelo de nuevo.");
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Diseño Vibrante</h2>
      {!isLoggedIn ? (
        <button onClick={authenticateUser}>Iniciar sesión en Freesound</button>
      ) : (
        <div>
          <button onClick={handleOpenUploadModal}>Subir Sonido</button>
        </div>
      )}

    {/* Modal para mostrar el mensaje */}
    {messageModalVisible && (
      <div
        id="messageModal"
        className="modal"
        style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center" }}
      >
        <div className="modal-content" style={{ backgroundColor: "#fff", color: "#000", padding: "20px", borderRadius: "10px", width: "300px", textAlign: "center" }}>
          <h3>{message}</h3>
          <button
            onClick={() => setMessageModalVisible(false)}
            style={{ backgroundColor: "#28a745", color: "#fff", padding: "10px", borderRadius: "5px" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    )}


      {/* Modal para ingresar el código de autorización */}
      {modalVisible && (
        <div id="registrationModal" className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span
              className="close-register"
              onClick={() => setModalVisible(false)}
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
            <h2>Por favor registrese en FreeSound</h2>
            <p>
              Tienes que registrarte en FreeSound para poder subir sonidos. Por
              favor, haga clic en el botón de abajo para registrarse o iniciar
              sesión. Después de registrarse ingrese el 'Código de Autorización'
              para poder cargar sonidos.
            </p>
            <button id="registerButton">
              <a
                href="https://freesound.org/apiv2/oauth2/authorize/?client_id=sk4SYvtNWujw8dwXsjub&response_type=code&state=xyz"
                target="_blank"
              >
                Registrarse/Iniciar sesión
              </a>
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
              style={{ marginTop: "10px" }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Modal de subir sonido */}
      {uploadModalVisible && (
  <div id="uploadModal" className="modal" style={{ display: "block" }}>
    <div
      className="modal-content"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000", // Fondo negro
        color: "#fff", // Texto blanco
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para mejor visibilidad
      }}
    >
      <span
        className="close-upload"
        onClick={() => setUploadModalVisible(false)}
        style={{
          cursor: "pointer",
          color: "#fff", // Icono de cerrar en blanco
          fontSize: "24px",
          position: "absolute",
        }}
      >
        &times;
      </span>
      <h2>Subir un sonido</h2>
      <label htmlFor="name" style={{ marginTop: "10px" }}>
        Nombre
      </label>
      <input
        type="text"
        id="name"
        className="uploadInput"
        value={soundDetails.name}
        onChange={handleInputChange}
        style={{
          height: "30px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
      <label htmlFor="description">Descripción</label>
      <input
        type="text"
        id="description"
        className="uploadInput"
        value={soundDetails.description}
        onChange={handleInputChange}
        style={{
          height: "30px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
      <label htmlFor="tags">Metáforas</label>
      <input
        type="text"
        id="metaphors"
        className="uploadInput"
        value={soundDetails.metaphors}
        onChange={handleInputChange}
        style={{
          height: "30px",
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "16px",
        }}
        />
      <label htmlFor="soundFile">Archivo de sonido</label>
      <input
        type="file"
        id="soundFile"
        className="uploadInput"
        onChange={handleFileChange}
        style={{
          marginBottom: "10px",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
      <button
        id="uploadSound"
        onClick={handleUploadSound}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Subir
      </button>
    </div>
  </div>
)}


      {/* Lista de sonidos */}
      <input
        type="text"
        placeholder="Filtrar por metáfora"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
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
                <strong>Nombre:</strong> {sound.name}
              </div>
              <div>
                <strong>Metáforas:</strong> {sound.metaphors}
              </div>
            </div>
            <button
              onClick={() => playSound(sound.url)}
              style={{
                width: "fit-content",
                padding: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
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
              style={{
                width: "fit-content",
                padding: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
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
              style={{
                width: "fit-content",
                padding: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
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
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>Editar Metáforas</h3>
            <textarea
              value={selectedSound.metaphors}
              onChange={(e) =>
                setSelectedSound({ ...selectedSound, metaphors: e.target.value })
              }
              rows={4}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <button
              onClick={() => saveMetaphors(selectedSound.metaphors)}
              style={{ marginRight: "10px" }}
            >
              Guardar
            </button>
            <button onClick={() => setSelectedSound(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
