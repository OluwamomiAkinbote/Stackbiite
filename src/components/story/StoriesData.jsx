// Default "Back to Home" media appended to each story
const backHomeMedia = {
  id: "M_BACK_HOME",
  type: "image",
  url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop", // optimized OG size
  duration: 4000,
  title: "Back to Home",
  description: "Explore more stories and projects on our homepage.",
  link: "/",
  linkText: "← Back to Home",
  isBackHome: true,
};

export const storiesData = [
  {
    id: "S1_B1c9k2L8eQ3x",
    title: "Project Launch",
    avatar: "https://images.unsplash.com/photo-1612831455540-6f63b0c162d8?w=100&h=100&fit=crop", // updated avatar
    seoImage: "https://images.unsplash.com/photo-1581093588401-22f1f58b4e3e?w=1200&h=630&fit=crop",
    media: [
      {
        id: "M1_B4f9L0K2vZx",
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        duration: 5000,
        title: "E-commerce Platform Launch",
        description: "Successfully launched a custom e-commerce solution for a retail client.",
        link: "/portfolio/ecommerce-project",
        linkText: "View Case Study",
      },
      {
        id: "M2_C3g8L1K9rVz",
        type: "image",
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        duration: 7000,
        title: "Client Testimonial",
        description: "Hear what our client says about the collaboration process.",
      },
    ],
  },
  {
    id: "S2_C2d8j3Q7vR5y",
    title: "Design Process",
    avatar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop",
    seoImage: "https://images.unsplash.com/photo-1559027615-5d655c27c250?w=1200&h=630&fit=crop",
    media: [
      {
        id: "M3_D5kJ4kL8R1p",
        type: "image",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        duration: 5000,
        title: "UI/UX Workshop",
        description: "Collaborative design session with our team and stakeholders.",
        link: "/services/ui-ux-design",
        linkText: "Our Design Process",
      },
    ],
  },
  {
    id: "S3_D3f9k4Q8vR6y",
    title: "Tech Innovation",
    avatar: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop",
    seoImage: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=1200&h=630&fit=crop",
    media: [
      {
        id: "M5_F2kL1P9vX7q",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: 8000,
        title: "Next.js 14 Features",
        description: "Exploring new capabilities in the latest Next.js release.",
        link: "/blog/nextjs-14-features",
        linkText: "Read Article",
      },
    ],
  },
  {
    id: "S4_E4g0l5R9vW2y",
    title: "Team Culture",
    avatar: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=100&h=100&fit=crop",
    seoImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop",
    media: [
      {
        id: "M6_G3jK8L2R6p",
        type: "image",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        duration: 5000,
        title: "Team Building",
        description: "Our quarterly team retreat and brainstorming session.",
      },
    ],
  },
  {
    id: "S5_F5h1m6S3vX9z",
    title: "Success Stories",
    avatar: "https://images.unsplash.com/photo-1503342452485-86f1f0b8f8a2?w=100&h=100&fit=crop",
    seoImage: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1200&h=630&fit=crop",
    media: [
      {
        id: "M7_H4kL2R7vQ1s",
        type: "image",
        url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        duration: 5000,
        title: "Client Growth",
        description: "How we helped our clients achieve 300% revenue growth.",
        link: "/case-studies",
        linkText: "View All Cases",
      },
    ],
  },
];

// Append "Back Home" media to each story
export const storiesWithPreview = storiesData.map((story) => {
  const fullMedia = [...story.media, { ...backHomeMedia }];
  return {
    ...story,
    media: fullMedia,
    previewImage: fullMedia.length > 0 ? fullMedia[0].url : null,
  };
});
