import { CallStackPanel } from '@ui/panels/call-stack-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable-panel-layout';
import { WebApiPanel } from '@ui/panels/web-api-panel';
import { TaskQueuePanel } from '@ui/panels/task-queue-panel';

export function AppLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-between items-center border-b-4 border-gray-300 p-2 bg-gray-50">
        <div>[Controls]</div>
        <div>[Timeline]</div>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <div className="h-full p-2">[Editor]</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>
              <div className="h-full p-2">[Console]</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                  <CallStackPanel />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <WebApiPanel />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={30}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={20}>
                  <div className="h-full p-2">[Event Loop]</div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={80}>
                  <TaskQueuePanel />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
