import { RefObject, useCallback, useEffect, useState } from 'react';

export type CaptureMode = 'text' | 'list';

export interface HoverInfo { tag: string; text: string; }
export interface Field { sel: string; label: string; }

interface ClickMsg {
  type: 'EP_CLICK';
  exact: string;
  listSel: string | null;
  listCount: number;
  tag: string;
  text: string;
}

interface HoverMsg {
  type: 'EP_HOVER';
  tag: string;
  text: string;
}

type IframeMsg = ClickMsg | HoverMsg;

export function useElementPicker(iframeRef: RefObject<HTMLIFrameElement | null>) {
  const [captureMode, setCaptureMode] = useState<CaptureMode>('text');
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [fields, setFields] = useState<Field[]>([]);

  const post = useCallback((msg: object) => {
    iframeRef.current?.contentWindow?.postMessage(msg, '*');
  }, [iframeRef]);

  // handle click from iframe based on current capture mode
  const handleClick = useCallback((msg: ClickMsg) => {
    if (captureMode === 'text') {
      // text mode: add exact selector, no duplicates
      const field: Field = { sel: msg.exact, label: msg.text || msg.tag };
      setFields((prev) => {
        if (prev.find((f) => f.sel === field.sel)) return prev;
        const next = [...prev, field];
        post({ type: 'EP_ADD_FIELD', sel: field.sel });
        return next;
      });
      return;
    }

    // list mode: use list selector when available, else exact
    const sel = msg.listSel ?? msg.exact;
    const field: Field = { sel, label: msg.text || msg.tag };
    setFields((prev) => {
      if (prev.find((f) => f.sel === field.sel)) return prev;
      const next = [...prev, field];
      post({ type: 'EP_ADD_FIELD', sel: field.sel });
      return next;
    });
  }, [captureMode, post]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const msg = e.data as IframeMsg;
      if (!msg?.type) return;
      if (msg.type === 'EP_HOVER') setHoverInfo({ tag: msg.tag, text: msg.text });
      if (msg.type === 'EP_CLICK') handleClick(msg);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [handleClick]);

  const setMode = useCallback((mode: CaptureMode) => {
    setCaptureMode(mode);
    setFields([]);
    post({ type: 'EP_RESET' });
  }, [post]);

  const removeField = useCallback((sel: string) => {
    setFields((prev) => prev.filter((f) => f.sel !== sel));
    post({ type: 'EP_REMOVE_FIELD', sel });
  }, [post]);

  const reset = useCallback(() => {
    setFields([]);
    setHoverInfo(null);
    setCaptureMode('text');
    post({ type: 'EP_RESET' });
  }, [post]);

  const getFinalSelector = useCallback(
    () => fields.map((f) => f.sel).join(', '),
    [fields]
  );

  return {
    captureMode, hoverInfo, fields,
    setMode, removeField, reset, getFinalSelector,
  };
}