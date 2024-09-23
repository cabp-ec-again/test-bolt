import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export interface DropdownButtonProps {
  items: string[];
  onChange: (index: number) => void;
  defaultIndex?: number;
  disabled?: boolean;
  className?: string;
  itemWrapperClassName?: string;
  itemClassName?: string;
}

export default function DropdownButton({
                                         items,
                                         onChange,
                                         defaultIndex = 0,
                                         disabled = false,
                                         className = '',
                                         itemWrapperClassName = 'bg-white',
                                         itemClassName = ''
                                       }: DropdownButtonProps) {
  const [selection, setSelection] = useState<number>(defaultIndex!);

  const onItemClick = (index: number) => {
    onChange(index);
    setSelection(index);
  };

  return (
    <Menu as="div" className={ `relative inline-block text-left rounded-md w-40 ${ className }` }>
      <MenuButton
        disabled={ disabled }
        className="inline-flex w-full justify-between gap-x-1.5 px-3 py-2 text-sm "
      >
        By: { items[selection].toLowerCase() }
        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-zinc-50"/>
      </MenuButton>

      <MenuItems
        as="ul"
        transition
        className={ `${ itemWrapperClassName } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in` }
      >
        <div className="py-1">
          {
            items.map((item, i) => (
              <MenuItem
                key={ `menu_${ i }` }
                as="li"
                onClick={ () => onItemClick(i) }
                className={ `block px-4 py-2 text-sm bg-transparent ${ itemClassName }` }
              >
                { item }
              </MenuItem>
            ))
          }
        </div>
      </MenuItems>
    </Menu>
  );
}
