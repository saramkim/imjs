import { useExecutionStore } from '@store/execution-store';
import { PanelContainer, PanelHeader, PanelTitle, PanelContent } from '@ui/layout/resizable-panel-layout';
import classNames from 'classnames';

export const ConsolePanel = () => {
  const logs = useExecutionStore((state) => state.consoleOutput);

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Console</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ul className="flex flex-col gap-1 text-sm font-mono whitespace-pre-wrap">
          {logs.map((line, i) => (
            <li key={i} className={classNames(i !== logs.length - 1 && 'border-b border-gray-200')}>
              {line}
            </li>
          ))}
        </ul>
      </PanelContent>
    </PanelContainer>
  );
};
