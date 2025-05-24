import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

export function AppLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-between items-center border-b-4 border-gray-300 p-2 bg-gray-50">
        <div>[Controls]</div>
        <div>[Timeline]</div>
      </div>

      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={40}>
          <PanelGroup direction="vertical" className="h-full">
            <Panel defaultSize={60}>
              <div className="h-full p-2">[Editor]</div>
            </Panel>
            <PanelResizeHandle className="h-1 bg-gray-300" />
            <Panel defaultSize={40}>
              <div className="h-full p-2">[Console]</div>
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="w-1 bg-gray-300" />

        <Panel defaultSize={60}>
          <PanelGroup direction="vertical" className="h-full">
            <Panel defaultSize={70}>
              <PanelGroup direction="horizontal" className="h-full">
                <Panel defaultSize={50}>
                  <div className="h-full p-2">[Call Stack]</div>
                </Panel>
                <PanelResizeHandle className="w-1 bg-gray-300" />
                <Panel defaultSize={50}>
                  <div className="h-full p-2">[Web API]</div>
                </Panel>
              </PanelGroup>
            </Panel>

            <PanelResizeHandle className="h-1 bg-gray-300" />

            <Panel defaultSize={30}>
              <PanelGroup direction="horizontal" className="h-full">
                <Panel defaultSize={20}>
                  <div className="h-full p-2">[Event Loop]</div>
                </Panel>
                <PanelResizeHandle className="w-1 bg-gray-300" />
                <Panel defaultSize={80}>
                  <div className="h-full p-2">[Task Queue]</div>
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
