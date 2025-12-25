export interface StoryItem {
    label: string;
    img: string;
    target: string;
    highlight?: boolean;
}

export const stories: StoryItem[] = [
    { label: "Home", img: "/assets/images/Story/home.png", target: "/" },
    { label: "Shop", img: "/assets/images/Story/shop.png", target: "/shop" },
    {
        label: "Instant",
        img: "/assets/images/Story/instant.png",
        target: "/instant",
        highlight: true,
    },
    {
        label: "Kitchen",
        img: "/assets/images/Story/kitchen.png",
        target: "/kitchen",
    },
    {
        label: "TruthLab",
        img: "/assets/images/Story/truthlab.png",
        target: "/blogs",
    },
    {
        label: "Journey",
        img: "/assets/images/Story/journey.png",
        target: "/about-us",
    },
];

export const searchPhrases = [
    "Search for spices...",
    "Search for powders...",
    "Search for dehydrated veggies...",
    "Search for dehydrated fruits...",
];
