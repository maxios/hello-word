import { Button } from "@/components/Button/Button";
import { Text, View } from "react-native";
import { CardCarousel } from "./variants/CardCarousel";
import { ImageCarousel } from "./variants/ImageCarousel";
import { ProductCarousel } from "./variants/ProductCarousel";
import { TestimonialCarousel } from "./variants/TestimonialCarousel";

const placeholderImage = require("../../assets/images/intro/1.png");
const placeholderImage2 = require("../../assets/images/intro/2.png");
const placeholderImage3 = require("../../assets/images/intro/3.png");

const sampleImages = [placeholderImage, placeholderImage2, placeholderImage3];

const sampleCards = [
  {
    title: "Getting Started",
    description:
      "Learn the basics of our platform and get up to speed quickly.",
    image: placeholderImage,
    actions: <Button variant="primary" size="small" label="Learn More" />,
  },
  {
    title: "Advanced Features",
    description: "Unlock powerful capabilities to enhance your workflow.",
    image: placeholderImage2,
    actions: <Button variant="outlined" size="small" label="Explore" />,
  },
  {
    title: "Community",
    description: "Join thousands of users and share your experiences.",
    image: placeholderImage3,
    actions: <Button variant="text" size="small" label="Join Now" />,
  },
];

const sampleTestimonials = [
  {
    quote:
      "The documentation is excellent. I had a feature shipped end-to-end in under a day.",
    author: "Sarah Johnson",
    role: "Frontend Engineer",
    company: "Acme Corp",
    rating: 5,
  },
  {
    quote:
      "The UI-as-API pattern made our codebase instantly more consistent across features.",
    author: "Michael Chen",
    role: "Tech Lead",
    rating: 5,
  },
  {
    quote:
      "Clean separation of concerns. Pure UI components, hooks, mappers — everything clicks.",
    author: "Emily Rodriguez",
    role: "UX Engineer",
    company: "Design Studio",
    rating: 4,
  },
];

const sampleProducts = [
  {
    name: "Standard Widget",
    price: 49.99,
    image: placeholderImage,
    description: "A generic widget demonstrating the product-card layout",
    badge: "NEW",
    discount: 20,
    onAddToCart: () => console.log("Added to cart: Standard Widget"),
  },
  {
    name: "Premium Gizmo",
    price: 39.99,
    image: placeholderImage2,
    description: "Another placeholder product for the carousel demo",
    badge: "POPULAR",
    onAddToCart: () => console.log("Added to cart: Premium Gizmo"),
  },
  {
    name: "Bundle Pack",
    price: 34.99,
    image: placeholderImage3,
    description: "Bundle placeholder with a discount badge",
    discount: 15,
    onAddToCart: () => console.log("Added to cart: Bundle Pack"),
  },
];

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [],
};

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: "",
};

export const components: PlaygroundComponent[] = [
  {
    id: "image-carousel",
    name: "Image Carousel",
    description: "A simple image carousel with captions and navigation",
    component: () => (
      <ImageCarousel
        images={sampleImages.map((img, idx) => ({
          source: img,
          caption: `Image ${idx + 1} caption`,
          alt: `Sample image ${idx + 1}`,
        }))}
        config={{
          autoplay: true,
          autoplayInterval: 3000,
          loop: true,
        }}
        onImagePress={(index) => console.log("Image pressed:", index)}
      />
    ),
    code: `<ImageCarousel
  images={[
    { source: image1, caption: "Caption 1" },
    { source: image2, caption: "Caption 2" },
    { source: image3, caption: "Caption 3" },
  ]}
  config={{
    autoplay: true,
    autoplayInterval: 3000,
    loop: true,
  }}
  onImagePress={(index) => console.log('Image pressed:', index)}
/>`,
    variations: [
      {
        name: "Without Controls",
        component: () => (
          <ImageCarousel
            images={sampleImages}
            config={{
              showControls: false,
              showIndicators: true,
              enableGestures: true,
            }}
          />
        ),
        code: `<ImageCarousel
  images={images}
  config={{
    showControls: false,
    showIndicators: true,
    enableGestures: true,
  }}
/>`,
      },
      {
        name: "Multiple Items Per View",
        component: () => (
          <ImageCarousel
            images={sampleImages}
            config={{
              itemsPerView: 1.5,
              spacing: 12,
              centerMode: true,
            }}
            height={200}
          />
        ),
        code: `<ImageCarousel
  images={images}
  config={{
    itemsPerView: 1.5,
    spacing: 12,
    centerMode: true,
  }}
  height={200}
/>`,
      },
    ],
  },
  {
    id: "card-carousel",
    name: "Card Carousel",
    description: "Content cards with images, text, and actions",
    component: () => (
      <CardCarousel
        cards={sampleCards}
        config={{
          spacing: 16,
          showIndicators: true,
        }}
        onCardPress={(card, index) => console.log("Card pressed:", card.title)}
      />
    ),
    code: `<CardCarousel
  cards={[
    {
      title: "Card Title",
      description: "Card description text",
      image: cardImage,
      actions: <Button label="Action" />,
    },
    // ... more cards
  ]}
  config={{ spacing: 16 }}
  onCardPress={(card) => console.log(card)}
/>`,
    variations: [
      {
        name: "Grid View",
        component: () => (
          <CardCarousel
            cards={sampleCards}
            config={{
              itemsPerView: 2,
              spacing: 8,
              showControls: false,
            }}
            height={250}
          />
        ),
        code: `<CardCarousel
  cards={cards}
  config={{
    itemsPerView: 2,
    spacing: 8,
    showControls: false,
  }}
  height={250}
/>`,
      },
    ],
  },
  {
    id: "testimonial-carousel",
    name: "Testimonial Carousel",
    description: "Customer testimonials with ratings and author info",
    component: () => (
      <TestimonialCarousel
        testimonials={sampleTestimonials}
        config={{
          autoplay: true,
          autoplayInterval: 5000,
          loop: true,
        }}
      />
    ),
    code: `<TestimonialCarousel
  testimonials={[
    {
      quote: "Customer testimonial text",
      author: "John Doe",
      role: "CEO",
      company: "Company Inc",
      rating: 5,
    },
    // ... more testimonials
  ]}
  config={{
    autoplay: true,
    autoplayInterval: 5000,
  }}
/>`,
  },
  {
    id: "product-carousel",
    name: "Product Carousel",
    description: "E-commerce product cards with pricing and actions",
    component: () => (
      <ProductCarousel
        products={sampleProducts}
        config={{
          itemsPerView: 1.2,
          centerMode: true,
          spacing: 16,
        }}
        onProductPress={(product) => console.log("Product:", product.name)}
      />
    ),
    code: `<ProductCarousel
  products={[
    {
      name: "Product Name",
      price: 49.99,
      image: productImage,
      description: "Product description",
      badge: "NEW",
      discount: 20,
      onAddToCart: () => addToCart(product),
    },
    // ... more products
  ]}
  config={{
    itemsPerView: 1.2,
    centerMode: true,
  }}
/>`,
    variations: [
      {
        name: "Without Discounts",
        component: () => (
          <ProductCarousel
            products={sampleProducts.map((p) => ({
              ...p,
              discount: undefined,
              badge: undefined,
            }))}
            config={{
              itemsPerView: 1,
              showIndicators: false,
            }}
            height={380}
          />
        ),
        code: `<ProductCarousel
  products={products}
  config={{
    itemsPerView: 1,
    showIndicators: false,
  }}
  height={380}
/>`,
      },
    ],
  },
  {
    id: "carousel-states",
    name: "Carousel States",
    description: "Loading, error, and empty states",
    component: () => (
      <View className="space-y-4">
        <Text className="font-bold text-high-emphasis">Loading State:</Text>
        <View className="bg-surface-8 h-[200px] items-center justify-center rounded-xl">
          <Text className="text-medium-emphasis">Loading carousel...</Text>
        </View>

        <Text className="mt-4 font-bold text-high-emphasis">Empty State:</Text>
        <View className="bg-surface-8 h-[200px] items-center justify-center rounded-xl">
          <Text className="text-medium-emphasis">No items to display</Text>
        </View>
      </View>
    ),
    code: `// The carousel handles these states automatically
// when using fetchData or when items array is empty`,
  },
];

export const meta = {
  id: "carousel",
  name: "Carousel",
  icon: "🔄",
  description: "Interactive carousel components with various styles and states",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
