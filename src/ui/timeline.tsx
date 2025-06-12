import { useTimelineStore } from '@store/timeline-store';

export const Timeline = () => {
  const totalSteps = useTimelineStore((state) => state.totalSteps);
  const currentStepIndex = useTimelineStore((state) => state.currentStepIndex);

  if (totalSteps === 0) return null;

  const progress = (currentStepIndex / totalSteps) * 100;

  return (
    <div className="flex items-center gap-4 px-4">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-[300px]">
        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-sm text-gray-600">
        {currentStepIndex} / {totalSteps}
      </div>
    </div>
  );
};
