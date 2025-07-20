import React, { useState, useEffect } from 'react'
import './MultiSelectSearch.scss'
import { useQuery } from '@tanstack/react-query'
import { getDomains } from '../../api/domain'
import SelectSearch from './SelectSearch'
import { PlusLg, Trash } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import ErrorLabel from '../ErrorLabel/ErrorLabel'

const MultiSelectSearch = ({
  query,
  searchFields = ["title"],
  mapping = (elem) => <Link>{elem.title}</Link>,
  objectMapping = (elem) => elem,
  placeholder = "Choisir une option",
  searchPlaceholder = "Rechercher",
  toPlaceholder = (elem) => elem.title,
  repoName = "optionsRepo",
  validationErrors = [],
  onChange = () => { },
  defaultValues = [],
  onInit=()=>{}
}) => {
  const [selected, setSelected] = useState(defaultValues.length > 0 ? defaultValues : [{}]);

  useEffect(()=>{
    onInit(selected)
  },[])


  const addOption = () => {
    setSelected([...selected, {}]);
  };
  const removeOption = (index) => {
    if (selected?.length > 1) {
      const newOptions = selected.slice();
      setSelected((prev) => prev.filter((m, i) => i !== index));
    }
  };
  const editOption = (index, newValue) => {
    const newOptions = [...selected];
    newOptions[index] = newValue;
    setSelected(newOptions);
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      {selected?.map((s, i) => (
        <div key={i} className='form-group'>
          <div
            className="flex align-items-center gap-10 multi-select-search-item"
          >
            <SelectSearch
              value={defaultValues[i] ? defaultValues[i] : null}
            searchFields={searchFields}
            repoName={repoName}
            exclude={selected}
            mapping={mapping}
            objectMapping={objectMapping}
            query={query}
            toPlaceholder={toPlaceholder}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            onChange={(option) => {
              editOption(i, option);
            }}
            />
            <button
              className="btn-outline-light remove-select-search"
              onClick={() => {
                removeOption(i);
              }}
            >
              <Trash size={16} />
            </button>
          </div>
          <ErrorLabel error={validationErrors[i]} />
        </div>
      ))}
      <div className='flex'>
        <button className="btn btn-orange add-select-search" onClick={addOption}>
          <PlusLg /> Ajouter
        </button>
      </div>
    </>
  );
};

export default MultiSelectSearch;
