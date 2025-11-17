"use client";
import Link from "next/link";
export default function AboutPage() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold mb-4 tracking-tight">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to our website! We are dedicated to providing high-quality
          products and exceptional service. Our mission is to innovate, inspire,
          and deliver value to our customers every day.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Our team is made up of passionate individuals who believe in pushing
          boundaries and creating meaningful solutions. We are constantly
          learning, growing, and adapting to meet the needs of our community.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Thank you for visiting, and we look forward to being part of your
          journey.
        </p>
      </div>

      <div title="Our Story">
        What started as a small idea has grown into a thriving initiative
        powered by passion and dedication. Over the years, we have expanded our
        vision, embraced challenges, and continued to evolve with the industry.
      </div>

      <div title="Our Values">
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
          <li>Innovation — continuously creating and improving solutions.</li>
          <li>Integrity — building trust through honesty and transparency.</li>
          <li>
            Community — supporting people and fostering meaningful connections.
          </li>
          <li>
            Excellence — striving for the highest quality in everything we do.
          </li>
        </ul>
      </div>

      <div title="Meet the Team">
        Our team is a diverse group of creators, thinkers, and problem-solvers.
        Each member brings unique skills and perspectives that drive our mission
        forward.
      </div>

      <div title="Our Vision">
        We aim to shape a future where technology and creativity work
        hand-in-hand to make life better for everyone. We are committed to
        building tools and experiences that empower individuals and businesses
        alike.
      </div>

      <div title="Why Choose Us">
        We combine experience, creativity, and technology to deliver solutions
        that truly make an impact. Our customer-first mindset ensures that every
        decision we make is rooted in providing real value.
      </div>

      <div title="Our Commitment">
        We are committed to sustainability, innovation, and long‑term growth.
        Our goal is to contribute positively to both our community and industry.
      </div>

      <div>
        <div className="rounded-2xl shadow-lg bg-gray-50">
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-3">Get in Touch</h3>
            <p className="text-lg text-gray-700 mb-4">
              Have questions or want to collaborate? We're always happy to
              connect.
            </p>
            <Link href="/contact">
              <button className="rounded-xl px-6 py-2 shadow bg-black text-white">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
