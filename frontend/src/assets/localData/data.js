import {
  langdeck_projects_cartolang_smart,
  langdeck_projects_saynetes_smart,
  langdeck_projects_dialango_smart,
  langdeck_projects_saynetes_wide,
  saynetes_section_languages,
  saynetes_section_main,
} from "../img/index.js";

export const projects = [
  {
    id: 0,
    image: langdeck_projects_saynetes_smart,
    item: "project1",
    section: "SaynetesSection",
    project: "Langdeck - Saynètes",
    href: "#sayn",
    label: "Saynètes",
    bg_color: "bg-primary-orange",
    desc:
      "De petites histoires pour aider à communiquer sur des thématiques comme le diabète.",
    route: "/language_page",
    full_description:
    {
      "language": "fr",
      "series": "Les Saynètes",
      "title": "Le Diabète",
      "sub_title": "Un projet éducatif et thérapeutique multilingue",
      "sub_title_2": "et thérapeutique multilingue",
      "resume": "Les saynètes sont de petites histoires mettant en scène des personnages. Elles ont pour objectif de sensibiliser sur des thèmes comme le diabète, l'alimentation et la pratique d'exercices physiques, à l'usage des non francophones.",
      "button_text": 'Vers les Saynètes',
      "illustration": langdeck_projects_saynetes_wide,
    },
  },
  {
    id: 1,
    image: langdeck_projects_cartolang_smart,
    item: "project2",
    section: "CartolangSection",
    project: "Langdeck - Cartolang",
    href: "#cart",
    label: "Cartolang",
    desc: "Une application qui recense les principales langues parlées par zone géographque et par pays, avec des expressions utiles.",
    route: "/cartolang",
    bg_color: "bg-primary-inverse",
    full_description:
    {
      "language": "fr",
      "series": "Cartolang",
      "title": "Le Diabète",
      "sub_title": "Projet éducatif",
      "sub_title_2": "et thérapeutique bilingue",
      "resume": "Cette application permet d'identifier rapidement l'origine et la langue parlée d'un non-francophone",
      "button_text": 'Vers les Saynètes',
    },
  },
  {
    id: 2,
    image: langdeck_projects_dialango_smart,
    item: "project3",
    section: "DialangoSection",
    project: "Langdeck - Dialango",
    href: "#DialangoSection",
    label: "Dialango",
    desc:
      "Une application qui permet de tenir une conversation avec une personne ne parlant pas français.",
    route: "/saynetes_page",
    bg_color: "bg-primary-complement",
    full_description:
    {
      "language": "fr",
      "series": "Dialango",
      "title": "Le Diabète",
      "sub_title": "Projet éducatif",
      "sub_title_2": "et thérapeutique bilingue",
      "resume": "Destinée aux personnels d'accueil, cette application permet de piloter une discussion sur un sujet particulier, avec des questions fermées et des traductions entièrement supervisées.",
      "button_text": 'Vers les Saynètes',
    },
  },

];

export const home_sections = [
  {
    "id": "home",
    "href": "/",
    "label": "Home Page",
  },
  {
    "id": "main",
    "href": "#main",
    "label": "Menu principal",
  },
  {
    "id": "desc",
    "href": "#desc",
    "label": "Description",
  },
  {
    "id": "proj",
    "href": "#proj",
    "label": "Projets",
  },
  {
    "id": "apropos",
    "href": "#apro",
    "label": "A propos",
  },
  {
    "id": "sayn",
    "href": "/language_page/",
    "label": "Vers les saynètes",
  },
];

export const saynetes_sections = [
  {
    "id": "desc",
    "href": "#sayndesc",
    "label": "Description",
    "illustration": saynetes_section_main,
    "content": [
      {
        "text": "Les saynètes sont de petites histoires mettant en scène des personnages.",
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Elles sont spécialement conçues pour non francophones.",
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Elles ont pour objectif de sensibiliser sur des thèmes comme le diabète, l'alimentation et la pratique d'exercices physiques.", 
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Les saynètes mettent en scène des professionnels de santé et des patients ne parlant pas le français.",
        "style": "text-lg text-blue-700"
      },
    ]
  },
  {
    "id": "hist",
    "href": "#cardsyst",
    "label": "Principe",
    "illustration": "https://hammer-marteau.com/assets/video/clip-saynetes-v1.0-2.mp4",
    "content": [
      {
        "text": "Les saynètes sont disponibles en plusieurs langues.",
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Les traductions ne proviennent pas d'outils de traduction automatique",
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Elles sont générées en partie par des algorithmes d'intelligence artificielle", 
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Puis elles sont revues par des interprètes professionnels connaissant parfaitement le monde de la santé et son vocabulaire.",
        "style": "text-lg text-blue-700"
      },
    ]
  },
  {
    "id": "about",
    "href": "#about",
    "label": "A propos",
    "illustration": "https://hammer-marteau.com/assets/video/clip-saynetes-v1.0-2.mp4",
    "content": [
      {
        "text": "Les saynètes sont disponibles en plusieurs langues.",
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Les traductions ne proviennent pas d'outils de traduction automatique",
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Elles sont générées en partie par des algorithmes d'intelligence artificielle", 
        "style": "text-lg text-blue-700"
      },
      {
        "text": "Puis elles sont revues par des interprètes professionnels connaissant parfaitement le monde de la santé et son vocabulaire.",
        "style": "text-lg text-blue-700"
      },
    ]
  },
];

export const base_server_url = "https://hammer-marteau.com/";