import { GuestCommunications } from '@/components/guest-communications/GuestCommunications';

export default function CommunicationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Guest Communications</h1>
          <p className="text-gray-500">Manage and automate guest communications across multiple platforms.</p>
        </div>

        <GuestCommunications />
      </div>
    </div>
  );
} 