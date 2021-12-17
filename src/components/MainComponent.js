import {useState} from 'react';
import StudentList from './StudentList';

const MainComponent = () => {

  const [name, setName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  const getName = (event) => {
      const entry = event.target.value;
      setName(entry);
  }

  const getTag = (event) => {
      const entry = event.target.value;
      setSearchTag(entry);
  }

  return (
    <section className='container'>
      <section id='search-wrapper'>
        <input id='search-name' onChange={getName} value={name} placeholder='Search by name' />
        <input id='search-tag' onChange={getTag} value={searchTag} placeholder='Search by tag' />
      </section>
      <StudentList nameQuery={name} tagQuery={searchTag} />
    </section>
  );
}

export default MainComponent;