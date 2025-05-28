import { useTimelineStore } from '@store/timeline-store';

export const Timeline = () => {
  const commands = useTimelineStore((state) => state.commands);
  const currentIndex = useTimelineStore((state) => state.currentIndex);

  if (commands.length === 0) return null;

  const progress = (currentIndex / commands.length) * 100;

  return (
    <div className="flex items-center gap-4 px-4">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-[300px]">
        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-sm text-gray-600">
        {currentIndex} / {commands.length}
      </div>
    </div>
  );
};
