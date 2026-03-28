const CREST = "/public/assets/crests/edited/manutd1.png";
const KIT = "/public/assets/kits/edited/manutd1.png";

const teams = [
  {
    id: 1,
    name: "Barcelona",
    country: "Spain",
    stadium: { name: "Spotify Camp Nou", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 2,
    name: "Manchester United",
    country: "England",
    stadium: { name: "Old Trafford", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 3,
    name: "Bayern Munich",
    country: "Germany",
    stadium: { name: "Allianz Arena", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 4,
    name: "Real Madrid",
    country: "Spain",
    stadium: { name: "Santiago Bernabéu", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 5,
    name: "Chelsea",
    country: "England",
    stadium: { name: "Stamford Bridge", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 6,
    name: "Liverpool",
    country: "England",
    stadium: { name: "Anfield", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 7,
    name: "AC Milan",
    country: "Italy",
    stadium: { name: "San Siro", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 8,
    name: "Inter Milan",
    country: "Italy",
    stadium: { name: "San Siro", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 9,
    name: "Juventus",
    country: "Italy",
    stadium: { name: "Juventus Stadium", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 10,
    name: "PSG",
    country: "France",
    stadium: { name: "Parc des Princes", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 11,
    name: "Ajax",
    country: "Netherlands",
    stadium: { name: "Johan Cruyff Arena", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 12,
    name: "Atletico Madrid",
    country: "Spain",
    stadium: { name: "Civitas Metropolitano", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 13,
    name: "Arsenal",
    country: "England",
    stadium: { name: "Emirates Stadium", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 14,
    name: "Manchester City",
    country: "England",
    stadium: { name: "Etihad Stadium", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 15,
    name: "Borussia Dortmund",
    country: "Germany",
    stadium: { name: "Signal Iduna Park", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 16,
    name: "Porto",
    country: "Portugal",
    stadium: { name: "Estádio do Dragão", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 17,
    name: "Monaco",
    country: "France",
    stadium: { name: "Stade Louis II", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 18,
    name: "Everton",
    country: "England",
    stadium: { name: "Goodison Park", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 19,
    name: "Tottenham Hotspur",
    country: "England",
    stadium: { name: "Tottenham Hotspur Stadium", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 20,
    name: "AS Roma",
    country: "Italy",
    stadium: { name: "Stadio Olimpico", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 21,
    name: "Sevilla",
    country: "Spain",
    stadium: { name: "Ramón Sánchez-Pizjuán", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 22,
    name: "Valencia",
    country: "Spain",
    stadium: { name: "Mestalla", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 23,
    name: "Napoli",
    country: "Italy",
    stadium: { name: "Stadio Diego Armando Maradona", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 24,
    name: "Bayer Leverkusen",
    country: "Germany",
    stadium: { name: "BayArena", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  },
  {
    id: 25,
    name: "Celtic",
    country: "Scotland",
    stadium: { name: "Celtic Park", image: CREST },
    crest: { normal: CREST, blurred: CREST },
    kits: { normal: KIT, blurred: KIT }
  }
];

export default teams;