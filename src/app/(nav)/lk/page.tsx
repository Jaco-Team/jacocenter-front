import { ProfileForm } from '@/features/profile/ui/profile-form/ProfileForm';
import { OperatorMetrics } from '@/features/profile/ui/operator-metrics/OperatorMetrics';

export default function PersonalAccountPage() {
  return (
    <div className="flex h-full flex-col items-center gap-5 overflow-auto py-5">
      <ProfileForm />
      <OperatorMetrics />
    </div>
  );
}
