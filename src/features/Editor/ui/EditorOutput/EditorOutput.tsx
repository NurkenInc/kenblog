'use client';

import dynamic from 'next/dynamic';
import { CustomImageRenderer, CustomCodeRenderer } from '@/shared/libs/components/EditorRenderers';

const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
  ssr: false,
})

interface EditorOutputProps {
  content: any,
}

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  }
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
}

export const EditorOutput = (props: EditorOutputProps) => {
  const { content } = props;

  return (
    <Output 
      className='text-sm' 
      renderers={renderers} 
      style={style} 
      data={content} 
    />
  )
}