import {useState} from 'react';
import plus from '../images/plus.png';
import minus from '../images/minus.png';

const Student = ({ tagAdd, studentInfo, studentIndex, tags }) => {

  //Destructuring Each Student's Info
  const {company, email, firstName, grades, lastName, pic, skill, id} = studentInfo;

  //Grades List State hook
  const [showGrades, setShowGrades] = useState(false);

  //On Click Set State function for grades button
  const gradesPress = () => {
    setShowGrades(!showGrades);
  }

  //Enter Tag On Key Down Attribute Function
  const enterTag = (event) => {
    if (event.code === 'Enter' && (event.target.value.length > 0 && !(/^\s+$/.test(event.target.value)))) {
      const entry = event.target.value;
      tagAdd(entry, id);
      event.target.value = '';
    }
  }

  //Solving for Average from Grades and Formatting it
  let avg = grades.reduce((a, b) => a + b) / grades.length;
  avg = avg.toString().slice(0,2).concat('.').concat(avg.toString().slice(3,6)).concat('%');

  return (
    <section className='profile-layout'>
      <div className='left-column'>
        <div className='profile-pic-container'>
          <img className='profile-pic' alt='Student Face' src={pic} />
        </div>
      </div>
      <section className='profile-wrapper'>
        <div className='profile-header'>
          <h2 className='profile-name'>{firstName.toUpperCase()} {lastName.toUpperCase()}</h2>
          <img onClick={gradesPress} className={`${showGrades ? 'minus' : 'plus'}`} alt='plus/minus sign' src={`${showGrades ? minus : plus}`} />
        </div>
        <section className='details-wrapper'>
          <section className='misc-details'>
            <div>Email: {email}</div>
            <div>Company: {company}</div>
            <div>Skill: {skill}</div>
            <div>Average: {avg}</div>
          </section>
          <section style={{paddingBottom: `${showGrades ? 1 + 'rem' : 0}`}} className='grade-list'>
            {showGrades ? grades.map((grade, index) => {
              return <div key={index}>Test {index + 1}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {grade}%</div>
            }) : ''}
          </section>
          <section className='tag-wrapper'>
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              {tags?.map((tag, index) => {
                if (tag[0] === (parseFloat(id) - 1)) {
                  return <div key={index} className='tag'>{tag[1]}</div>
                } else {
                  return ''
                }
              })}
            </div>
            <input className='tag-input' onKeyUp={enterTag} placeholder='Add a tag' />
          </section>
        </section>
      </section>
    </section>
  );
};

export default Student;