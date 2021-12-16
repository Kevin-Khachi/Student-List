import {useEffect, useState} from 'react';
import Student from './Student';

const StudentList = ({nameQuery, tagQuery}) => {

  //State Hook for List of Student Profiles
  const [list, setList] = useState(null);

  //Effect Hook for State List with no Dependencies
  useEffect(() => {
    const getList = async () => {
      const data = await fetchList();
      const dataWithTags = data?.students.map(student => { return {...student, tags: []}});
      console.log('List: ', list);
      setList({students: dataWithTags});
    }
    getList();
  }, []);

  //Adding Tags to Student Profiles
  const createTag = (tagQuery, index) => {
    const listCopy = {...list};
    listCopy.students[index].tags.push(tagQuery);
    setList(listCopy);
  }

  //Search By Name
  const searchName = (nameQuery) => {
    if (nameQuery.length > 0) {
      const filteredNames = list.students.filter(student => student.firstName.toLowerCase().includes(nameQuery.toLowerCase()) || student.lastName.toLowerCase().includes(nameQuery.toLowerCase()));
      return {students: filteredNames};
    } else {
      return list;
    }
  }

  //Search By Tag
  const searchTag = (tagQuery) => {
    if (tagQuery.length > 0) {
      const filteredTag =  list.students.filter(student => student.tags.includes(tagQuery));
      return {students: filteredTag};
    } else {
      return list;
    }
  }

  //API Fetch Call
  const fetchList = async () => {
    try {
      const res = await fetch('https://api.hatchways.io/assessment/students');
      const profiles = await res.json();
      return profiles;
    } catch (error) {
      console.log('COULD NOT LOAD STUDENT PROFILES - ERROR: ', error);
    }
  }

  let studentList = list;
  if (nameQuery) {
    studentList = searchName(nameQuery);
  } else if (tagQuery) {
    studentList = searchTag(tagQuery);
  } else if (nameQuery && tagQuery) {
    studentList = searchName(tagQuery);
  }

  return (
    <section id='list-container'>
      {studentList?.students?.map((child, index) => (
        <Student tagAdd={createTag} studentInfo={child} key={index} studentIndex={index} />
      ))}
    </section>
  );
}

export default StudentList;