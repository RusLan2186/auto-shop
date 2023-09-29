import { useMemo } from 'react';

export const useSortedAutos = (autos, sort) => {
  const sortAuto = useMemo(() => {
    if (sort) {
      return [...autos].sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    return autos;
  }, [sort, autos]);

  return sortAuto;
};

export const useCars = (autos, sort, query) => {
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
