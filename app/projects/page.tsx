import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { getProjects, urlFor } from '@/sanity/lib/sanity.client';
import ProjectsContent from './ProjectsContent';

// Revalidate every 60 seconds
export const revalidate = 60;

// TypeScript interface
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  description: string;
  mainImage: any;
  category: string;
  completedDate: string;
  featured: boolean;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  // Process images server-side
  const processedProjects = projects.map((project: Project) => ({
    ...project,
    mainImage: project.mainImage
      ? {
          url: urlFor(project.mainImage).width(800).height(600).url(),
          alt: project.mainImage.alt || project.title,
        }
      : null,
  }));

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ProjectsContent initialProjects={processedProjects} />
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
