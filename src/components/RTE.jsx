import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import  TinyMCEapikey  from '../conf/conf'

function RTE({
    name,
    control, // passed from component which will call this because register method cannot be used to control third party components
    label,
    defaultValue = " "
}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>
        {label}    </label>}

        <Controller 
        name = {name || "content"}
        control = {control}
        render = {({field : {onChange}})=>(
            <Editor
            initialValue={defaultValue}
            apiKey={TinyMCEapikey}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
        )}
        />

    </div>
  )
}

export default RTE
