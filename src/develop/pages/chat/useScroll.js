import React from 'react'

export default function useChatScroll(dep, isLoading) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}