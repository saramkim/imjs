import * as ResizablePrimitive from 'react-resizable-panels';

import classNames from 'classnames';

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={classNames('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) => (
  <ResizablePrimitive.PanelResizeHandle
    className={classNames(
      'relative flex w-px items-center justify-center bg-gray-300 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className
    )}
    {...props}
  ></ResizablePrimitive.PanelResizeHandle>
);

const PanelContainer = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={classNames('flex flex-col h-full', className)} {...props} />
);

const PanelHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={classNames('flex items-center justify-between p-2 border-b border-gray-300', className)} {...props} />
);

const PanelTitle = ({ className, ...props }: React.ComponentProps<'h3'>) => (
  <h3 className={classNames('font-bold', className)} {...props} />
);

const PanelContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={classNames('p-2 flex-1 overflow-auto', className)} {...props} />
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle, PanelContainer, PanelHeader, PanelTitle, PanelContent };
