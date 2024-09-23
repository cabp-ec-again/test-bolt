'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function PageHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className=" bg-black bg-opacity-50 p-3 fixed w-full top-0">
      <div className="mx-auto flex justify-center">
        <Image alt="" src={ '/img/site-logo.png' } width={ 100 } height={ 37 }/>
      </div>

      <nav aria-label="Global" className="mx-auto flex justify-center pt-2">
        { /* Logo */ }
        <div className="flex lg:flex-1 lg:hidden">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Pokemon</span>
            <img
              alt="Pokemon"
              src="/img/site-logo.png"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        { /* Mobile Menu Button */ }
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={ () => setMobileMenuOpen(true) }
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
          </button>
        </div>

        { /* Menu Items */ }
        <div className="hidden lg:flex">
          <Link href="/" className="text-sm mx-10">
            Home
          </Link>
          <Link href="/pokedex" className="text-sm mx-10">
            Pokedex
          </Link>
        </div>
      </nav>

      { /* Mobile Menu */ }
      <Dialog open={ mobileMenuOpen } onClose={ setMobileMenuOpen } className="lg:hidden">
        <div className="fixed inset-0 z-10"/>

        <DialogPanel
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          { /* Menu Buttons */ }
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Pokemon</span>
              <img
                alt="Pokemon"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={ () => setMobileMenuOpen(false) }
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
            </button>
          </div>

          { /* Menu Items */ }
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 leading-7 text-gray-900"
                >
                  Home
                </Link>
                <a
                  href="/pokedex"
                  className="-mx-3 block rounded-lg px-3 py-2 leading-7 text-gray-900"
                >
                  Pokedex
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
