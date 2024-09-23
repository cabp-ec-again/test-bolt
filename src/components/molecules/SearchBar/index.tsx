import DropdownButton from '~/components/atoms/DropdownButton';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/16/solid';
import { SearchByKeys } from '~/app/enums/SearchByKeysEnum';

export interface SearchBarProps {
  onAddClick: () => void;
  disabled?: boolean;
  visible?: boolean;
}

export default function SearchBar({ onAddClick, visible = true, disabled = false }: SearchBarProps) {
  if (!visible) {
    return null;
  }

  const dropdownItems = Object.values(SearchByKeys);

  const dropdownOnChange = (index: number) => {
    console.log('SEARCH BY', index);
  };

  return (
    <div className="flex flex-row h-9">
      <div className="grow flex flex-row">
        <div className="grow flex flex-row h-9 bg-zinc-800 rounded-md pe-2 me-5">
          <MagnifyingGlassIcon aria-hidden="true" className="h-full text-neutral-300 p-2"/>

          <input
            type="text"
            name="byParam"
            id="byParam"
            placeholder="Search pokemon"
            disabled={ disabled }
            className="block grow border-0 py-1.5 pl-1 bg-transparent outline-none text-neutral-300 placeholder:text-neutral-500 sm:text-sm sm:leading-6"
          />
        </div>

        <DropdownButton
          items={ dropdownItems }
          onChange={ dropdownOnChange }
          className="bg-zinc-800 text-neutral-300"
          itemWrapperClassName="bg-zinc-800"
          itemClassName="data-[focus]:bg-zinc-900"
        />
      </div>

      <div className="basis-4/12 flex justify-end text-neutral-300">
        <button onClick={ onAddClick } className="flex flex-row h-9 py-2 px-3 bg-zinc-800 text-sm rounded-md">
          <PlusCircleIcon aria-hidden="true" className="h-full me-2"/>
          Create New
        </button>
      </div>
    </div>
  );
}
