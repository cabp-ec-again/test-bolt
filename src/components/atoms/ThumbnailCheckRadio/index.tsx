export enum ThumbnailCheckRadioOptions {
  radio,
  checkbox,
}

export interface ThumbnailCheckRadioProps {
  id: string | number;
  name: string;
  title: string;
  src: string;
  value: string | number;
  onChange: (value: string | number, valueAlt?: string | number) => void;
  as?: ThumbnailCheckRadioOptions;
  className?: string;
}

export default function ThumbnailCheckRadio({
                                              id,
                                              name,
                                              title,
                                              src,
                                              value,
                                              onChange,
                                              as = ThumbnailCheckRadioOptions.radio,
                                              className
                                            }: ThumbnailCheckRadioProps) {
  const asCheckbox = as === ThumbnailCheckRadioOptions.checkbox;

  return (
    <label
      htmlFor={ `thumb_${ id }` }
      className={ `rounded overflow-hidden cursor-pointer text-center ${ className }` }
    >
      <img alt={ title } src={ src } className="inline-block rounded-full border border-neutral-400 mb-2 w-32"/>
      <span className="block px-2 py-1 text-xs">
        <input
          type={ asCheckbox ? 'checkbox' : 'radio' }
          id={ `thumb_${ id }` }
          name={ name }
          onChange={ () => onChange(value) }
          value={ value } className="me-2"
        />
        { title }
      </span>
    </label>
  );
}
