document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form');
    const listaCursos = document.getElementById('courses');
    const inputNombreCurso = document.getElementById('course-name');
    const inputDescripcionCurso = document.getElementById('course-description');
    const inputIdCurso = document.getElementById('course-id');

    let cursos = [];
    let indiceEditando = -1;

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombreCurso = inputNombreCurso.value.trim();
        const descripcionCurso = inputDescripcionCurso.value.trim();

        if (nombreCurso && descripcionCurso) {
            if (indiceEditando >= 0) {
                // Editar curso
                cursos[indiceEditando] = { nombre: nombreCurso, descripcion: descripcionCurso };
                indiceEditando = -1;
            } else {
                // Agregar nuevo curso
                cursos.push({ nombre: nombreCurso, descripcion: descripcionCurso });
            }

            inputNombreCurso.value = '';
            inputDescripcionCurso.value = '';
            renderizarCursos();
        }
    });

    function renderizarCursos() {
        listaCursos.innerHTML = '';
        cursos.forEach((curso, indice) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${curso.nombre}</strong>
                <p>${curso.descripcion}</p>
                <button onclick="editarCurso(${indice})">Editar</button>
                <button onclick="eliminarCurso(${indice})">Eliminar</button>
            `;
            listaCursos.appendChild(li);
        });
    }

    window.editarCurso = (indice) => {
        const curso = cursos[indice];
        inputNombreCurso.value = curso.nombre;
        inputDescripcionCurso.value = curso.descripcion;
        inputIdCurso.value = indice;
        indiceEditando = indice;
    };

    window.eliminarCurso = (indice) => {
        cursos.splice(indice, 1);
        renderizarCursos();
    };
});