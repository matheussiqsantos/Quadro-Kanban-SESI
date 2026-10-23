document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task-card');
    const taskLists = document.querySelectorAll('.task-list');

    // 1. Configura os eventos nos cards reutilizáveis
    tasks.forEach(task => {
        task.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id);
            setTimeout(() => task.classList.add('dragging'), 0);
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });
    });

    // 2. Configura os eventos nas zonas de soltura (listas das colunas)
    taskLists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            list.classList.add('drag-over');
        });

        list.addEventListener('dragleave', () => {
            list.classList.remove('drag-over');
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            list.classList.remove('drag-over');

            const id = e.dataTransfer.getData('text/plain');
            const draggedTask = document.getElementById(id);

            if (draggedTask) {
                list.appendChild(draggedTask);
                atualizarContadores();
            }
        });
    });

    // 3. Atualiza a contagem dos badges no topo das caixas
    function atualizarContadores() {
        document.querySelectorAll('.kanban-column').forEach(column => {
            const count = column.querySelectorAll('.task-card').length;
            const badge = column.querySelector('.badge');
            if (badge) {
                badge.textContent = count;
            }
        });
    }
});