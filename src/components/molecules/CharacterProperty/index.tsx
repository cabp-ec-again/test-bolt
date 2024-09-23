import { ReactNode } from 'react';

export interface CharacterPropertyProps {
  title: string;
  value?: string;
  className?: string;
  children?: ReactNode | ReactNode[];
}

export default function CharacterProperty({
                                            title,
                                            value,
                                            children,
                                            className = ''
                                          }: CharacterPropertyProps) {
  if (!value && !children) {
    return null;
  }

  return (
    <div className={ `text-xs ${ className }` }>
      <h6 className=" font-bold">{ title }</h6>
      <div>
        { value ?? children }
      </div>
    </div>
  );
}
