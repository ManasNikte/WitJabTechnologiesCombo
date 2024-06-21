import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  // discordBlack,
  // facebook,
  file02,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  plusSquare,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  sliders04,
  // telegram,
  // twitter,
  yourlogo,
  bootstrap,
  css,
  html,
  nodejs,
  postman,
  react,
  tailwind,
  vscode,
  whatsapp,
} from "../assets";


export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "#hero",
  },
  {
    id: "1",
    title: "About",
    url: "#about",
  },
  {
    id: "2",
    title: "Services",
    url: "#services",
  },
  {
    id: "3",
    title: "Portfolio",
    url: "#portfolio",
  },
  {
    id: "4",
    title: "Contact",
    url: "#contact",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const WitJabTechnologiesServices = [
  "Web Solutions",
  "SEO Optimization",
  "API Creation",
];

export const WitJabTechnologiesServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const portfolio = [
  {
    id: "0",
    title: "NM Infocom Website",
    text: "Static website crafted for NM Infocom by our super skilled developers",
    date: "Jan 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "IR RECORDINGS Website",
    text: "Dynamic website crafted for IR RECORDINGS by our super skilled developers",
    date: "Jan 2023",
    status: "done",
    imageUrl: roadmap2,
    colorful: true,
  },
  {
    id: "2",
    title: "StockStory Academy Website",
    text: "Dynamic website crafted for StockStory Academy by our super skilled developers",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
    colorful: true,
  },
  {
    id: "3",
    title: "FlickDrive Media House Productions CRM Website",
    text: "Highly diverse dynamic website crafted for FlickDrive Media House Productions by our super skilled developers",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap3,
    colorful: true,
  },
];


export const AboutPText =
  "WitJab Technologies is a leading software development company that specializes in creating customized websites and applications for businesses across various industries. Our team of talented designers, developers, and project managers work together to deliver innovative software solutions that meet our clients' unique requirements.";
export const AboutSideText =
  "We Use These Technologies For Crafting Amazing Websites For Your Company";
export const AboutPoints = [
  {
    id: "0",
    title: "Lowest Cost, Highest Quality",
  },
  {
    id: "1",
    title: "Time Efficient Delivery of Projects",
  },
  {
    id: "2",
    title: "High-Skilled Developers",
  },
];

export const AboutTechUsed = [
  {
    id: "0",
    title: "HTML",
    icon: html,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "CSS",
    icon: css,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "React Js",
    icon: react,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Tailwind",
    icon: tailwind,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Postman",
    icon: postman,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Bootstrap",
    icon: bootstrap,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "VS Code",
    icon: vscode,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Node Js",
    icon: nodejs,
    width: 38,
    height: 32,
  },
];

export const WhyChooseUs = [
  {
    id: "0",
    title: "High-Skilled Developers",
    text:
      "WitJab Technologies has a team of highly skilled designers, developers, and project managers who have expertise in building customized websites and applications for businesses of all sizes.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Customized Solutions",
    text:
      "WitJab Technologies creates tailored solutions that meet the unique needs of each of their clients. They take the time to understand their clients' business requirements and develop software solutions that help them achieve their goals.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "QA & Testing",
    text:
      "WitJab Technologies places a strong emphasis on quality assurance and testing to ensure that their software solutions meet the highest standards of performance and security",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Latest Frameworks",
    text:
      "WitJab Technologies uses the latest development frameworks and technologies to build software solutions that are scalable, secure, and easy to maintain.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Client Support",
    text:
      "WitJab Technologies provides exceptional customer support to their clients, ensuring that any issues are resolved quickly and efficiently.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Agile Development",
    text:
      "WitJab Technologies follows an agile and collaborative approach to software development, working closely with their clients to ensure that their software solutions are.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  // {
  //   id: "0",
  //   title: "Discord",
  //   iconUrl: discordBlack,
  //   url: "www.discord.com",
  // },
  {
    id: "1",
    title: "Whatsapp",
    iconUrl: whatsapp,
    url: "https://wa.me/7021668646",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/witjab_technologies/",
  },
  // {
  //   id: "3",
  //   title: "Telegram",
  //   iconUrl: telegram,
  //   url: "#",
  // },
  // {
  //   id: "4",
  //   title: "Facebook",
  //   iconUrl: facebook,
  //   url: "#",
  // },
];
