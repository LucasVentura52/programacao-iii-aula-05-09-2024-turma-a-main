function showAlert(type, title, message) {
    const alertContainer = document.getElementById('alert-container');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');

    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertTitle.textContent = title;
    alertMessage.textContent = message;

    alertContainer.classList.add('show');

    setTimeout(function () {
        alertContainer.classList.remove('show');
    }, 2000);
}

function post() {
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const documento = document.getElementById("documento").value;

    if (nome === "" || sobrenome === "" || documento === "") {
        showAlert('danger', 'Erro!', 'Todos os campos são obrigatórios.');
        return;
    }

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:8091/cliente", true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-Type", "application/json");

    let cliente = {
        nome: nome,
        sobrenome: sobrenome,
        documento: documento
    };

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                showAlert('success', 'Sucesso!', 'Cliente cadastrado com sucesso.');

                document.getElementById("nome").value = "";
                document.getElementById("sobrenome").value = "";
                document.getElementById("documento").value = "";
            } else {
                showAlert('danger', 'Erro!', + xhttp.responseText + ' ao tentar cadastrar um cliente.');
            }
        }
    };

    xhttp.send(JSON.stringify(cliente));
}

function get() {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:8091/cliente", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let lista = JSON.parse(xhttp.responseText);
            let tabela = document.getElementById("clientes");

            tabela.innerHTML = "";

            for (let i = 0; i < lista.length; i++) {
                let cliente = lista[i];
                let linha = document.createElement("tr");

                let celulaId = document.createElement("td");
                celulaId.textContent = cliente.id;

                let celulaNome = document.createElement("td");
                celulaNome.textContent = cliente.nome;

                let celulaSobrenome = document.createElement("td");
                celulaSobrenome.textContent = cliente.sobrenome;

                let celulaDocumento = document.createElement("td");
                celulaDocumento.textContent = cliente.documento;

                linha.appendChild(celulaId);
                linha.appendChild(celulaNome);
                linha.appendChild(celulaSobrenome);
                linha.appendChild(celulaDocumento);

                tabela.appendChild(linha);
            }
        } else {
            showAlert('danger', 'Erro!', 'Erro ao carregar clientes: ' + xhttp.responseText);
        }
    };

    xhttp.send();
}
