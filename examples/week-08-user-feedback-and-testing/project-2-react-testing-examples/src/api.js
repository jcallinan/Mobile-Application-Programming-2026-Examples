export async function fetchInstructorName() {
  const response = await fetch('https://example.com/instructor');
  const data = await response.json();
  return data.name;
}
