import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Field, Fieldset, Textarea } from '@headlessui/react';
import { ArrowRightIcon, PencilIcon } from '@heroicons/react/16/solid';
import { PokemonResponseInterface } from '~/app/models/Pokemon/PokemonResponseInterface';
import { PokemonCreateBodyInterface } from '~/app/models/Pokemon/PokemonCreateBodyInterface';
import FileUploadField from '~/components/atoms/FileUploadField';
import Modal from '~/components/organisms/Modal';
import ThumbnailCheckRadio from '~/components/atoms/ThumbnailCheckRadio';

export interface IdLabelPairInterface {
  id: number;
  label: string;
}


export interface CharacterFormProps {
  onSubmit: (body: string, base64: string) => void;
  character?: PokemonResponseInterface;
}

export default function CharacterForm({
                                        onSubmit,
                                        character
                                      }: CharacterFormProps) {
  const [characterToSave, setCharacterToSave] = useState<Partial<PokemonCreateBodyInterface>>(character ?? {});
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [evolutionDescription, setEvolutionDescription] = useState<string>('');
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [genderRatioFemale, setGenderRatioFemale] = useState<number>();
  const [genderRatioMale, setGenderRatioMale] = useState<number>();
  const [abilityIds, setAbilityIds] = useState<IdLabelPairInterface[]>([]);
  const [groupIds, setGroupIds] = useState<IdLabelPairInterface[]>([]);
  const [typeIds, setTypeIds] = useState<IdLabelPairInterface[]>([]);
  const [evolutionId, setEvolutionId] = useState<number>();
  const [pokeImage, setPokeImage] = useState<string>();

  // Modals
  const [dialogTypesOpen, setDialogTypesOpen] = useState<boolean>(false);
  const [dialogAbilitiesOpen, setDialogAbilitiesOpen] = useState<boolean>(false);
  const [dialogGroupsOpen, setDialogGroupsOpen] = useState<boolean>(false);
  const [dialogEvolutionOpen, setDialogEvolutionOpen] = useState<boolean>(false);

  console.log('CHARACTER TO SAVE', characterToSave);
  console.log('BODY', JSON.stringify(characterToSave));

  const consolidate = (key: string, value: unknown) => {
    console.log('CONSOLIDATE KEY-VALUE', key, value);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    characterToSave[key] = value;
    setCharacterToSave(characterToSave);

    // Check if mandatory fields are set
    let mandatoryKeysSet = true;
    const mandatoryKeys = [
      'name',
      'number',
      'description',
      'height',
      'weight',
      'gender_ratio_male',
      'gender_ratio_female',
      'abilities',
      'groups',
      'types'
    ];

    for (let i = 0; i < mandatoryKeys.length; i++) {
      if (!characterToSave.hasOwnProperty(mandatoryKeys[i])) {
        mandatoryKeysSet = false;
        break;
      }
    }

    if (mandatoryKeysSet) {
      setSubmitEnabled(true);
    }
  };

  const onChange = <T, >(
    key: string,
    value: T,
    stateSetter: Dispatch<SetStateAction<T>>
  ) => {
    stateSetter(value);
    consolidate(key, value);
  };

  const onCheckboxGroupChange = (
    key: string,
    id: number,
    e: ChangeEvent<HTMLInputElement>,
    container: IdLabelPairInterface[],
    stateSetter: Dispatch<SetStateAction<IdLabelPairInterface[]>>
  ) => {
    const containerIds = container.map(pair => pair.id);

    if ((e.target.checked && containerIds.includes(id)) || (!e.target.checked && !containerIds.includes(id))) {
      return;
    } else if (e.target.checked && !containerIds.includes(id)) {
      container.push(JSON.parse(`{ "id": ${ id }, "label": "${ e.target.value }" }`));
    } else if (!e.target.checked && containerIds.includes(id)) {
      container.splice(containerIds.findIndex(arrEl => arrEl === id), 1);
    }

    stateSetter(container);
    consolidate(key, container.map(pair => pair.id));
  };

  const validate = (): boolean => {
    console.log('Validating form...');

    if (!characterToSave.abilities?.length && !characterToSave.groups?.length && !characterToSave.types?.length) {
      return false;
    }

    // TODO: perform other validations here or encapsulate in another class, function or object
    return true;
  };

  const onFileUploadChange = (base64: string): void => {
    setPokeImage(base64);
  };

  const onSubmitClick = (): void => {
    if (!validate()) {
      console.warn('CAN\'T SUBMIT...');
      return;
    }

    console.log('SUBMIT');
    onSubmit(JSON.stringify(characterToSave), pokeImage!);
  };

  // TODO: create proper abstractions
  const typesAvail = [
    { id: 2, name: 'Electric' },
    { id: 3, name: 'Dark' },
    { id: 4, name: 'Grass' }
  ];

  const abilitiesAvail = [
    { id: 1, name: 'Static' },
    { id: 2, name: 'Leaf Guard' }
  ];

  const groupsAvail = [
    { id: 1, name: 'Monster' },
    { id: 2, name: 'Grass' }
  ];

  const evolutionCharacter = {
    'pokemon_id': 27,
    'name': 'Pikachu',
    'number': 25,
    'description': 'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
    'evolution_description': 'Pikachu evolves into Raichu',
    'height': '1.04',
    'weight': '13.2',
    'gender_ratio_male': '40',
    'gender_ratio_female': '60',
    'evolution': null,
    'created_at': '2024-09-21T00:00:00.000Z',
    'updated_at': null,
    'pokemon_abilities': [
      {
        'ability_id': 1,
        'name': 'Static',
        'description': 'The Pokémon is charged with static electricity and may paralyze attackers that make direct contact with it.'
      }
    ],
    'pokemon_groups': [
      {
        'egg_group_id': 2,
        'name': 'Grass',
        'description': 'Grass egg'
      }
    ],
    'pokemon_types': [
      {
        'poketype_id': 2,
        'poketype_name': 'Electric',
        'poketype_description': 'Electric type'
      }
    ]
  };

  return (
    <>
      <form className="text-neutral-300">
        <Fieldset>
          <h1 className="font-bold">{ character ? character.name : 'New Pokemon' }</h1>

          <div className="flex flex-row justify-between mb-4">
            <Field className="grow pe-4">
              <input
                type="text"
                placeholder="Name"
                onChange={ (e) => onChange<string>('name', e.target.value, setName) }
                value={ name }
                className="mt-3 block w-full rounded border-none bg-neutral-800 py-1.5 px-3 text-sm/6 text-neutral-300 outline-none"
              />
            </Field>

            <Field className="basis-1/4">
              <input
                type="number"
                placeholder="No. 123"
                onChange={ (e) => onChange<number | undefined>('number', Number(e.target.value), setNumber) }
                value={ number ?? '' }
                className="mt-3 block w-full rounded border-none bg-neutral-800 py-1.5 px-3 text-sm/6 text-neutral-300 outline-none"
              />
            </Field>
          </div>

          <FileUploadField title="Pokemon Photo" onChange={ onFileUploadChange }/>

          <div className="text-sm/6 text-start text-gray-400 mt-3 bg-neutral-800 rounded px-3 py-1 w-full">
            <button
              type="button"
              onClick={ () => setDialogTypesOpen(true) }
              className="items-center text-sm/6 text-center me-1"
            >
              <PencilIcon className="h-4 w-4 inline-block me-2"/>
              Types:
            </button>
            {
              typeIds.map((pair, index) => (
                <span
                  key={ `typeChip_${ index }` }
                  className="bg-neutral-900 rounded-2xl text-xs py-1 px-2 mx-1"
                >
                  { pair.label }
                </span>
              ))
            }
          </div>

          <Field>
            <Textarea
              placeholder="Description"
              onChange={ (e) => onChange<string>('description', e.target.value, setDescription) }
              value={ description }
              className="mt-3 block w-full resize-none rounded border-none bg-neutral-800 py-1.5 px-3 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              rows={ 2 }
            />
          </Field>

          <div className="flex flex-row justify-between">
            <Field className="basis-1/2 pe-2">
              <input
                type="number"
                placeholder="Height"
                onChange={ (e) => onChange<number | undefined>('height', Number(e.target.value), setHeight) }
                value={ height }
                className="mt-3 block w-full rounded border-none bg-neutral-800 py-1.5 px-3 text-sm/6 text-neutral-300 outline-none"
              />
            </Field>

            <Field className="basis-1/2 ps-2">
              <input
                type="number"
                placeholder="Width"
                onChange={ (e) => onChange<number | undefined>('weight', Number(e.target.value), setWidth) }
                value={ width }
                className="mt-3 block w-full rounded border-none bg-neutral-800 py-1.5 px-3 text-sm/6 text-neutral-300 outline-none"
              />
            </Field>
          </div>

          <div className="flex flex-row justify-between">
            <Field className="basis-1/2 flex flex-row h-9 bg-zinc-800 rounded-md me-2 mt-3">
              <span className="icon icon-female bg-gray-400 w-4 ms-2"/>

              <input
                type="number"
                name="genderRatioFemale"
                placeholder="Gender ratio (F)"
                onChange={ (e) => onChange<number | undefined>('gender_ratio_male', Number(e.target.value), setGenderRatioFemale) }
                value={ genderRatioFemale }
                className="block grow border-0 py-1.5 pl-1 bg-transparent outline-none text-neutral-300 sm:text-sm sm:leading-6"
              />
            </Field>

            <Field className="basis-1/2 flex flex-row h-9 bg-zinc-800 rounded-md ms-2 mt-3">
              <span className="icon icon-male bg-gray-400 w-4 ms-2"/>

              <input
                type="number"
                name="genderRatioMale"
                placeholder="Gender ratio (M)"
                onChange={ (e) => onChange<number | undefined>('gender_ratio_female', Number(e.target.value), setGenderRatioMale) }
                value={ genderRatioMale }
                className="block grow border-0 py-1.5 pl-1 bg-transparent outline-none text-neutral-300 sm:text-sm sm:leading-6"
              />
            </Field>
          </div>

          <div className="text-sm/6 text-start text-gray-400 mt-3 bg-neutral-800 rounded px-3 py-1 w-full">
            <button
              type="button"
              onClick={ () => setDialogAbilitiesOpen(true) }
              className="items-center text-sm/6 text-center me-1"
            >
              <PencilIcon className="h-4 w-4 inline-block me-2"/>
              Abilities:
            </button>
            {
              abilityIds.map((pair, index) => (
                <span
                  key={ `abilityChip_${ index }` }
                  className="bg-neutral-900 rounded-2xl text-xs py-1 px-2 mx-1"
                >
                  { pair.label }
                </span>
              ))
            }
          </div>

          <div className="text-sm/6 text-start text-gray-400 mt-3 bg-neutral-800 rounded px-3 py-1 w-full">
            <button
              type="button"
              onClick={ () => setDialogGroupsOpen(true) }
              className="items-center text-sm/6 text-center me-1"
            >
              <PencilIcon className="h-4 w-4 inline-block me-2"/>
              Egg Groups:
            </button>
            {
              groupIds.map((pair, index) => (
                <span
                  key={ `groupChip_${ index }` }
                  className="bg-neutral-900 rounded-2xl text-xs py-1 px-2 mx-1"
                >
                  { pair.label }
                </span>
              ))
            }
          </div>

          <Field>
            <input
              type="text"
              placeholder="Evolution description"
              onChange={ (e) => onChange<string>('evolution_description', e.target.value, setEvolutionDescription) }
              value={ evolutionDescription }
              className="mt-3 block w-full rounded border-none bg-neutral-800 py-1.5 px-3 text-sm/6 text-neutral-300 outline-none"
            />
          </Field>

          <div className="text-sm/6 text-start text-gray-400 mt-3 bg-neutral-800 rounded px-3 py-1 w-full">
            <button
              type="button"
              onClick={ () => setDialogEvolutionOpen(true) }
              className="items-center text-sm/6 text-center me-1"
            >
              <PencilIcon className="h-4 w-4 inline-block me-2"/>
              Evolutions:
            </button>

            <div className="flex justify-center items-center my-2">
              <img alt={ `${ 'Chichico' }'s evolutions` } src="https://placehold.co/32x32" className="w-16"/>
              <ArrowRightIcon aria-hidden="true" className="block h-16 lg:mx-12"/>
              <img alt={ `${ 'Chichico' }'s evolutions` } src="https://placehold.co/32x32" className="w-16"/>
            </div>
          </div>
        </Fieldset>

        <div className="flex flex-row justify-end mt-5">
          <button type="button" className="py-2 px-3 bg-neutral-200 text-sm text-neutral-800 rounded-md me-4">
            Cancel
          </button>

          <button
            type="button"
            onClick={ onSubmitClick }
            disabled={ !submitEnabled }
            className="disabled:bg-neutral-600 disabled:text-neutral-400 py-2 px-3 bg-neutral-800 text-sm text-neutral-300 rounded-md"
          >
            Save
          </button>
        </div>
      </form>

      <Modal
        title="Select types"
        open={ dialogTypesOpen }
        onClose={ () => setDialogTypesOpen(false) }
      >
        {
          typesAvail.map((item, index) => (
            <label
              key={ `pokeType_${ index }` }
              htmlFor={ `pokeType_${ index }` }
              className="inline-block text-sm me-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id={ `pokeType_${ index }` }
                value={ item.name }
                onChange={ (e) => onCheckboxGroupChange(
                  'types',
                  item.id,
                  e,
                  typeIds,
                  setTypeIds
                ) }
                className="me-1"
              />
              { item.name }
            </label>
          ))
        }
      </Modal>

      <Modal
        title="Select abilities"
        open={ dialogAbilitiesOpen }
        onClose={ () => setDialogAbilitiesOpen(false) }
      >
        {
          abilitiesAvail.map((item, index) => (
            <label
              key={ `ability_${ index }` }
              htmlFor={ `ability_${ index }` }
              className="inline-block text-sm me-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id={ `ability_${ index }` }
                value={ item.name }
                onChange={ (e) => onCheckboxGroupChange(
                  'abilities',
                  item.id,
                  e,
                  abilityIds,
                  setAbilityIds
                ) }
                className="me-1"
              />
              { item.name }
            </label>
          ))
        }
      </Modal>

      <Modal
        title="Select egg groups"
        open={ dialogGroupsOpen }
        onClose={ () => setDialogGroupsOpen(false) }
      >
        {
          groupsAvail.map((item, index) => (
            <label
              key={ `group_${ index }` }
              htmlFor={ `group_${ index }` }
              className="inline-block text-sm me-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id={ `group_${ index }` }
                value={ item.name }
                onChange={ (e) => onCheckboxGroupChange(
                  'groups',
                  item.id,
                  e,
                  groupIds,
                  setGroupIds
                ) }
                className="me-1"
              />
              { item.name }
            </label>
          ))
        }
      </Modal>

      <Modal
        title="Select evolution"
        open={ dialogEvolutionOpen }
        onClose={ () => setDialogEvolutionOpen(false) }
        wide={ true }
      >
        <div className="grid grid-cols-4 gap-4 w-full pt-4">
          <ThumbnailCheckRadio
            id={ 0 }
            name={ `evolutionId` }
            title={ evolutionCharacter.name }
            src={ `https://placehold.co/32x32` }
            value={ evolutionCharacter.pokemon_id }
            onChange={ (value) => onChange<number | undefined>('evolution', Number(value), setEvolutionId) }
            className="mb-4"
          />

          <ThumbnailCheckRadio
            id={ 1 }
            name={ `evolutionId` }
            title={ `Chichico` }
            src={ `https://placehold.co/32x32` }
            value={ 1 }
            onChange={ (value) => onChange<number | undefined>('evolution', Number(value), setEvolutionId) }
            className="mb-4"
          />
        </div>
      </Modal>
    </>
  );
}
