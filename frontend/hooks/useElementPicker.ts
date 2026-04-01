import { RefObject, useCallback, useEffect, useState } from 'react';

export type CaptureMode = 'text' | 'list';

export interface HoverInfo { tag: string; text: string; }
export interface Field { sel: string; label: string; name: string; }

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

function autoNameFromSelector(selector: string): string {
  const s = selector.trim();
  if (!s) return 'field';

  // take last segment after combinators
  const lastSegment = s.split(/\s+|>|\+|~/).filter(Boolean).pop() ?? s;

  // remove pseudo classes/elements
  const noPseudo = lastSegment.replace(/:{1,2}[a-zA-Z-]+(\(.+\))?/g, '');

  // prefer id
  const idMatch = noPseudo.match(/#([a-zA-Z0-9_-]+)/);
  if (idMatch?.[1]) return idMatch[1];

  // prefer last class
  const classMatches = [...noPseudo.matchAll(/\.([a-zA-Z0-9_-]+)/g)];
  if (classMatches.length > 0) {
    return classMatches[classMatches.length - 1][1];
  }

  // fallback tag
  const tagMatch = noPseudo.match(/^[a-zA-Z][a-zA-Z0-9-]*/);
  if (tagMatch?.[0]) return tagMatch[0];

  return 'field';
}

export function useElementPicker(iframeRef: RefObject<HTMLIFrameElement | null>) {
  const [captureMode, setCaptureMode] = useState<CaptureMode>('text');
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [fields, setFields] = useState<Field[]>([]);

  const post = useCallback((msg: object) => {
    iframeRef.current?.contentWindow?.postMessage(msg, '*');
  }, [iframeRef]);

  const handleClick = useCallback((msg: ClickMsg) => {
    const sel = captureMode === 'list' ? (msg.listSel ?? msg.exact) : msg.exact;

    const field: Field = {
      sel,
      label: msg.text || msg.tag,
      name: autoNameFromSelector(sel),
    };

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

  const renameField = useCallback((sel: string, name: string) => {
    setFields((prev) =>
      prev.map((f) => (f.sel === sel ? { ...f, name } : f))
    );
  }, []);

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

  const getFieldNames = useCallback(
    () =>
      fields.map((f, i) => {
        const cleaned = f.name?.trim();
        return cleaned || autoNameFromSelector(f.sel) || `field-${i + 1}`;
      }),
    [fields]
  );

  return {
    captureMode,
    hoverInfo,
    fields,
    setMode,
    removeField,
    renameField,
    reset,
    getFinalSelector,
    getFieldNames,
  };
}