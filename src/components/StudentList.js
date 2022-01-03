import { useEffect, useState } from "react";
import Student from "./Student";

const StudentList = ({ nameQuery, tagQuery }) => {
  //State Hooks
  const [list, setList] = useState(null);
  const [tagList, setTagList] = useState([]);

  //Effect Hook for State List with no Dependencies
  useEffect(() => {
    const getList = async () => {
      const studentList = await fetchList();
      const updatedList = studentList?.students.map((student) => ({
        ...student,
        tags: [],
        fullName: `${student.firstName} ${student.lastName}`,
      }));
      setList({ students: updatedList });
    };
    getList();
  }, []);

  //debug
  console.log("List: ", list);
  console.log("tagList: ", tagList);

  //API Fetch Call
  const fetchList = async () => {
    try {
      const res = await fetch("https://api.hatchways.io/assessment/students");
      const profiles = await res.json();
      return profiles;
    } catch (error) {
      console.log("COULD NOT LOAD STUDENT PROFILES - ERROR: ", error);
    }
  };

  //Adding Tags to Student Profiles
  const createTag = (tagQuery, index) => {
    const newList = { ...list };
    newList.students[index - 1].tags.push(tagQuery);
    setList(newList);
    //Setting The State For The Tag List
    setTagList([
      ...tagList,
      [parseFloat(index) - 1, tagQuery, list.students[index - 1].fullName],
    ]);
  };

  //Search By Name
  const searchName = (nameQuery) => {
    if (nameQuery.length > 0) return list
    const filteredNames = list.students.filter((student) =>
      student.fullName.toLowerCase().includes(nameQuery.toLowerCase())
    );
    return { students: filteredNames };
  };

  //Search By Tag
  const searchTag = (tagQuery) => {
    if (tagQuery.length === 0) return list
    const filteredTag = list.students.filter((student) =>
        student.tags.filter((tag) => tag.includes(tagQuery.toLowerCase())).length > 0
    );
    return { students: filteredTag };
  };

  //Search By Both Name And Tag
  const searchTagAndName = (queriedTag, queriedName) => {
    const studListFiltTag = searchTag(queriedTag);
    const filtNameWithTag = studListFiltTag.students.filter((student) => (
      student.fullName.toLowerCase().includes(queriedName.toLowerCase())
    ));
    return { students: filtNameWithTag };
  };

  //Invoking Fillter Functions
  let studentList = list;
  if (tagQuery && nameQuery) {
    studentList = searchTagAndName(tagQuery, nameQuery);
  } else if (nameQuery) {
    studentList = searchName(nameQuery);
  } else if (tagQuery) {
    studentList = searchTag(tagQuery);
  }

  return (
    <section id="list-container">
      {studentList?.students?.map((child, index) => {
        return (
          <Student
            tagAdd={createTag}
            studentInfo={child}
            key={index}
            studentIndex={index}
            tags={tagList}
          />
        );
      })}
    </section>
  );
};

export default StudentList;
