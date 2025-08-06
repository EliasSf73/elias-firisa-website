import React from 'react';

const coursework = [
  // Completed Courses - A curated list from the transcript, prioritized by relevance
  {
    id: 3, number: 'MAS 10009', title: 'Introduction to Linear Algebra', status: 'completed'
  },
  {
    id: 4, number: 'CS 30706', title: 'Machine Learning', status: 'completed'
  },
  {
    id: 5, number: 'IE 20041', title: 'Engineering Statistics I', status: 'completed'
  },
  {
    id: 6, number: 'IE 30043', title: 'Statistical Machine Learning', status: 'completed'
  },
  {
    id: 7, number: 'MAS 20050', title: 'Probability and Statistics', status: 'completed'
  },
  {
    id: 8, number: 'IE 20061', title: 'Introduction to Data Science for IE', status: 'completed'
  },
  {
    id: 9, number: 'BCS 40041', title: 'How AI and the Brain Work', status: 'completed'
  },
  {
    id: 10, number: 'EE 20002', title: 'Signals and Systems', status: 'completed'
  },
  {
    id: 11, number: 'BCS 40010', title: 'Data Analysis and Modeling Lab', status: 'completed'
  },
  {
    id: 12, number: 'BiS 35001', title: 'Bio-Signal Processing', status: 'completed'
  },
  {
    id: 13, number: 'CS 20006', title: 'Data Structure', status: 'completed'
  },
  {
    id: 14, number: 'CS 20004', title: 'Discrete Mathematics', status: 'completed'
  },
  {
    id: 16, number: 'BCS 30004', title: 'Theoretical Neuroscience', status: 'completed'
  },
  {
    id: 18, number: 'BCS 20002', title: 'Systems Neuroscience', status: 'completed'
  },
  {
    id: 19, number: 'BCS 20021', title: 'Cognitive Neuroscience', status: 'completed'
  },
  {
    id: 20, number: 'BCS 20001', title: 'Biology of Neurons', status: 'completed'
  },
  {
    id: 21, number: 'BCS 30041', title: 'Methods in Brain and Cognitive Sciences', status: 'completed'
  },
  {
    id: 22, number: 'CS 10001', title: 'Introduction to Programming', status: 'completed'
  },
  {
    id: 23, number: 'MAS 10001', title: 'Calculus I', status: 'completed'
  },
  {
    id: 24, number: 'PH 10041', title: 'General Physics I', status: 'completed'
  },
  {
    id: 25, number: 'PH 10042', title: 'General Physics II', status: 'completed'
  },
  {
    id: 26, number: 'AE 10000', title: 'Sky and Space', status: 'completed'
  },
  {
    id: 27, number: 'BCS 30020', title: 'Laboratory in Human Brain Anatomy and Physiology', status: 'completed'
  }
];

const CourseworkPage = () => {
  const currentCourses = coursework.filter(course => course.status === 'current');
  const completedCourses = coursework.filter(course => course.status === 'completed');

  return (
    <div className="container mx-auto mt-5 p-4 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12">Coursework</h1>

      {/* Current Courses Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-700 pb-2">Current Courses: Fall 2025</h2>
        <div>
          <p className="text-gray-400 italic">Courses for Fall 2025 will be updated here soon.</p>
        </div>
      </section>

      {/* Completed Courses Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-700 pb-2">Completed Courses: Spring 2022- Spring 2025</h2>
        <div className="grid grid-cols-2 gap-4">
          {completedCourses.map(course => (
            <div key={course.id} className="bg-gray-800 text-white rounded-lg shadow-md p-4">
              <p><span className="font-semibold">{course.number}:</span> {course.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseworkPage;
