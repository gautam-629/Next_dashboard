/*
 * Copyright (c) 2023 Groupado.
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 */

import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const RemoteAxleRichTextEditor = (props: any) => {
  const { id } = useParams();
  const isMerchant = location.pathname.includes('merchant');
  const content = props.content;
  console.log('Props content is ', props.content);
  console.log('Loaded content is ', content);

  const [isLoaded, setIsLoaded] = useState(false);
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Enter description' }),
    ],
    content: content,
    onUpdate: (editor: any) => {
      // const content:any = editor.getHTML(); // Get the HTML representation of the content
      const htmlContent = editor.editor.view.dom.innerHTML; // Convert JSON to HTML
      props.changeContentDescription(htmlContent);
    },
  });

  const insertImage = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
          try {
            // const imageUrl = await uploadImage(file);
            const imageUrl = '';
            editor.chain().focus().setImage({ src: imageUrl }).run();
          } catch (error) {
            console.error('Image upload failed:', error);
          }
        }
      };
      fileInput.click();
    } catch (error) {
      console.error('Error opening file input:', error);
    }
  };

  // editor.view.dom.addEventListener('keydown', (event: any) => {
  //   if (event.key === 'Backspace') {
  //     // Check if the cursor is within an image node
  //     const { from, to } = editor.state.selection;
  //     const node = editor.state.doc.nodeAt(from);
  //     if (node && node.type.name === 'image') {
  //       const imageUrl = node.attrs.src;
  //       console.log(imageUrl);
  //       // deleteImageFromBackend(imageUrl);
  //     }
  //   }
  // });

  useEffect(() => {
    console.log('@RTE use effect triggered', props.content);
    // if (id && !isMerchant && !isLoaded && props.content?.length > 0) {
    editor?.chain().setContent(props.content).run();
    // setIsLoaded(true);
    // }
  }, [props.content]);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          {/*<RichTextEditor.ClearFormatting />*/}
          {/* <RichTextEditor.Highlight /> */}
          {/*<RichTextEditor.Code />*/}
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          {/* <RichTextEditor.H1 />
          <RichTextEditor.H2 /> */}
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup> */}
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
