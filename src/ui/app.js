document.addEventListener('DOMContentLoaded', async () => {
    await Areas()
    await Users()
    const userForm = document.getElementById('userForm');
    
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault() ;
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const id_area = document.getElementById('id_area').value;
    
        // Crear el objeto dataUser con los valores obtenidos
        const dataUser = {
            name: name,
            email: email,
            password: password,
            role: role,
            id_area: id_area
        };
        console.log(dataUser)
    })

});


    


 const Areas = async () => {
    const areaDropdown = document.getElementById('id_area');
    areaDropdown.innerHTML = '';
    const response = await window.API.areasAll()
    response.forEach(element => {
        const option = document.createElement('option');
        option.text = element.name;
        option.value = element.id;
        areaDropdown.appendChild(option);
        });
  }

  const Users = async () => {
    const userTable = document.getElementById('userList');
    
    try {
        const users = await window.API.usersAll(); 
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user['area.name']}</td> <!-- Si ya tienes el nombre del área, puedes usarlo directamente -->
            `;
            userTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        // Manejar el error según sea necesario
    }
};