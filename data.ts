export interface Post {
    id?: string; // Optional if handled by MongoDB _id
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    likes: number;
    userId: string;
    user: {
        name: string;
    };
    comments: number;
    createdAt: string;
}

export const gardeningPosts: Post[] = [
    {
        title: "The Ultimate Guide to Companion Planting in Raised Beds",
        content: "Companion planting is an excellent way to maximize space and naturally deter pests in your backyard raised beds. By planting high-nitrogen fixers like bush beans alongside heavy feeders like kale, you create a self-sustaining miniature ecosystem. Marigolds are another fantastic addition, releasing chemical compounds into the soil that keep harmful nematodes at bay while inviting essential pollinators.",
        thumbnail: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
        tags: ["Organic", "Raised Beds", "Companion Planting", "Permaculture"],
        likes: 342,
        userId: "usr_6f8b2c1a",
        user: { name: "Clara Greenfield" },
        comments: 28,
        createdAt: "2026-07-15T09:30:00Z"
    },
    {
        title: "How to Maximize Your Tomato Yield This Summer",
        content: "Getting a massive harvest of juicy, organic tomatoes requires more than just regular watering. The secret lies in early structural support, deep watering sessions that encourage robust taproots, and strategic pruning of non-fruiting suckers. Make sure to apply a heavy layer of organic straw mulch around the base to keep soil moisture balanced and protect low-hanging leaves from soil-borne fungal spores.",
        thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675",
        tags: ["Vegetables", "Tomatoes", "Summer Gardening", "Pruning"],
        likes: 512,
        userId: "usr_9e2d4a7c",
        user: { name: "Marcus Soilson" },
        comments: 47,
        createdAt: "2026-07-18T14:15:00Z"
    },
    {
        title: "Mastering Indoor Monstera Propagation: Step-by-Step",
        content: "Propagating a Monstera Deliciosa is incredibly rewarding if you know how to identify healthy leaf nodes. Always make clean cuts right below an active aerial root using sterilized shears. Placing your node cuttings in clean, filtered water next to a bright, indirect window will encourage healthy root growth within two to three weeks, setting them up perfectly for transplanting into well-draining soil mix.",
        thumbnail: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
        tags: ["Houseplants", "Propagation", "Monstera", "Indoor Jungle"],
        likes: 289,
        userId: "usr_3b8e9f1d",
        user: { name: "Elena Moss" },
        comments: 19,
        createdAt: "2026-07-19T08:00:00Z"
    },
    {
        title: "Demystifying Backyard Composting: Turn Waste Into Black Gold",
        content: "Starting a dynamic compost pile is much simpler than it looks. The core formula requires maintaining a healthy 3:1 balance of carbon-rich 'brown' materials (like dry autumn leaves, twigs, and shredded cardboard) to nitrogen-rich 'green' inputs (like vegetable scraps, coffee grounds, and fresh grass clippings). Turning your pile once a week oxygenates the organic breakdown, creating rich, nutrient-dense topsoil fast.",
        thumbnail: "https://images.unsplash.com/photo-1605684954448-c7115110393f",
        tags: ["Composting", "Zero Waste", "Soil Health", "Organic"],
        likes: 421,
        userId: "usr_1a5c7d8e",
        user: { name: "Julian Thorne" },
        comments: 33,
        createdAt: "2026-07-12T11:45:00Z"
    },
    {
        title: "5 Essential Tips for Managing Aphids Without Harsh Chemicals",
        content: "An aphid infestation can devastate tender new growth overnight, but you don't need synthetic chemical sprays to eliminate them. A strong blast of cold water from your garden hose knocks them clean off your plants, preventing their return. For persistent spots, spraying a dilute organic mixture of pure neem oil and castile soap blankets their soft bodies, offering a safe, fully biodegradable control solution.",
        thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        tags: ["Pest Control", "Organic", "Garden Safety", "EcoFriendly"],
        likes: 198,
        userId: "usr_4f2a8b9d",
        user: { name: "Sarah Bloom" },
        comments: 12,
        createdAt: "2026-07-17T16:20:00Z"
    },
    {
        title: "Designing a Low-Water Xeriscape Garden for Arid Climates",
        content: "Xeriscape design isn't just about gravel beds and stark desert cacti; it is about working intelligently with local rainfall patterns. Incorporating native, drought-resistant perennials like lavender, stonecrop sedum, and dynamic ornamental grasses creates gorgeous layers of color and texture while reducing your regular landscape water footprint by up to sixty percent.",
        thumbnail: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78",
        tags: ["Xeriscaping", "Drought Tolerant", "Sustainability", "Garden Design"],
        likes: 254,
        userId: "usr_7e9a1c3f",
        user: { name: "David Stone" },
        comments: 22,
        createdAt: "2026-07-14T10:05:00Z"
    },
    {
        title: "Growing Culinary Herbs Indoors: A Winter Survival Guide",
        content: "Keeping fresh rosemary, thyme, and basil thriving indoors throughout the dark winter months comes down to two absolute non-negotiables: bright light and flawless drainage. Placing your clay pots in south-facing windows provides the highest natural sun exposure, while adding affordable full-spectrum LED grow lights over your indoor shelves bridges the gap during cloudy weather.",
        thumbnail: "https://images.unsplash.com/photo-1533038590840-1cde6b66b730",
        tags: ["Herbs", "Indoor Gardening", "Culinary", "Winter Care"],
        likes: 310,
        userId: "usr_2d6f8e9b",
        user: { name: "Chloe Sprout" },
        comments: 15,
        createdAt: "2026-07-16T07:50:00Z"
    },
    {
        title: "Understanding Soil pH and How It Dictates Plant Health",
        content: "Your soil's pH rating directly dictates your plants' capacity to draw up vital nutrients through their root membranes. Acid-loving varieties like blueberries and hydrangeas thrive beautifully in soils with a lower pH around 5.5, whereas standard brassicas prefer neutral to slightly alkaline baselines. Testing your native garden beds annually allows you to make precise amendments using organic sulfur or agricultural lime.",
        thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
        tags: ["Soil Science", "Botanical Care", "Science", "Garden Prep"],
        likes: 185,
        userId: "usr_8b4c2d6e",
        user: { name: "Dr. Alan Root" },
        comments: 26,
        createdAt: "2026-07-11T13:10:00Z"
    },
    {
        title: "How to Build an Affordable Automatic Drip Irrigation System",
        content: "Drip irrigation delivers clean hydration straight to your plant roots, eliminating water waste from wind dispersal and evaporation. Setting up a DIY system using flexible half-inch poly tubing, pressure-compensating inline emitters, and a simple programmable battery timer at your outdoor faucet keeps your garden growing perfectly on autopilot without breaking the bank.",
        thumbnail: "https://images.unsplash.com/photo-1563514223749-757c32bfcf54",
        tags: ["DIY", "Irrigation", "Garden Hacks", "Water Saving"],
        likes: 476,
        userId: "usr_5c9e3b7a",
        user: { name: "Ben Maker" },
        comments: 54,
        createdAt: "2026-07-13T15:40:00Z"
    },
    {
        title: "The Magic of No-Till Gardening: Protecting the Wood Wide Web",
        content: "Digging and rototilling your garden beds every spring fractures the underground network of beneficial mycorrhizal fungi threads that supply plants with water and nutrients. Adopting a strict no-till philosophy allows you to simply layer organic compost, mulched wood chips, and green manures directly over the surface, preserving your vital subterranean biological structures.",
        thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        tags: ["NoTill", "Mycorrhizae", "Organic Farming", "Regenerative"],
        likes: 603,
        userId: "usr_0a8f7e6b",
        user: { name: "Gaia Fern" },
        comments: 61,
        createdAt: "2026-07-19T11:22:00Z"
    }
];