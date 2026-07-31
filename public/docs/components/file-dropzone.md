# FileDropzone

Local files, ready for the next step.

Choose or drop files; accept, maxSize in bytes and maxFiles validate the selection. A new selection replaces the previous one. Files stay on the device; sending, progress and server validation belong to your application. Use Field for the native file input label.

## Install

First follow [setup](../getting-started.md). Install the package once:

```sh
npm install rillmark
```

Import components from `rillmark/file-dropzone`. Load `rillmark/styles.css` once, or use the Tailwind CSS 4 integration in setup. React 19 is supplied by your application.

## Working example

```tsx
import { Field } from 'rillmark/field'
import { FileDropzone } from 'rillmark/file-dropzone'

export default function ComponentDemo() {
  return <div className="w-full max-w-lg"><Field label="Project references" description="Choose PDFs or images. This preview does not upload files."><FileDropzone accept="image/*,.pdf" maxSize={5 * 1024 * 1024} maxFiles={3}/></Field></div>
}

```

## API

Exports (generated from TypeScript): `FileDropzone`. Native element and underlying Radix props are forwarded.

Locally declared props (generated):

| Component.prop | Type | Requirement/default | Description |
|---|---|---|---|
| FileDropzone.files | `File[]` | Optional |  |
| FileDropzone.defaultFiles | `File[]` | [] |  |
| FileDropzone.onFilesChange | `((files: File[]) => void)` | Optional |  |
| FileDropzone.maxSize | `number` | Optional | Per-file limit in bytes; omitted means no size limit. |
| FileDropzone.maxFiles | `number` | 5 |  |

[Readable source](../../source/file-dropzone.tsx)
