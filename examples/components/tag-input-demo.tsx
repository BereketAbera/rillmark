import { useState } from 'react'
import { Field } from 'rillmark/field'
import { TagInput } from 'rillmark/tag-input'

export default function ComponentDemo() {
  const [tags, setTags] = useState(['Research', 'Design'])
  return <div className="w-full max-w-md"><Field label="Project topics" description={`${tags.length} of 5 topics added.`}><TagInput value={tags} onValueChange={setTags} maxTags={5} placeholder="Add a topic…" name="topics"/></Field></div>
}
