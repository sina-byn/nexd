'use client';

import Link from 'next/link';

import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';

// * flexsearch
import FlexSearch, { type DocumentOptions, type DocumentSearchResult } from 'flexsearch';
const { Document } = FlexSearch;

const DOC_OPTIONS: DocumentOptions<Document, string> = {
  id: 'id',
  store: 'title',
  index: ['title', 'content'],
};

// * hooks
import useClient from '@/hooks/useClient';
import useDebounce from '@/hooks/useDebounce';

// * context
import { useSearch } from './SearchContext';

// * components
import { IconFileText } from '@tabler/icons-react';

// * types
type SearchIndex = [string, Document]; // * [id, Document]

type Document = { id: string; title: string; content: string };

type SearchResult = DocumentSearchResult<Document, string, true>;

const SearchPopup = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const { open, setOpen } = useSearch();
  const client = useClient();

  const searchIndexRef = useRef(new Document({ document: DOC_OPTIONS }));

  const toggleHandler = () => setOpen(prev => !prev);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
  const debouncedChangeHandler = useDebounce(changeHandler);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const resp = await fetch('/index');
        const searchIndicies = (await resp.json()) as SearchIndex[];

        searchIndicies.forEach(si => {
          const [id, item] = si;
          searchIndexRef.current.import(id, item);
        });
      } catch (err) {
        console.error(err);
      }
    })();

    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading || query.length < 3) return;

    (async () => {
      try {
        const searchResult = await searchIndexRef.current?.searchAsync(query, {
          index: 'content',
          suggest: true,
          enrich: true,
        });

        setSearchResult(searchResult);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [query, loading]);

  return client
    ? createPortal(
        open ? (
          <div className='popup max- stack fixed inset-0 isolate z-30 w-full items-center justify-items-center'>
            <div onClick={toggleHandler} className='backdrop size-full bg-black/60' />

            <div className='pointer-events-none h-[calc(100%_-_200px)] w-full max-w-xl px-4'>
              <div className='border-default pointer-events-auto h-fit w-full rounded-xl border bg-background'>
                <header className='flex items-center justify-between gap-x-2 p-3'>
                  <input
                    type='text'
                    ref={input => input?.focus()}
                    onChange={debouncedChangeHandler}
                    placeholder='What are you searching for ?'
                    className='grow bg-transparent text-lg placeholder:text-neutral-lighter focus:outline-none'
                  />

                  <button
                    onClick={toggleHandler}
                    className='border-button shrink-0 rounded border bg-background px-1.5 py-0.5 text-xs shadow-md hover:bg-neutral-400/40'
                  >
                    <kbd className='hidden md:inline-block'>Esc</kbd>
                    <span className='md:hidden'>Cancel</span>
                  </button>
                </header>

                {searchResult.length > 0 && (
                  <div className='border-default border-t px-1.5 py-3'>
                    {searchResult.map(({ result }) => {
                      return result.map(({ id, doc: { title } }) => {
                        const _id = Array.isArray(id) ? id[0] : id;
                        const href = _id + '';

                        return (
                          <Link
                            key={_id}
                            href={href}
                            onClick={toggleHandler}
                            className='flex items-center gap-x-3 rounded-md px-1.5 py-2 capitalize hover:bg-white/10'
                          >
                            <IconFileText size={20} stroke={1.5} className='-mt-0.5' />
                            {title}
                          </Link>
                        );
                      });
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null,
        document.getElementById('popup-root')!,
      )
    : null;
};

export default SearchPopup;
