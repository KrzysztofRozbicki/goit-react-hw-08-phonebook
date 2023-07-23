import { useDispatch } from 'react-redux';
import { addFilter } from '../../redux/contacts/filterSlice.js';

export const Filter = () => {
  const dispatch = useDispatch();
  //Ustawia filtr do wyszukiwania kontaktów
  const handleFilter = event => {
    dispatch(addFilter(event.target.value));
  };

  return (
    <div className="flex gap-2 w-full items-center my-4 text-xl">
      <input
        className="border-2 px-2 py-2"
        type="text"
        onChange={handleFilter}
        placeholder="Search contact..."
      ></input>
      <div className="invisible sm:visible relative right-10">
        <ion-icon name="search-outline" className="z-0"></ion-icon>
      </div>
    </div>
  );
};
