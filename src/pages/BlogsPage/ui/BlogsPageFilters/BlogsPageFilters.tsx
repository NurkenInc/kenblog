'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/shared/ui/Command/command';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post, Prisma } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { Newspaper } from 'lucide-react';
import debounce from 'lodash.debounce';
import { Loader2 } from 'lucide-react';
import { useOnClickOutside } from '@/shared/libs/hooks/useOnClickOutside';
import { toast } from 'react-toastify';

interface BlogsPageFiltersProps {

}

export const BlogsPageFilters = (props: BlogsPageFiltersProps) => {
  const [search, setSearch] = useState<string>('');

  const { data: queryResults, refetch, isFetched, isFetching } = useQuery({
    queryFn: async () => {
      if (!search) return []
      const { data } = await axios.get(`/api/search?q=${search}`)
      return data as (Post & {
        _count: Prisma.PostCountOutputType
      })[];
    },
    queryKey: ['search-query'],
    enabled: false,
    onError: () => {
      toast.error('Something went wrong');
    }
  })
  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(commandRef, () => {
    setSearch('');
  })

  const request = debounce(() => {
    refetch();
  }, 300)

  const debounceRequest = useCallback(() => {
    request();
  }, [])

  const onChange = (text: string) => {
    setSearch(text);
    debounceRequest();
  }

  useEffect(() => {
    setSearch('');
  }, [pathname])

  const onSelect = (id: string) => () => {
    router.push(`/feed/post/${id}`);
  }

  return (
    <Command ref={commandRef} className='relative rounded-lg border max-w-full z-10 overflow-visible'>
      <CommandInput
        value={search}
        onValueChange={onChange}
        className='outline-none border-none focus:outline-none focus:border-none ring-0'
        placeholder='Search posts...'
      >
      </CommandInput>
      {search.length > 0 ? (
        <CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
          {(queryResults?.length ?? 0) === 0 && !isFetching && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading='Posts'>
              {queryResults?.map(post => (
                <CommandItem 
                  key={post.id} 
                  onSelect={onSelect(post.id)}
                  value={post.title}
                >
                  <Newspaper className='mr-2 h-4 w-4' />
                  <a href={`/feed/post/${post.id}`}>
                    {post.title}
                  </a>
                </CommandItem>
              ))}            
            </CommandGroup>
          ) : isFetching ? (
          <div className='w-full h-11 flex items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin' />
          </div>) : null}
        </CommandList>
      ) : null
      }
    </Command>
  )
}