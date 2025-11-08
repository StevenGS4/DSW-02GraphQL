// cliente.js

const API_URL = "http://localhost:4000/"; // URL del servidor GraphQL

// Función genérica para hacer peticiones GraphQL
async function graphqlRequest(query, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  return data.data; // devuelve solo los datos del servidor
}

// === 1. Obtener todos los usuarios ===
async function getAllUsers() {
  const query = `
    query {
      getAllUsers {
        id
        name
        email
        age
      }
    }
  `;
  const data = await graphqlRequest(query);
  console.log("Todos los usuarios:", data.getAllUsers);
}

// === 2. Obtener usuario por ID ===
async function getUserById(id) {
  const query = `
    query($id: ID!) {
      getUserById(id: $id) {
        id
        name
        email
        age
      }
    }
  `;
  const variables = { id };
  const data = await graphqlRequest(query, variables);
  console.log("Usuario encontrado:", data.getUserById);
}

// === 3. Crear un nuevo usuario ===
async function createUser(name, email, age) {
  const mutation = `
    mutation($name: String!, $email: String!, $age: Int) {
      createUser(name: $name, email: $email, age: $age) {
        id
        name
        email
        age
      }
    }
  `;
  const variables = { name, email, age };
  const data = await graphqlRequest(mutation, variables);
  console.log("Usuario creado:", data.createUser);
}

// === Ejecutar pruebas ===
(async () => {
  await getAllUsers();
  await getUserById("1");
  await createUser("Charlie", "charlie@example.com", 22);
  await getAllUsers();
})();
