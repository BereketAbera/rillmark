import { Field } from 'rillmark/field'
import { FileDropzone } from 'rillmark/file-dropzone'

export default function ComponentDemo() {
  return <div className="w-full max-w-lg"><Field label="Project references" description="Choose PDFs or images. This preview does not upload files."><FileDropzone accept="image/*,.pdf" maxSize={5 * 1024 * 1024} maxFiles={3}/></Field></div>
}
