import React, { FunctionComponent, useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'

import { Explanation } from './extensions/Explanation'
import { MenuBar } from './components/MenuBar'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { SearchNReplace } from './extensions/Search'

Highlight.configure({
  HTMLAttributes: {
    class: 'explanation',
  },
})

const defaultContent = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of a message. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p >
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
`

const markExplanations = (selectedExplanation) => { 
  const explanations = document.querySelectorAll('[data-explanation]')
  explanations.forEach((e) => {        
    if (e.classList.contains('mark-active')) {
      e.classList.remove('mark-active')
    }
  })

  // FIX TIMEOUT
  setTimeout(() => {
    explanations.forEach((e) => {
      //TODO Multiple marks per explanation
      const dataExplanation = e.getAttribute('data-explanation')
      if (parseInt(dataExplanation) === selectedExplanation) {          
        e.classList.add('mark-active')
      }
    })
  }, 100)
}


interface Props {}

export default ({ }: Props) => {

  const {
    changeSelected,
    selectedExplanation,
    setContent
  } = useStore((state) => ({
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    setContent: state.setContent
  }), shallow)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Explanation,
      SearchNReplace
    ],
    content: defaultContent,
    onSelectionUpdate(props) {      
      if (props.editor.isActive('explanation')) {
        props.editor.commands.extendMarkRange('explanation')
        const dataIndex = props.editor.getAttributes('explanation')['data-explanation']
        if (dataIndex !== selectedExplanation) {
          changeSelected(dataIndex)
        }
      }
    },
    onUpdate(props) {
      setContent(props.editor.getHTML())
    },
    onCreate(props) {
      setContent(props.editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor) {
      markExplanations(selectedExplanation)      
    }
  }, [selectedExplanation])
  
  return (
    <Wrapper>
      <EditorStyles />
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  background: #eee;
  border-radius: 4px;
  width: 70%
`

const EditorStyles = createGlobalStyle`
/* Basic editor styles */
.ProseMirror {
  margin-top: 8px;
  background: white;
  border-radius: 4px;

  padding: 8px;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgb(13,13,13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgb(13,13,13, 0.1);
    margin: 2rem 0;
  }
}

.is-active {
  background: black;
  color: #fff;
}

button {
  font-size: inherit;
  font-family: inherit;
  color: #000;
  margin: 0.1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  background: white;
  accent-color: black;
}

.mark-active {
  background: #FCC934;
}

.mark-normal {
  background: green;
}
`
