import AutoItem from './AutoItem';
import { useState, useEffect } from 'react';
import UiInput from './UI/Input/UiInput';
import { useCars } from './hooks/useCars';
import { found } from './constAuto';
import SortAuto from './SortAuto';
import { AutoType } from './Auto';



interface AutoListProps{
autos:AutoType[];

changeAutos:(autos:AutoType[]) =>void;

}

const AutoList:React.FC<AutoListProps> = ({ autos, changeAutos }) => {
  const [autoSorted, setAutoSorted] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const sortAndSearchAuto = useCars(autos, autoSorted, searchQuery);
  const [searchResultsQuery, setSearchResultsQuery] = useState<string>('');
  const [clearSearch, setClearSearch] = useState<boolean>(false);

  // const sortedAuto = (sort) => {
  //   setAutoSorted(sort);
  // };

  useEffect(() => {
    if (searchQuery.length !== 0) {
      setSearchResultsQuery(`Searched: ${sortAndSearchAuto.length} autos`);
    } else {
      setSearchResultsQuery('');
    }
  }, [searchQuery]);

  const clickSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <div className='search-sort__wrapper'>
        <div className='search__wrapper'>
          <span onClick={clickSearchClear} className={searchQuery ? 'search__clear' : 'clear'}>
            X
          </span>
          <UiInput
            value={searchQuery}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder='Search....'
          ></UiInput>
        </div>
        <SortAuto autos={autos} changeAuto={changeAutos} />
        <p className='search-result'>{searchResultsQuery} </p>
      </div>

      {sortAndSearchAuto.length !== 0 ? (
        <div className='auto__list'>
          {sortAndSearchAuto.map((auto:AutoType) => (
            <AutoItem {...auto} key={auto.id} />
          ))}
        </div>
      ) : (
        <h2 className='title'>{found}</h2>
      )}
    </div>
  );
};

export default AutoList;
