const productionHostnames = ["studentskarevolta89.cz", "www.studentskarevolta89.cz"];

export const config = {
  production: productionHostnames.includes(window.location.hostname),
};
