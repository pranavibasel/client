import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', category: '', subcategory: '', description: '', curriculum: '', imageUrl: '', price: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const categories = ['Web Development', 'Gaming Development', 'Backend Development', 'Cloud Computing', 'Software Engineering'];

  // Define the subcategories for each category
  const subcategories = {
    'Web Development': ['HTML', 'CSS', 'JavaScript', 'React'],
    'Gaming Development': ['Unity', 'Unreal Engine', 'Game Design', 'C#'],
    'Backend Development': ['Node.js', 'Express', 'MongoDB', 'SQL'],
    'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'Docker'],
    'Software Engineering': ['Agile', 'Scrum', 'Software Design', 'Testing']
  };

  // Handle category change and update subcategory options
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setNewCourse({ ...newCourse, category: selectedCategory, subcategory: '' }); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrUpdateCourse = () => {
    if (editingIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[editingIndex] = newCourse;
      setCourses(updatedCourses);
      setEditingIndex(null);
    } else {
      setCourses([...courses, newCourse]);
    }
    setNewCourse({ title: '', category: '', subcategory: '', description: '', curriculum: '', imageUrl: '', price: '' });
  };

  const handleEditCourse = (index) => {
    setNewCourse(courses[index]);
    setEditingIndex(index);
  };

  const handleRemoveCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Course Management</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="#">Web Development</a></li>
                  <li><a className="dropdown-item" href="#">Gaming Development</a></li>
                  <li><a className="dropdown-item" href="#">Backend Development</a></li>
                  <li><a className="dropdown-item" href="#">Cloud Computing</a></li>
                  <li><a className="dropdown-item" href="#">Software Engineering</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="mb-4">Course Management</h2>

        {/* Add/Update Form */}
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editingIndex !== null ? 'Edit Course' : 'Add Course'}</h5>
            <div className="mb-3">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={newCourse.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={newCourse.category}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Subcategory</label>
              <select
                className="form-select"
                name="subcategory"
                value={newCourse.subcategory}
                onChange={handleSubcategoryChange}
                disabled={!newCourse.category} // Disable subcategory if no category is selected
              >
                <option value="">Select a subcategory</option>
                {newCourse.category && subcategories[newCourse.category]?.map((subcat, index) => (
                  <option key={index} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Curriculum</label>
              <textarea
                className="form-control"
                name="curriculum"
                value={newCourse.curriculum}
                onChange={handleInputChange}
                placeholder="Enter course curriculum"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={newCourse.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                name="price"
                value={newCourse.price}
                onChange={handleInputChange}
                placeholder="Enter course price"
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddOrUpdateCourse}>
              {editingIndex !== null ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </div>

        {/* Course List */}
        <h5>Course List</h5>
        {courses.length > 0 ? (
          <div className="row">
            {courses.map((course, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4">
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text"><strong>Category:</strong> {course.category}</p>
                    <p className="card-text"><strong>Subcategory:</strong> {course.subcategory}</p>
                    <p className="card-text"><strong>Description:</strong> {course.description}</p>
                    <p className="card-text"><strong>Curriculum:</strong> {course.curriculum}</p>
                    <p className="card-text"><strong>Price:</strong> ${course.price}</p>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => handleEditCourse(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveCourse(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses available. Please add a course.</p>
        )}
      </div>
    </div>
  );
}

export default CourseManagement;