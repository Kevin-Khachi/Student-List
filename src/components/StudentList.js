import {useEffect, useState} from 'react';
import Student from './Student';

const StudentList = ({nameQuery, tagQuery}) => {

  //State Hooks
  const [list, setList] = useState(null);
  const [filtNameList, setFiltNameList] = useState(null);
  const [filtTagList, setFiltTagList] = useState(null);

  //Effect Hook for State List with no Dependencies
  useEffect(() => {
    const getList = async () => {
      const data = await fetchList();
      const updData = data?.students.map(student => { return {...student, tags: [], fullName: `${student.firstName} ${student.lastName}`}});
      setList({students: updData});
    }
    getList();
  }, []);

  //Adding Tags to Student Profiles
  const createTag = (tagQuery, index) => {
    const newList = {...list};
    newList.students[index].tags.push(tagQuery);
    setList(newList);
    console.log('List: ', list);
  }

  //Search By Name
  const searchName = (nameQuery) => {
    if (nameQuery.length > 0) {
      const filteredNames = list.students.filter(student => student.fullName.toLowerCase().includes(nameQuery));
      return {students: filteredNames};
    } else {
      return list;
    }
  }

  //Search By Tag
  const searchTag = (tagQuery) => {
    if (tagQuery.length > 0) {
      const filteredTag =  list.students.filter(student => student.tags.filter(tag => tag.includes(tagQuery)).length > 0);
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

  //Invoking Fillter Functions And Returning Into New States
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