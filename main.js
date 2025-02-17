let turnoJugador = [];
let turnoMaquina = [];
let ronda = 0;

document.querySelector('button[type=button]').onclick = comenzarJuego;

actualizarEstado('Toca "Empezar" para jugar!');
actualizarNumeroRonda('-');
bloquearInputUsuario();

function comenzarJuego() {
    manejarRonda();
    actualizarEstado();
}

function reiniciarEstado() {
    turnoJugador = [];
    turnoMaquina = [];
    ronda = 0;
}

function manejarRonda() {
    actualizarEstado('Turno de la maquina');
    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    turnoMaquina.push($nuevoCuadro);

    const  retrasoTurnoJugador = (turnoMaquina.length + 1) * 1000;

    turnoMaquina.forEach(function($cuadro, index) {
        const retraso = (index + 1) * 1000;
        setTimeout(function(){
            resaltar($cuadro);
        }, retraso);
    });

    setTimeout(function() {
        actualizarEstado('Turno del jugador');
        desbloquearInputUsuario();
    }, retrasoTurnoJugador);

    turnoJugador = []; //porque en cada ronda el jugador tiene que hacerlo de nuevo
    ronda ++;
    actualizarNumeroRonda(ronda);
}    

function actualizarNumeroRonda(ronda) {
    document.querySelector('#ronda').textContent = ronda;
}

function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length); //numero entre 0 y 3 y redondeado para abajo
    return $cuadros[indice];
}

function actualizarEstado(estado, error = false) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
    if (error) {
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    } else {
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
        };
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
}

function manejarInputUsuario(e) {

    const $cuadro = e.target;
    resaltar($cuadro);
    turnoJugador.push($cuadro);

    const $cuadroMaquina = turnoMaquina[turnoJugador.length - 1];
    if ($cuadro.id !== $cuadroMaquina.id) {
        perder();
        return;
    }

    if (turnoJugador.length === turnoMaquina.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    }, 500);
}

function perder() {
    bloquearInputUsuario();
    reiniciarEstado();
    actualizarEstado('Perdiste! Tocá "Empezar" para jugar de nuevo!', true);
}
