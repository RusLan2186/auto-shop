import { useMemo } from 'react';
import { AutoType } from '../Auto';



export const useSortedAutos  = (autos:AutoType[], sort:any) => {

  
  let sortAuto = useMemo(() => {
    if (sort) {

      
// @ts-ignore
      return [...autos].sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    return autos;
  }, [sort, autos]);

  return sortAuto;
};


export const useCars = (autos:AutoType[], sort:string, query:string) => {
  const sortAuto = useSortedAutos(autos, sort);
  const sortAndSearchAuto = useMemo(() => {
    return sortAuto.filter(
      (auto) =>
        auto.brand.toLowerCase().includes(query.toLowerCase()) ||
        auto.year.toLowerCase().includes(query.toLowerCase()) ||
        auto.price.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sortAuto]);

  return sortAndSearchAuto;
};
