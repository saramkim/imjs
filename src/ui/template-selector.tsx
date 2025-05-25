import { CODE_TEMPLATES, type CodeTemplateKey } from '@utils/code-templates';
import { useCodeStore } from '@store/code-store';

export const TemplateSelector = () => {
  const current = useCodeStore((s) => s.currentTemplate);
  const setTemplate = useCodeStore((s) => s.setTemplate);

  return (
    <select
      value={current}
      onChange={(e) => setTemplate(e.target.value as CodeTemplateKey)}
      className="border p-2 border-gray-300 rounded outline-none"
    >
      {Object.entries(CODE_TEMPLATES).map(([key, { label }]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
};
