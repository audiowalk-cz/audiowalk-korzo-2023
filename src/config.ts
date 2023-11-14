const productionHostnames = ["studentskarevolta89.cz", "www.studentskarevolta89.cz"];
const developmentHostnames = ["localhost", "preview.studentskarevolta89.cz"];

export const config = {
  production: productionHostnames.includes(window.location.hostname),
  development: developmentHostnames.includes(window.location.hostname),
};
