import Editor from '@monaco-editor/react';
import { useCodeStore } from '@store/code-store';
import { PanelContainer, PanelHeader, PanelTitle, PanelContent } from '@ui/layout/resizable-panel-layout';
import { TemplateSelector } from '@ui/template-selector';

export const EditorPanel = () => {
  const code = useCodeStore((state) => state.code);
  const setCode = useCodeStore((state) => state.setCode);

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Code Editor</PanelTitle>
        <TemplateSelector />
      </PanelHeader>
      <PanelContent>
        <Editor
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
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
