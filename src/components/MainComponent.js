import {useState} from 'react';
import StudentList from './StudentList';

const MainComponent = () => {

  const [name, setName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  const getName = (event) => {
    const entry = event.target.value;
    setName(entry);
    if (event.code === 'Enter' || event.target.value.length === 0) {
      event.target.value = '';
    }
  }

  const getTag = (event) => {
    const entry = event.target.value;
    setSearchTag(entry);
    if (event.code === 'Enter' || event.target.value.length === 0) {
      event.target.value = '';
    }
  }

  return (
    <section className='container'>
      <section id='search-wrapper'>
        <input id='search-name' onKeyDown={getName} placeholder='Search by name' />
        <input id='search-tag' onKeyDown={getTag} placeholder='Search by tag' />
      </section>
      <StudentList nameQuery={name} tagQuery={searchTag} />
    </section>
  );
}

export default MainComponent;