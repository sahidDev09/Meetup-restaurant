import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Spacer for other sections */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Add more sections here */}
        </div>
      </section>
    </main>
  );
}
