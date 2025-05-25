import { create } from 'zustand';
import { CODE_TEMPLATES, type CodeTemplateKey } from '@utils/code-templates';

interface CodeState {
  code: string;
  currentTemplate: CodeTemplateKey;
  setCode: (code: string) => void;
  setTemplate: (key: CodeTemplateKey) => void;
}

export const useCodeStore = create<CodeState>((set) => ({
  code: CODE_TEMPLATES.consoleLog.code,
  currentTemplate: 'consoleLog',
  setCode: (code) => set({ code }),
  setTemplate: (key) =>
    set({
      currentTemplate: key,
      code: CODE_TEMPLATES[key].code,
    }),
}));
