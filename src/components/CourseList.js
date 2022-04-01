import React, { useState } from 'react';
import { terms, getCourseTerm, } from '../utilities/times.js'
import Course from './Course.js';
import { signInWithGoogle,  signOut, useUserState } from '../utilities/firebase.js';


const scheduleChanged = (selected, courses) => (
  selected.some(course => course !== courses[course.id])
);


const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);

    if (scheduleChanged(selected, courses)) {
      setSelected([])
    }

    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course))
  
    return(
    <>
      <TermSelector setTerm={setTerm} />
      <div className="course-list" term={term}>
      { termCourses.map(course => <Course key={course.id} course={ course } 
        selected={selected} setSelected = { setSelected }/>) }
      </div>
      </>
    )
  };

  const SignInButton = () => (
    <button className='btn btn-secondary btn-sm'
      onClick={() => signInWithGoogle()}>
        Sign In
      </button>
  )

  const SignOutButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signOut()}>
      Sign Out
    </button>
  );

  const TermSelector = ({term, setTerm}) => {
    const [user] = useUserState();
    return(
    <div className='btn-toolbar justify-content-between'>
    <div className="btn-group">
    { 
      Object.values(terms)
        .map(value  => ( <TermButton key={value} term={value} checked={value === term} setTerm={setTerm}/>))
    }
    </div>
     {user ? <SignOutButton/> : <SignInButton/> }
    </div>
    )
  };
  
  const TermButton = ({term, checked, setTerm}) => (
    <>
      <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked}
        onChange={ () => setTerm(term) }/>
      <label class="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
      </label>
    </>
  );
  

export default CourseList;