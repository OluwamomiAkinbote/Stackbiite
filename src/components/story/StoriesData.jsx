// /data/storiesData.js

export const storiesData = [
  {
    id: "S1_B1c9k2L8eQ3x",
    title: "Project Launch",
    avatar: "/icons/rocket.svg",
    media: [
      {
        id: "M1_B4f9L0K2vZx",
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=700&fit=crop",
        duration: 5000,
        title: "E-commerce Platform Launch",
        description: "Successfully launched a custom e-commerce solution for a retail client.",
        link: "/portfolio/ecommerce-project",
        linkText: "View Case Study"
      },
      {
        id: "M2_C3g8L1K9rVz",
        type: "image",
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=700&fit=crop",
        duration: 7000,
        title: "Client Testimonial",
        description: "Hear what our client says about the collaboration process."
      }
    ]
  },
  {
    id: "S2_C2d8j3Q7vR5y",
    title: "Design Process",
    avatar: "/icons/design.svg",
    media: [
      {
        id: "M3_D5kJ4kL8R1p",
        type: "image",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=700&fit=crop",
        duration: 5000,
        title: "UI/UX Workshop",
        description: "Collaborative design session with our team and stakeholders.",
        link: "/services/ui-ux-design",
        linkText: "Our Design Process"
      },
      {
        id: "M4_E7hK9L3R4xP",
        type: "image",
        url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=700&fit=crop",
        duration: 5000,
        title: "Prototype Development",
        description: "Transforming wireframes into interactive prototypes."
      }
    ]
  },
  {
    id: "S3_D3f9k4Q8vR6y",
    title: "Tech Innovation",
    avatar: "/icons/tech.svg",
    media: [
      {
        id: "M5_F2kL1P9vX7q",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        duration: 8000,
        title: "Next.js 14 Features",
        description: "Exploring new capabilities in the latest Next.js release.",
        link: "/blog/nextjs-14-features",
        linkText: "Read Article"
      }
    ]
  },
  {
    id: "S4_E4g0l5R9vW2y",
    title: "Team Culture",
    avatar: "/icons/team.svg",
    media: [
      {
        id: "M6_G3jK8L2R6p",
        type: "image",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=700&fit=crop",
        duration: 5000,
        title: "Team Building",
        description: "Our quarterly team retreat and brainstorming session."
      }
    ]
  },
  {
    id: "S5_F5h1m6S3vX9z",
    title: "Success Stories",
    avatar: "/icons/star.svg",
    media: [
      {
        id: "M7_H4kL2R7vQ1s",
        type: "image",
        url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=700&fit=crop",
        duration: 5000,
        title: "Client Growth",
        description: "How we helped our clients achieve 300% revenue growth.",
        link: "/case-studies",
        linkText: "View All Cases"
      }
    ]
  },
  {
    id: "S6_G6i2n7T4vY0a",
    title: "Behind Scenes",
    avatar: "/icons/camera.svg",
    media: [
      {
        id: "M8_I5lK3R8vX2q",
        type: "image",
        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=700&fit=crop",
        duration: 5000,
        title: "Office Life",
        description: "A day in the life at our creative studio."
      }
    ]
  }
];

// Optional utility to attach preview image dynamically
export const storiesWithPreview = storiesData.map(story => ({
  ...story,
  previewImage: story.media.length > 0 ? story.media[0].url : null
}));
