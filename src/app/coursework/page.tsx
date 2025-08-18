import React from 'react';

const CourseworkPage = () => {
  const courseCategories = [
    {
      name: 'Mathematics & Statistics',
      courses: [
        { id: 1, number: 'MAS 10009', title: 'Introduction to Linear Algebra' },
        { id: 2, number: 'MAS 10001', title: 'Calculus I' },
        { id: 3, number: 'MAS 20050', title: 'Probability and Statistics' },
        { id: 4, number: 'IE 20041', title: 'Engineering Statistics I' },
        { id: 5, number: 'IE 20032', title: 'Stochastic Models' },
        { id: 6, number: 'BCS 30003', title: 'Statistics for BCS' },
      ],
    },
    {
      name: 'Computer Science / Data Science',
      courses: [
        { id: 7, number: 'CS 30706', title: 'Machine Learning' },
        { id: 8, number: 'CS 49900', title: 'Diffusion and Flow Models' },
        { id: 9, number: 'IE 20061', title: 'Data Science for Industrial Engineering' },
        { id: 10, number: 'CS 20006', title: 'Data Structures' },
        { id: 11, number: 'IE 30043', title: 'Statistical Machine Learning' },
        { id: 12, number: 'CS 20004', title: 'Discrete Mathematics' },
        { id: 13, number: 'CS 10001', title: 'Introduction to Programming' },
      ],
    },
    {
      name: 'Neuroscience / Brain & Cognitive Sciences',
      courses: [
        { id: 14, number: 'BCS 40041', title: 'How AI and the Brain Work' },
        { id: 15, number: 'BCS 40010', title: 'Data Analysis and Modeling Lab' },
        { id: 16, number: 'BiS 35001', title: 'Bio-Signal Processing' },
        { id: 17, number: 'BCS 30004', title: 'Theoretical Neuroscience' },
        { id: 18, number: 'BCS 20002', title: 'Systems Neuroscience' },
        { id: 19, number: 'BCS 20021', title: 'Cognitive Neuroscience' },
        { id: 20, number: 'BCS 20001', title: 'Biology of Neurons' },
        { id: 21, number: 'BCS 30041', title: 'Methods in Brain and Cognitive Sciences' },
        { id: 22, number: 'BCS 30020', title: 'Laboratory in Human Brain Anatomy and Physiology' },
        { id: 23, number: 'BCS 20000', title: 'Laboratory in Animal Brain Anatomy and Physiology' },
      ],
    },
    {
      name: 'Electrical Engineering / Physics / Aerospace',
      courses: [
        { id: 24, number: 'EE 20002', title: 'Signals and Systems' },
        { id: 25, number: 'PH 10041', title: 'General Physics I' },
        { id: 26, number: 'PH 10042', title: 'General Physics II' },
        { id: 27, number: 'AE 10000', title: 'Sky and Space' },
      ],
    },
  ];

  return (
    <div className="container mx-auto mt-5 p-4 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12">Courses (Spring 2022 – Current)</h1>
      
      <div className="space-y-12">
        {courseCategories.map((category, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {category.name}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.courses.map((course) => (
                <li 
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{course.number}</span>
                    <span>: </span>
                    <span>{course.title}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CourseworkPage;
