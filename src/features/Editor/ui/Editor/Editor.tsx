"use client";

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import debounce from 'lodash.debounce';
import { CreatePostFormContext } from '@/features/CreatePost/model/context/createPostFormContext';

interface EditorProps {
  placeholder?: string,
}

export const Editor = (props: EditorProps) => {
  const { placeholder } = props;
  const { form, setForm } = useContext(CreatePostFormContext);

  const ref = useRef<EditorJS>()
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const debouncedSave = debounce(async () => {
    const payload = await ref.current?.save();
    setForm({ ...form, content: payload })
  }, 1000);

  const onChangeHandler = useCallback(debouncedSave, [debouncedSave])

  const initEditor = () => {
    if (form.content) {
      ref.current?.render(form.content);
    }
  }

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
          initEditor();
        },
        placeholder,
        inlineToolbar: true,
        data: { blocks: [] },
        onChange: onChangeHandler,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link'
            }
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed
        }
      });
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    }
    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      }
    }
  }, [isMounted, initializeEditor])

  return (
    <div className='w-full bg-zinc-50 rounded-lg border border-zind-200'>
      <div className='prose prose-stone dark:prose-invert'>
        <div id='editor' className='min-h-[200px] w-[400px]' />
      </div>
    </div>
  )
}