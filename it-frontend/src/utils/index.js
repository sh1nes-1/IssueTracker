const { useRef, useEffect } = require("react");

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function mapIssueLevel(level) {
  switch (level) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return 'default';
  }
}