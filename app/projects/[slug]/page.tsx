import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ImageGallery from '@/components/ImageGallery';
import { getProjectBySlug, urlFor } from '@/sanity/lib/sanity.client';
import type { Metadata } from 'next';

// TypeScript interface
interface Tool {
  name: string;
  icon?: any;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  description: string;
  mainImage: any;
  gallery?: any[];
  category: string;
  completedDate: string;
  tools?: (Tool | string)[]; // Support both old string format and new object format
  websiteUrl?: string;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - ${project.client} | Flex Agency Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project: Project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    const today = new Date();
    
    // If date is in the future, show as ongoing
    if (date > today) return 'Ongoing';
    
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Process gallery images to generate URLs in server component
  const galleryImages = project.gallery?.map((image) => ({
    url: urlFor(image).width(800).height(600).fit('crop').url(),
    fullUrl: urlFor(image).width(1920).url(),
  })) || [];

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <svg
                className="w-4 h-4 mx-2"
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
              <Link
                href="/projects"
                className="hover:text-blue-600 transition-colors"
              >
                Projects
              </Link>
              <svg
                className="w-4 h-4 mx-2"
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
              <span className="text-gray-900 font-medium">{project.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <section className="relative h-96 md:h-[500px] bg-gray-900 overflow-hidden">
          {project.mainImage ? (
            <>
              <Image
                src={urlFor(project.mainImage).width(1920).url()}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
              <span className="text-white text-9xl font-bold opacity-20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Project Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                  {project.category
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-200 animate-fade-in-up delay-200">
                  Client: {project.client}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Left Column - Info Cards (1/3 width) */}
                <div className="space-y-6">
                  {/* Client Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 h-32 flex items-center">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">
                          Client
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          {project.client}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 h-32 flex items-center">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">
                          Category
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          {project.category
                            .split('-')
                            .map(
                              (word) => word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Completed Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 h-32 flex items-center">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">
                          Completed
                        </h3>
                        <p className="text-lg font-bold text-gray-900">
                          {formatDate(project.completedDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tools Used */}
                  {project.tools && project.tools.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600">Tools & Technologies</h3>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {project.tools.map((tool: any, index: number) => {
                          // Skip if tool is null or undefined
                          if (!tool) return null;
                          
                          // Handle both old string format and new object format
                          const toolName = typeof tool === 'string' ? tool : (tool?.name || 'Unknown Tool');
                          const toolIcon = typeof tool === 'object' && tool?.icon ? tool.icon : null;
                          
                          return (
                            <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-full shadow-sm hover:shadow-md transition-shadow">
                              {toolIcon && (
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                  <img
                                    src={urlFor(toolIcon).width(24).height(24).url()}
                                    alt={toolName}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                              )}
                              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                {toolName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Project Overview Only (2/3 width) */}
                <div className="lg:col-span-2">
                  {/* Project Description */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-4"></div>
                      <h2 className="text-4xl font-bold text-gray-900">
                        Project Overview
                      </h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed pl-8">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Website Link */}
              {project.websiteUrl && (
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 mb-12 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Visit Live Website
                  </h2>
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Website
                  </a>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full mr-4"></div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Project Gallery
                    </h2>
                  </div>
                  <ImageGallery 
                    images={galleryImages}
                    projectTitle={project.title}
                  />
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Like What You See?
                </h3>
                <p className="text-blue-100 mb-8 text-lg">
                  Let's create something amazing for your business too.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 shadow-xl"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* View All Projects */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              View All Projects
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
