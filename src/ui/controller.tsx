import { useConfigStore } from '@store/config-store';
import { TemplateSelector } from './template-selector';
import { useCodeStore } from '@store/code-store';
import { useExecutionActions } from '@hooks/use-execution-actions';
import { useTimelineStore } from '@store/timeline-store';
import classNames from 'classnames';

export const Controller = () => {
  const isLoaded = useConfigStore((state) => state.isLoaded);

  return isLoaded ? <Controls /> : <SelectCode />;
};

const SelectCode = () => {
  const code = useCodeStore((state) => state.code);
  const setIsLoaded = useConfigStore((state) => state.setIsLoaded);
  const { load } = useExecutionActions();

  return (
    <div className="flex items-center gap-4 p-4">
      <TemplateSelector />
      <button
        onClick={() => {
          load(code);
          setIsLoaded(true);
        }}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Run Code
      </button>
    </div>
  );
};

const Controls = () => {
  const isPlaying = useConfigStore((state) => state.isPlaying);
  const isCompleted = useTimelineStore((state) => state.isCompleted);
  const setIsLoaded = useConfigStore((state) => state.setIsLoaded);
  const { reset, play, pause, step } = useExecutionActions();

  return (
    <div className="flex items-center gap-4 p-4">
      <button
        onClick={() => {
          reset();
          setIsLoaded(false);
        }}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        X
      </button>

      {isPlaying ? (
        <button onClick={pause} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Pause
        </button>
      ) : (
        <button
          onClick={isCompleted ? reset : play}
          className={classNames(
            'px-4 py-2 text-white rounded',
            isCompleted ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-500 hover:bg-green-600'
          )}
        >
          {isCompleted ? 'Restart' : 'Play'}
        </button>
      )}

      {!isCompleted && (
        <>
          <button onClick={step} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Step
          </button>
          <SpeedSlider />
        </>
      )}
    </div>
  );
};

const SpeedSlider = () => {
  const speed = useConfigStore((state) => state.speed);
  const { setSpeed } = useExecutionActions();

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
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-40"
      />
      <span className="text-sm text-gray-600">{speed}ms</span>
    </div>
  );
};
