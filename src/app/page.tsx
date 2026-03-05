"use client";

import React from "react";
import StructuredData, {
  emartOrganizationSchema,
  emartWebsiteSchema,
} from "@/components/seo/StructuredData";
import HeroSection from "@/components/sections/home/HeroSection";
import FeaturesStrip from "@/components/sections/home/FeaturesStrip";
import CategoriesGrid from "@/components/sections/home/CategoriesGrid";
import ShopByCategory from "@/components/sections/home/ShopByCategory";
import LatestArrivals from "@/components/sections/home/LatestArrivals";
import PromoBanner from "@/components/sections/home/PromoBanner";
import Newsletter from "@/components/sections/home/Newsletter";

export default function HomePage() {
  return (
    <div className="bg-white overflow-hidden">
      <StructuredData data={emartOrganizationSchema} />
      <StructuredData data={emartWebsiteSchema} />

      <HeroSection />
      <FeaturesStrip />
      <CategoriesGrid />
      <LatestArrivals />
      <ShopByCategory />
      <PromoBanner />
      <Newsletter />
    </div>
  );
}
