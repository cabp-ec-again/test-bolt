import { ChangeEvent, useState, useRef } from 'react';
import { Field } from '@headlessui/react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

export interface FileUploadFieldProps {
  title: string;
  onChange: (base64: string) => void;
}

export default function FileUploadField({ title, onChange }: FileUploadFieldProps) {
  const [imageSrcSet, setImageSrcSet] = useState<boolean>(false);
  const filePreviewRef = useRef<HTMLImageElement>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('UPLOAD', e.target);
    const fileReader = new FileReader();

    fileReader.onload = fre => {
      const value = fre.target!.result as string;
      filePreviewRef.current!.setAttribute('src', value);
      setImageSrcSet(true);
      onChange(value);
    };

    fileReader.readAsDataURL(e.target.files![0]);
  };

  return (
    <Field className="flex flex-col justify-center rounded bg-neutral-800 text-gray-400 px-3 py-1">
      <span className="text-sm/6">{ title }</span>

      <label htmlFor="pokePhoto" className="text-center text-xs pb-2">
        <img
          alt=""
          ref={ filePreviewRef }
          src="https://placehold.co/64x64"
          className={ `block mx-auto w-16 mb-4${ imageSrcSet ? '' : ' rounded-full' }` }
        />

        <p>
          <ArrowUpTrayIcon className="inline-block h-4 w-4 mx-2"/>
          <span className="font-bold">Choose a file</span> or drag it here.
          <ArrowUpTrayIcon className="inline-block h-4 w-4 mx-2"/>
        </p>

        <input
          type="file"
          id="pokePhoto"
          onChange={ onFileUploadChange }
          accept=".png,image/png"
          className="block h-1 opacity-0"
        />
      </label>
    </Field>
  );
}
