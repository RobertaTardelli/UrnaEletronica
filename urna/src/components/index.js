import { useState, useEffect } from "react";
import "./style.css";
import img from "../assets/logo.jpeg";
import coxinha from "../assets/coxinha.png";
import pxtrick from "../assets/pxtrick.jpeg";
import passaFome from "../assets/passafome.jpg";
import Teclado from "./Teclado";

export default function TelaInicial() {

    let candidatos = [
        {
            'nome': 'Coxinha',
            'partido': 'Partido do Lucas',
            'cargo': 'senador',
            'numero': '1234',
            'imagem': coxinha
        },
        {
            'nome': 'Pxtrick',
            'partido': 'Partido de Todes ',
            'cargo': 'senador',
            'numero': '2345',
            'imagem': pxtrick
        },
        {
            'nome': 'Rodrigo',
            'partido': 'Partido do Passa Fome',
            'cargo': 'senador',
            'numero': '1008',
            'imagem': passaFome
        },
        {
            'nome': 'Arthur',
            'partido': 'Partido do Arthur',
            'cargo': 'senador',
            'numero': '2455',
            'imagem': null
        },

        {
            'nome': 'Arthur',
            'partido': 'Partido do Arthur',
            'cargo': 'senador',
            'numero': '5368',
            'imagem': null
        }
    ]

    const [digito1, setDigito1] = useState('');
    const [digito2, setDigito2] = useState('');
    const [digito3, setDigito3] = useState('');
    const [digito4, setDigito4] = useState('');
    const [contador, setContador] = useState(1);
    const [votoNulo, setVotoNulo] = useState(0);
    const [votoCandidato, setVotoCandidato] = useState(0);
    const [confirmaVoto, setConfirmaVoto] = useState(' ');
    const [candidatoDigitado, setCandidatoDigitado] = useState(
        {
            'nome': '',
            'partido': '',
            'cargo': 'senador',
            'numero': '',
            'imagem': ''
        }
    );
    const [imagem, setImagem] = useState(null);


    function aoClicar(digito) {
        if (contador == 1) {
            setDigito1(digito);
            setContador(contador + 1);
        }
        if (contador == 2) {
            setDigito2(digito);
            setContador(contador + 1);
        }
        if (contador == 3) {
            setDigito3(digito);
            setContador(contador + 1);
        }
        if (contador == 4) {
            setDigito4(digito);
            setContador(contador + 1);
        }
    }
    function verificaCandidato() {
        let numero = `${digito1}${digito2}${digito3}${digito4}`;
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                setCandidatoDigitado(candidatos[i]);
            } else {
                setVotoNulo(votoNulo + 1);
            }

        }
    }

    function confirmar() {
        let voto;
        let numero = `${digito1}${digito2}${digito3}${digito4}`;
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                setVotoCandidato(votoCandidato[i] + 1);
                voto = true;

                if (voto == true) {
                    return (
                    <h1>Você votou no candidato {votoCandidato[i]} {aoCorrigir()}</h1>
                    );
                   

                } else if (candidatos[i].numero != numero) {
                    voto = false;
                    return (
                    <h1>Esse candidato não existe, deseja votar em branco?
                        <button className="botaoSim" onClick={setVotoNulo(votoNulo + 1)}> {aoCorrigir}
                            Sim
                        </button>
                        <button className="botaoNao" onClick={aoCorrigir}>
                            Não
                        </button>
                    </h1>
                    );
                }
            }
        }
    }

    function votoBranco() {
    
        return (
            <h1>Deseja votar em branco?
                <button className="botaoSim" onClick={setVotoNulo(votoNulo + 1)}> {aoCorrigir}
                    Sim
                </button>
                <button className="botaoNao" onClick={aoCorrigir}>
                    Não
                </button>
            </h1>
            
        );
    }

    function aoCorrigir() {
        setDigito1('');
        setDigito2('');
        setDigito3('');
        setDigito4('');
        setCandidatoDigitado({
            'nome': '',
            'partido': '',
            'cargo': 'senador',
            'numero': '',
            'imagem': ''
        })
        setContador(1);
    }

    useEffect(() => {
        verificaCandidato();
    }, [digito4]);

    return (
        <div class="urna">


            <div class="tela">
                <div className="infos">
                    <h3 className="infos_cargo">{candidatoDigitado.cargo}</h3>

                    <section class="digito">

                        <div class="numero">
                            <h4>Número: </h4>
                        </div>

                        <p className='input'>{digito1}</p>
                        <p className='input'>{digito2}</p>
                        <p className='input'>{digito3}</p>
                        <p className='input'>{digito4}</p>

                    </section>
                    <h4>Nome: {candidatoDigitado.nome}</h4>
                    <h4>Partido: {candidatoDigitado.partido}</h4>
                </div>
                <div className="imagens">
                    <img src={candidatoDigitado.imagem}></img>
                </div>
            </div>

            <div className="tituloTeclado">
                <div className="titulo">
                    <img src={img}></img>
                    <h1>Injustiça Eleitoral </h1>
                </div>
                <Teclado
                    onClick={aoClicar}
                    aoCorrigir={aoCorrigir}
                    aoConfirmar={confirmar}
                    votoNullo={votoBranco}
                />



            </div>
        </div>

    );

}

