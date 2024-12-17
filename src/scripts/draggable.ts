const makeWindowDraggable = () => {
  let activeWindow: HTMLElement | null = null;
  let offsetX = 0;
  let offsetY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  const parseTransform = (transform: string) => {
    // Extract the translateX and translateY values from the transform property
    const match = transform.match(/translate\\(([-0-9.]+)px,\\s*([-0-9.]+)px\\)/);
    return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
  };

  const onMouseDown = (event: MouseEvent) => {
    const header = (event.target as HTMLElement).closest('.window-header');
    if (!header) return;

    const trafficLight = (event.target as HTMLElement).closest('.light');
    if (trafficLight) return;

    activeWindow = header.closest('.window-styled') as HTMLElement;
    if (!activeWindow) return;

    // Get the current transform position
    const transform = window.getComputedStyle(activeWindow).transform;
    const { x, y } = parseTransform(transform);

    // Store the initial position
    initialLeft = x;
    initialTop = y;

    // Calculate offset relative to the mouse position
    const rect = activeWindow.getBoundingClientRect();
    offsetX = event.clientX - rect.left + initialLeft;
    offsetY = event.clientY - rect.top + initialTop;

    // Add event listeners for dragging
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!activeWindow) return;

      const windowManager = document.querySelector('.window-manager') as HTMLElement;
      if (!windowManager) return;

      const managerRect = windowManager.getBoundingClientRect();
      const headerRect = activeWindow.querySelector('.window-header')?.getBoundingClientRect();

      if (!headerRect) return;

      // Calculate new position
      let left = e.clientX - offsetX;
      let top = e.clientY - offsetY;

      // Constrain the window's header within the bounds of the window manager
      if (top < managerRect.top) top = managerRect.top;
      if (top + headerRect.height > managerRect.bottom) top = managerRect.bottom - headerRect.height;
      // if (left < managerRect.left) left = managerRect.left;
      // if (left + headerRect.width > managerRect.right) left = managerRect.right - headerRect.width;

      // Apply new position to the window
      activeWindow.style.transform = `translate(${left - managerRect.left}px, ${top - managerRect.top}px)`;
      activeWindow.style.left = "";
      activeWindow.style.top = "";
  };

  const onMouseUp = () => {
    // Remove event listeners when dragging stops
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    activeWindow = null;
  };

  // Attach the mousedown event to all window headers
  document.addEventListener('mousedown', onMouseDown);
};

// Initialize draggable functionality after DOM is loaded
document.addEventListener('DOMContentLoaded', makeWindowDraggable);