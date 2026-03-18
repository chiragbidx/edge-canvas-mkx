// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ...types unchanged...

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "New Release",
    badgeOuter: "FlickVault is Live!",
    titleBefore: "Rent movies with",
    titleHighlight: "FlickVault",
    titleAfter: "",
    subtitle:
      "Stream and rent your favorite movies instantly. Discover classics and new releases, anywhere, anytime. FlickVault is your secure vault for movie entertainment.",
    primaryCta: { label: "Browse Movies", href: "/dashboard/movies" },
    secondaryCta: { label: "Get Started", href: "/auth#signup" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "FlickVault movie dashboard preview",
  },

  sponsors: {
    heading: "Powered by the best",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Puzzle", name: "Supabase" },
      { icon: "Drama", name: "Sentry" },
    ],
  },

  benefits: {
    eyebrow: "Why FlickVault",
    heading: "The Easiest Way to Rent Movies Online",
    description:
      "Enjoy instant access to thousands of movies, intuitive browsing, and a seamless rental experience. Your movie vault—always open.",
    items: [
      {
        icon: "Video",
        title: "Instant Streaming",
        description: "Start watching immediately after renting with HD streaming.",
      },
      {
        icon: "Lock",
        title: "Safe & Secure",
        description: "Your transactions and data are protected by industry best practices.",
      },
      {
        icon: "Clock",
        title: "Rent or Buy",
        description: "Flexible rental periods or permanent addition to your vault—your choice.",
      },
      {
        icon: "Users",
        title: "Family Friendly",
        description: "Parental controls and curated lists for all ages.",
      },
    ],
  },

  features: {
    eyebrow: "Features",
    heading: "Your Personalized Movie Vault",
    subtitle:
      "FlickVault provides all the tools you need for a modern, simple, and secure movie rental experience.",
    items: [
      { icon: "ListVideo", title: "Curated Library", description: "Search among thousands of top-rated films and hidden gems." },
      { icon: "UserCheck", title: "Personal Watchlist", description: "Bookmark movies and keep track of rentals." },
      { icon: "CreditCard", title: "Easy Checkout", description: "Rent in seconds with seamless payments and instant access." },
      { icon: "Timer", title: "Flexible Rental", description: "Set your own time—rent for a weekend or keep forever." },
      { icon: "Settings", title: "Account Dashboard", description: "Control rentals, payment methods, and notifications." },
      { icon: "Smartphone", title: "Any Device", description: "Enjoy movies on your laptop, TV, phone, or tablet." },
    ],
  },

  services: {
    eyebrow: "How it works",
    heading: "Core FlickVault Capabilities",
    subtitle:
      "A full-featured rental solution—ready for movie lovers and easy for anyone to use.",
    items: [
      { title: "Instant Search", description: "Easily find any movie in our extensive catalogue.", pro: false },
      { title: "Flexible Rental", description: "From 48 hours to forever, set your preferred time.", pro: false },
      { title: "Wallet-Free Experience", description: "Simple, secure payments with any device.", pro: false },
      { title: "HD Streaming", description: "Crystal clear playback on all your devices.", pro: true },
    ],
  },

  testimonials: {
    eyebrow: "Testimonials",
    heading: "FlickVault Fans",
    reviews: [
      { image: "/demo-img.jpg", name: "Aarav Shah", role: "Parent & Movie Lover", comment: "FlickVault brought back movie nights at our place—quick, easy, and a huge selection!", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Maya Patel", role: "Student", comment: "Super easy to use! I can finally find old classics to rent for studies and fun.", rating: 4.9 },
      { image: "/demo-img.jpg", name: "Nikhil Rao", role: "Indie Filmmaker", comment: "Great streaming quality, and the dashboard lets me manage everything with ease.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Emma Brooks", role: "Film Critic", comment: "Love the curated lists. FlickVault saves me time finding what to watch next.", rating: 4.8 },
      { image: "/demo-img.jpg", name: "Sofia Green", role: "Movie Buff", comment: "No more waiting for discs—rent and watch in seconds. Highly recommend!", rating: 5.0 },
    ],
  },

  team: {
    eyebrow: "Team",
    heading: "Meet the FlickVault Team",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Product Architect"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/chiragdodiya/" },
        ],
      },
      {
        imageUrl: "/team2.jpg",
        firstName: "Corey",
        lastName: "Mason",
        positions: ["Engineering Lead"],
        socialNetworks: [
          { name: "LinkedIn", url: "#" },
        ],
      },
      {
        imageUrl: "/team3.jpg",
        firstName: "Ava",
        lastName: "Brooks",
        positions: ["UX Designer"],
        socialNetworks: [
          { name: "LinkedIn", url: "#" },
        ],
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "Plans for Every Movie Lover",
    subtitle: "From weekend rentals to ultimate movie libraries, FlickVault has something for everyone.",
    priceSuffix: "/rental",
    plans: [
      {
        title: "Starter",
        popular: false,
        price: 2.99,
        description: "Rent any movie for up to 48 hours.",
        buttonText: "Rent now",
        benefits: [
          "Access to all movies",
          "HD streaming",
          "No subscription required",
        ],
      },
      {
        title: "Pro",
        popular: true,
        price: 9.99,
        description: "Monthly plan with unlimited rentals.",
        buttonText: "Start trial",
        benefits: [
          "Unlimited rentals",
          "Priority support",
          "Family sharing",
        ],
      },
      {
        title: "Buy & Own",
        popular: false,
        price: 19.99,
        description: "Purchase and keep movies forever.",
        buttonText: "Buy now",
        benefits: [
          "Lifetime access",
          "Best quality available",
          "Watch anytime, anywhere",
        ],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading: "Talk to FlickVault",
    description:
      "Questions or need support? Reach out and the FlickVault team will get back to you quickly.",
    mailtoAddress: "chirag@bidx.ai",
    info: {
      address: { label: "Find us", value: "Remote - Global" },
      phone: { label: "Call us", value: "" },
      email: { label: "Email us", value: "chirag@bidx.ai" },
      hours: { label: "Support Hours", value: ["Monday - Friday", "9AM - 6PM UTC"] },
    },
    formSubjects: ["General Inquiry", "Account Help", "Partnership", "Feedback"],
    formSubmitLabel: "Send message",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Popular Questions",
    items: [
      { question: "Is FlickVault free to join?", answer: "Yes, signup is free! You only pay for the movies you rent or buy." },
      { question: "Can I stream on any device?", answer: "Absolutely. FlickVault works on mobile, tablet, desktop, and TV." },
      { question: "How long can I keep a rented movie?", answer: "Most rentals last 48 hours but you can buy movies to keep forever." },
      { question: "Is payment secure?", answer: "All transactions use industry-standard payment security (Stripe) and your data is encrypted." },
      { question: "Can I invite family to share?", answer: "Pro and Buy & Own plans support family sharing and watchlists." },
    ],
  },

  footer: {
    brandName: "FlickVault",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "chirag@bidx.ai", href: "mailto:chirag@bidx.ai" },
          { label: "Github", href: "#" },
        ],
      },
      {
        heading: "Movies",
        links: [
          { label: "Browse", href: "/dashboard/movies" },
          { label: "Pricing", href: "#pricing" },
          { label: "Support", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact Us", href: "#contact" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "GitHub", href: "https://github.com" },
        ],
      },
    ],
    copyright: "© 2026 FlickVault.",
    attribution: { label: "Built by Chirag Dodiya", href: "mailto:chirag@bidx.ai" },
  },

  navbar: {
    brandName: "FlickVault",
    routes: [
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Team" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "Features",
    featureImage: { src: "/demo-img.jpg", alt: "FlickVault preview" },
    features: [
      { title: "Browse Movies", description: "Rent or buy from thousands of titles, instantly." },
      { title: "Account Dashboard", description: "Track your rentals, purchases, and preferences." },
      { title: "HD Streaming", description: "Enjoy movies with best-in-class streaming quality." },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Sign up",
    dashboardLabel: "Dashboard",
    githubLink: { href: "#", ariaLabel: "View source on GitHub" },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}