let campoName;


document.addEventListener('DOMContentLoaded', async () => {
    const areaForm = document.getElementById('areaForm');
    Areas();
    areaForm.addEventListener('submit', async (event) => {
        event.preventDefault() ;
        
        const name = document.getElementById('name').value;
        const campoName = document.getElementById('name') ;
        const areaNew = await window.API.areaInsert(name);
        alert("Area agregado correctamente") ;
        campoName.value = '';
        campoName.focus();
        await Areas();
    })

});

const Areas = async () => {
    const areaTable = document.getElementById('areaList');
    
    try {
        areaTable.innerHTML = '';

        const areas = await window.API.areasAll(); 
        areas.forEach(area => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${area.name}</td>
                <td><button class="btn btn-secondary btn-sm" onclick="editArea('${area.id}')">
                    EDITAR 
                </button></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteArea('${area.id}')">
                    ELIMINAR
                </button></td>
                `;
            areaTable.appendChild(row);
        });
        const campoName = document.getElementById('name') ;
        campoName.focus();
    } catch (error) {
        console.error('Error al obtener areas:', error);
        // Manejar el error según sea necesario
    }
};


async function deleteArea(id) {
    // Preguntar al usuario si realmente desea eliminar el área
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta área?");
    // Si el usuario cancela, no hacemos nada
    if (!confirmDelete) {
        const name = document.getElementById('name').value;
        campoName.focus();
    }

    try {
        // Llamar al método para eliminar el área
        const result = await window.API.areaDeleted(id);
        // Mostrar mensaje de éxito
        console.log(result);
        alert("Área eliminada correctamente");
        await Areas() ;
        
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al eliminar el área:', error);
        alert("Error al eliminar el área");
    }
}