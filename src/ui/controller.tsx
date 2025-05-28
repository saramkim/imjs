import { useConfigStore } from '@store/config-store';
import { executionEngine } from '@core/execution-engine';
import { TemplateSelector } from './template-selector';
import { useCodeStore } from '@store/code-store';

export const Controller = () => {
  const isLoaded = useConfigStore((state) => state.isLoaded);

  return isLoaded ? <Controls /> : <SelectCode />;
};

const SelectCode = () => {
  const code = useCodeStore((state) => state.code);
  const setIsLoaded = useConfigStore((state) => state.setIsLoaded);

  const handleRun = () => {
    executionEngine.load(code);
    setIsLoaded(true);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <TemplateSelector />
      <button onClick={handleRun} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Run Code
      </button>
    </div>
  );
};

const Controls = () => {
  const isPlaying = useConfigStore((state) => state.isPlaying);
  const setIsLoaded = useConfigStore((state) => state.setIsLoaded);

  return (
    <div className="flex items-center gap-4 p-4">
      <button
        onClick={() => {
          executionEngine.reset();
          setIsLoaded(false);
        }}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        X
      </button>

      {isPlaying ? (
        <button
          onClick={() => executionEngine.pause()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={() => executionEngine.play()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Play
        </button>
      )}

      <button
        onClick={() => executionEngine.step()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Step
      </button>
      <SpeedSlider />
    </div>
  );
};

const SpeedSlider = () => {
  const speed = useConfigStore((state) => state.speed);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="speed" className="text-sm text-gray-700">
        Speed:
      </label>
      <input
        id="speed"
        type="range"
        min="100"
        max="2000"
        step="100"
        value={speed}
        onChange={(e) => executionEngine.setSpeed(Number(e.target.value))}
        className="w-40"
      />
      <span className="text-sm text-gray-600">{speed}ms</span>
    </div>
  );
};
