import EditExperienceClient from '@/components/dashboard/edit-experience-client';

export default function EditExperiencePage({ params }: { params: { id: string } }) {
  return <EditExperienceClient experienceId={params.id} />;
}
