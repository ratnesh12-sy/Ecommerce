import StructuredData, { emartOrganizationSchema, emartWebsiteSchema } from "@/components/seo/StructuredData";

// Future sections will be added here following the same pattern
// const HomeFeaturedProducts = dynamic(() => import("@/components/sections/HomeFeaturedProducts"), { ... });

export default function Home() {
  return (
    <div className="bg-white">
      {/* SEO Schemas */}
      <StructuredData data={emartOrganizationSchema} />
      <StructuredData data={emartWebsiteSchema} />

      <main>
        {/* Modular Sections */}

        {/* Placeholder for future sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl italic mb-4">
            e-mart
          </h1>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Premium Ecommerce Experience</p>
        </div>
      </main>
    </div>
  );
}
