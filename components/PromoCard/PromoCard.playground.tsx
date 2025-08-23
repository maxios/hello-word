import { promoCards } from "@/pages/MovePage/consts";
import { PromoCard } from ".";

export const components: PlaygroundComponent[] = [
  {
    id: "promo-card-guides",
    name: "Guides Promo Card",
    description: "Promo card for multi-week programs",
    component: () => (
      <PromoCard
        cardTagText="Moving soon!"
        heading={promoCards[0].heading}
        subtext={promoCards[0].subtext}
        image={promoCards[0].image}
        isCardHighlighted
      />
    ),
    code: `<PromoCard
  heading="Guides"
  subtext="Take on a multi-week program"
  image={promoCardGuidesImage}
  isCardHighlighted
/>`,
    variations: [
      {
        name: "Workouts Card",
        component: () => (
          <PromoCard
            heading={promoCards[1].heading}
            subtext={promoCards[1].subtext}
            image={promoCards[1].image}
          />
        ),
        code: `<PromoCard
  heading="Workouts"
  subtext="Add extra sessions to your personal plan"
  image={promoCardWorkoutsImage}
/>`,
      },
      {
        name: "Finishers Card (Highlighted)",
        component: () => (
          <PromoCard
            heading={promoCards[2].heading}
            subtext={promoCards[2].subtext}
            image={promoCards[2].image}
            isCardHighlighted
          />
        ),
        code: `<PromoCard
        heading="Finishers"
        subtext="Add a finisher to take your workout to the next level"
        image={FinisherCardImage}
        isCardHighlighted
      />`,
      },
      {
        name: "Video Classes Card",
        component: () => (
          <PromoCard
            heading={promoCards[3].heading}
            subtext={promoCards[3].subtext}
            image={promoCards[3].image}
          />
        ),
        code: `<PromoCard
        heading="Video Classes"
        subtext="Schedule a HIIT, Yoga or Barre series with our superstar coaches"
        image={promoCardVideoClassesImage}
      />`,
      },
      {
        name: "Exercises Card with Tag",
        component: () => (
          <PromoCard
            heading={promoCards[4].heading}
            subtext={promoCards[4].subtext}
            image={promoCards[4].image}
            cardTagText="New"
          />
        ),
        code: `<PromoCard
        heading="Exercises"
        subtext="Browse all individual exercises, with guidance on how to best perform them"
        image={promoCardExercisesImage}
        cardTagText="New"
      />`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `Use PromoCards to highlight key features, programs, or content areas. 
Each card should have a clear heading, concise subtext, and a relevant image. 
Use the \`isCardHighlighted\` prop to emphasize important cards. 
The \`cardTagText\` prop can be used to display a badge or tag (e.g., "New").`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use high-quality images relevant to the card's content",
    "Keep headings short and impactful",
    "Use subtext to provide additional context",
    "Highlight only the most important cards",
    "Use tags sparingly for new or featured content",
    "Ensure cards are tappable and lead to relevant destinations",
    "Test card appearance in both light and dark mode",
  ],
};

export const meta = {
  id: "promo-card",
  name: "Promo Card",
  icon: "🏠",
  description: "Promo card for multi-week programs",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
