import { useExecutionStore } from '@store/execution-store';
import { PanelContainer, PanelHeader, PanelTitle, PanelContent } from '@ui/layout/resizable-panel-layout';

export const WebApiPanel = () => {
  const webApis = useExecutionStore((state) => state.webApi);

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Web API</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ul className="flex flex-col gap-2">
          {webApis.map(({ id, label }) => (
            <li key={id} className="rounded border bg-white p-2 shadow text-sm font-mono">
              {label}
            </li>
          ))}
        </ul>
      </PanelContent>
    </PanelContainer>
  );
};
