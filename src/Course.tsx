import { useState, useEffect, useContext } from "preact/hooks";
// import { createContext } from "preact";

// TODO: separate all types into a separate file

type CourseType = {
  uuid: string;
  title?: string;
  description?: string;
  contents?: Array<{
    uuid: string;
    title: string;
    description: string;
    type: "assessment" | "folder";
  }>;
};

export function Course() {
  const [course, setCourse] = useState({
    uuid: "2d349668-9273-4dcd-aac1-35abcade9eb2",
	contents: [],
  } as CourseType);

  console.log("Course component rendered");

  // Fetch data for this course
  // TODO: maybe use useEffect dependent on course? or just pass as prop
  useEffect(() => {
    console.log("Fetching course data for UUID:", course.uuid);
    fetch("http://localhost:3001/api/course/" + course.uuid)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error("Failed to fetch course:", err));
  }, []);
  if (!course) {
    return <div>Loading course...</div>;
  }

  return (
    <div class="course-container">
      <h1>{course.title ?? "Course Title"}</h1>
      <p>{course.description}</p>
      <ul class="course-contents">
        {course.contents.map((item, index) => {
          // TODO: add more item types
          // TODO: make folders expandable, using a separate api call
          return (
            <li key={index} class="course-item">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.type === "assessment" && (
                <a
                  href={`/course/${course.uuid}/assessment/${item.uuid}`}
                  class="course-link"
                >
                  Take Assessment
                </a>
              )}
              {item.type === "folder" && (
                <a
                  href={`/course/${course.uuid}/folder/${item.uuid}`}
                  class="course-link"
                >
                  View Folder
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
