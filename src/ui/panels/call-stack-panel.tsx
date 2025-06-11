import { useExecutionStore } from '@store/execution-store';
import { PanelContainer, PanelHeader, PanelTitle, PanelContent } from '@ui/layout/resizable-panel-layout';

export const CallStackPanel = () => {
  const callStack = useExecutionStore((state) => state.callStack);

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Call Stack</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ul className="flex flex-col-reverse gap-2 h-full overflow-y-auto">
          {callStack.map((frame, index) => (
            <li key={index} className="rounded border bg-white p-2 shadow text-sm font-mono">
              {frame.name}
            </li>
          ))}
        </ul>
      </PanelContent>
    </PanelContainer>
  );
};
