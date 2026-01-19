import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollAnimation from '@/components/ScrollAnimation';
import {
  getFeaturedProjects,
  getServices,
  urlFor,
} from '@/sanity/lib/sanity.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flex Agency - Elevate Your Digital Presence',
  description:
    'Full-service digital marketing agency specializing in social media marketing, SEO, content marketing, PPC advertising, branding, and web design. Transform your business today.',
  keywords:
    'digital marketing, social media marketing, SEO, content marketing, PPC, branding, web design, Colombo, Sri Lanka',
};

// TypeScript interfaces
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  description: string;
  mainImage: any;
  category: string;
}

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  icon: any;
}

export default async function HomePage() {
  // Fetch data
  const [featuredProjects, services] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
  ]);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Trusted by 100+ businesses across Sri Lanka
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                Elevate Your
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Digital Presence
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl sm:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200">
                We help businesses grow through strategic digital marketing
                solutions that deliver measurable results and lasting impact.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                >
                  Get Started Today
                </Link>
                <Link
                  href="/projects"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transform transition-all duration-200 hover:scale-105"
                >
                  View Our Work
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20 animate-fade-in-up delay-600">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">100+</div>
                  <div className="text-blue-200 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">250+</div>
                  <div className="text-blue-200 text-sm">Projects Done</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">5+</div>
                  <div className="text-blue-200 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <ScrollAnimation animation="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Featured Projects
                </h2>
                <p className="text-xl text-gray-600">
                  Discover how we've helped businesses achieve their digital
                  marketing goals
                </p>
              </div>
            </ScrollAnimation>

            {/* Projects Grid */}
            {featuredProjects && featuredProjects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {featuredProjects.map((project: Project, index: number) => (
                    <ScrollAnimation
                      key={project._id}
                      animation="fade-up"
                      delay={index * 100}
                    >
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="group"
                      >
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        {/* Project Image */}
                        <div className="relative h-64 bg-gray-200 overflow-hidden">
                          {project.mainImage ? (
                            <Image
                              src={urlFor(project.mainImage).width(800).url()}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                              <span className="text-white text-6xl font-bold opacity-20">
                                {project.title.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full backdrop-blur-sm bg-opacity-90">
                              {project.category
                                .split('-')
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')}
                            </span>
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Client: {project.client}
                          </p>
                          <p className="text-gray-600 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="mt-4 flex items-center text-blue-600 font-medium">
                            View Case Study
                            <svg
                              className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      </Link>
                    </ScrollAnimation>
                  ))}
                </div>

                {/* View All Button */}
                <ScrollAnimation animation="fade-up" delay={200}>
                  <div className="text-center">
                    <Link
                      href="/projects"
                      className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                    View All Projects
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </ScrollAnimation>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No featured projects yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <ScrollAnimation animation="fade-up">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-4">
                  What We Offer
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Our Services
                </h2>
                <p className="text-xl text-gray-600">
                  Comprehensive digital marketing solutions tailored to drive your
                  business forward
                </p>
              </div>
            </ScrollAnimation>

            {/* Services Grid */}
            {services && services.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {services.slice(0, 6).map((service: Service, index: number) => (
                    <ScrollAnimation
                      key={service._id}
                      animation="fade-up"
                      delay={index * 100}
                    >
                      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      {/* Service Image */}
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {service.icon ? (
                          <Image
                            src={urlFor(service.icon).width(600).height(400).url()}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                            <span className="text-blue-600 text-6xl font-bold">
                              {service.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Service Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {service.shortDescription}
                        </p>

                        {/* Learn More Link */}
                        <Link
                          href={`/services/${service.slug.current}`}
                          className="inline-flex items-center text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                        >
                          Learn More
                          <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>

                {/* View All Services Button */}
                <ScrollAnimation animation="fade-up" delay={200}>
                  <div className="text-center">
                    <Link
                      href="/services"
                      className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                    >
                      View All Services
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </ScrollAnimation>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  Services information coming soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation animation="zoom-in">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                  Let's create a customized digital marketing strategy that
                  delivers real results for your business. Get started today with
                  a free consultation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 shadow-xl"
                  >
                    Get Free Consultation
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transform transition-all duration-200 hover:scale-105"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
