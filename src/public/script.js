$(document).ready(function () {
    // Obtener todos los usuarios y mostrarlos en la tabla
    $.get('/api/users', function (users) {
        users.forEach(function (user) {
            addUserToTable(user);
        });
    });

    // Manejar el envío del formulario para crear un nuevo usuario
    $('#create-form').submit(function (event) {
        event.preventDefault();
        var name = $('#name-input').val();
        var email = $('#email-input').val();
        $.post('/api/users', { name: name, email: email }, function (newUser) {
            addUserToTable(newUser);
            $('#name-input').val('');
            $('#email-input').val('');
        });
    });

    // Función para agregar un usuario a la tabla
    function addUserToTable(user) {
        var row = '<tr data-id="' + user.id + '">' +
            '<td>' + user.id + '</td>' +
            '<td>' + user.name + '</td>' +
            '<td>' + user.email + '</td>' +
            '<td>' +
            '<button class="edit-button">Editar</button> ' +
            '<button class="delete-button">Eliminar</button>' +
            '</td>' +
            '</tr>';
        $('#users-table-body').append(row);
    }

    // Manejar el clic en el botón "Editar"
    $(document).on('click', '.edit-button', function () {
        var row = $(this).closest('tr');
        var id = row.data('id');
        var name = row.find('td:nth-child(2)').text();
        var email = row.find('td:nth-child(3)').text();
        $('#edit-name-input').val(name);
        $('#edit-email-input').val(email);
        $('#edit-form').attr('data-id', id).show();
    });

    // Manejar el envío del formulario para editar un usuario
    $('#edit-form').submit(function (event) {
        event.preventDefault();
        var id = $(this).data('id');
        var name = $('#edit-name-input').val();
        var email = $('#edit-email-input').val();
        $.ajax({
            url: '/api/users/' + id,
            method: 'PUT',
            data: { name: name, email: email },
            success: function (updatedUser) {
                var row = $('tr[data-id="' + id + '"]');
                row.find('td:nth-child(2)').text(updatedUser.name);
                row.find('td:nth-child(3)').text(updatedUser.email);
                $('#edit-form').hide();
            }
        });
    });

    // Manejar el clic en el botón "Cancelar" del formulario de edición
    $('#cancel-edit-button').click(function () {
        $('#edit-form').hide();
    });

    // Manejar el clic en el botón "Eliminar"
    $(document).on('click', '.delete-button', function () {
        var row = $(this).closest('tr');
        var id = row.data('id');
        $.ajax({
            url: '/api/users/' + id,
            method: 'DELETE',
            success: function (deletedUser) {
                row.remove();
            }
        });
    });
});
