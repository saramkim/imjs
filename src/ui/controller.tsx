import { useConfigStore } from '@store/config-store';
import { executionEngine } from '@core/execution-engine';

export const Controller = () => {
  const isPlaying = useConfigStore((state) => state.isPlaying);
  const setIsPlaying = useConfigStore((state) => state.setIsPlaying);

  const handlePlay = () => {
    executionEngine.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    executionEngine.pause();
    setIsPlaying(false);
  };

  const handleStep = () => {
    executionEngine.step();
  };

  return (
    <div className="flex items-center gap-4 p-4">
      {isPlaying ? (
        <button onClick={handlePause} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Pause
        </button>
      ) : (
        <button onClick={handlePlay} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Play
        </button>
      )}

      <button onClick={handleStep} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Step
      </button>

      <SpeedSlider />
    </div>
  );
};

function SpeedSlider() {
  const speed = useConfigStore((state) => state.speed);
  const setSpeed = useConfigStore((state) => state.setSpeed);

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
        onChange={(e) => {
          const newSpeed = Number(e.target.value);
          setSpeed(newSpeed);
          executionEngine.setSpeed(newSpeed);
        }}
        className="w-40"
      />
      <span className="text-sm text-gray-600">{speed}ms</span>
    </div>
  );
}
