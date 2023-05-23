export enum QuestionType {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
}

type QuestionConfig = {
  body: string;
  opt1: string;
  opt2: string;
  opt3: string;
  correct: number;
};

export const questionTypes: Record<QuestionType, QuestionConfig> = {
  [QuestionType.One]: {
    body: "Why does the Sun sustain life on planet Earth?",
    opt1: "Provides energy",
    opt2: "Heats the water",
    opt3: "Warms us up",
    correct: 1,
  },
  [QuestionType.Two]: {
    body: "The telescope is an optical instrument that allows for detailed observation of distant objects that cannot be seen with the naked eye. The development of this instrument has enabled",
    opt1: "Studying cells",
    opt2: "Discovering celestial bodies",
    opt3: "Determining distances",
    correct: 2,
  },
  [QuestionType.Three]: {
    body: "What is carbon dioxide (CO2)?",
    opt1: "An essential liquid",
    opt2: "A compound",
    opt3: "An atom",
    correct: 2,
  },
  [QuestionType.Four]: {
    body: "In the process of extracting sea salt, the method used is evaporation, which involves:",
    opt1: "Evaporating water",
    opt2: "Evaporating salt",
    opt3: "Salting",
    correct: 1,
  },
  [QuestionType.Five]: {
    body: "Which of the following is an insect?",
    opt1: "Dog",
    opt2: "Octopus",
    opt3: "Cockroach",
    correct: 3,
  },
  [QuestionType.Six]: {
    body: "Coffee is a stimulating beverage that allows people to stay active for long periods of time. Due to its stimulating properties, it can lead to addiction and cause secondary problems such as insomnia and gastritis. Coffee can cause addiction because:",
    opt1: "It activates the body",
    opt2: "It induces sadness",
    opt3: "It aids digestion",
    correct: 1,
  },
  [QuestionType.Seven]: {
    body: "Dino, one of the dogs on a farm, was sick last week. This week, the other dogs on the farm are also sick. Dino's illness spread to the other dogs on the farm because:",
    opt1: "They ate the same thing",
    opt2: "They are friends",
    opt3: "Sunlight",
    correct: 1,
  },
  [QuestionType.Eight]: {
    body: "Diana ate a package of plain-flavored potato chips and later experienced general discomfort, vomiting, and diarrhea. She was subsequently diagnosed with gastrointestinal problems due to poisoning. What precautions should Diana have taken before consuming this food?",
    opt1: "Checking the packaging",
    opt2: "Chewing quickly",
    opt3: "Checking the expiration date",
    correct: 3,
  },
  [QuestionType.Nine]: {
    body: "The problem faced by many cities is that they manage water properly but do not know how to evacuate the used and contaminated water. What is the problem with contaminating water?",
    opt1: "It changes the climate",
    opt2: "It makes us sick",
    opt3: "It generates odors",
    correct: 2,
  },
  [QuestionType.Ten]: {
    body: "Which of the following is an insect?",
    opt1: "Dog",
    opt2: "Octopus",
    opt3: "Cockroach",
    correct: 3,
  },
};
