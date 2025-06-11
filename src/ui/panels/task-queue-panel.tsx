import { useExecutionStore } from '@store/execution-store';
import { PanelContainer, PanelHeader, PanelTitle, PanelContent } from '@ui/layout/resizable-panel-layout';

export const TaskQueuePanel = () => {
  const taskQueue = useExecutionStore((state) => state.taskQueue);

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Task Queue</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ul className="flex gap-2 flex-wrap">
          {taskQueue.map((task, i) => (
            <li key={i} className="rounded border bg-white p-2 text-sm font-mono shadow">
              {task
                .map((cmd) => cmd.label)
                .filter((label) => label)
                .join('\n')}
            </li>
          ))}
        </ul>
      </PanelContent>
    </PanelContainer>
  );
};
