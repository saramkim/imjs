import Editor from '@monaco-editor/react';
import { PanelContainer, PanelHeader, PanelTitle, PanelContent } from '@ui/layout/resizable-panel-layout';

export const EditorPanel = () => {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Code Editor</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <Editor
          defaultLanguage="javascript"
          options={{
            readOnly: true,
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </PanelContent>
    </PanelContainer>
  );
};
