import { useState, useEffect } from "react";
import "./style.css";
import img from "../assets/logo.jpeg";
import coxinha from "../assets/coxinha.png";
import pxtrick from "../assets/pxtrick.jpg";
import passaFome from "../assets/passafome.jpg";
import vasco from "../assets/vasco.png";
import romulo from "../assets/romulo.jpg";
import felipe from "../assets/felipe.jpg";
import Teclado from "./Teclado";

export default function TelaInicial() {

    let candidatos = [
        {
            'nome': 'Lucas',
            'partido': 'Partido da Coxinha',
            'cargo': 'senador',
            'numero': '1234',
            'imagem': coxinha,
            'votos': 0
        },
        {
            'nome': 'Pxtrick',
            'partido': 'Partido de Todes ',
            'cargo': 'senador',
            'numero': '2345',
            'imagem': pxtrick,
            'votos' : 0
        },
        {
            'nome': 'Rodrigo',
            'partido': 'Partido do Passa Fome',
            'cargo': 'senador',
            'numero': '1008',
            'imagem': passaFome,
            'votos' : 0
        },
        {
            'nome': 'Rômulo',
            'partido': 'Partido da Linguiça',
            'cargo': 'senador',
            'numero': '2455',
            'imagem': romulo,
            'votos' : 0
        },

        {
            'nome': 'Felipe !Schimit',
            'partido': 'Partido doce de Paçoca',
            'cargo': 'senador',
            'numero': '5368',
            'imagem': felipe,
            'votos' : 0
        }
    ]

    const [digito1, setDigito1] = useState('');
    const [digito2, setDigito2] = useState('');
    const [digito3, setDigito3] = useState('');
    const [digito4, setDigito4] = useState('');
    const [contador, setContador] = useState(1);
    const [rodape, setRodape] = useState('');
    const [votos, setVotos] = useState(true);
    const [votoNulo, setVotoNulo] = useState(0);
    // const [nulo, setNulo] = useState(true);
    const [votoCandidato, setVotoCandidato] = useState(0);
    const [candidatoDigitado, setCandidatoDigitado] = useState(
        {
            'nome': '',
            'partido': '',
            'cargo': 'senador',
            'numero': '',
            'imagem': vasco
        }
    );
    const [votosInvalidos, setVotosInvalidos] = useState(
        {
            'votos_nulos': 0,
            'votos_brancos': 0
        }
    );

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
        let nulo = true;

        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                setCandidatoDigitado(candidatos[i]);
                nulo=false;
                break;
            }
        }
        if (nulo && (numero !== '')){
            setRodape('Nulo')
        }
    }

    function aoCorrigir() {
        setDigito1('');
        setDigito2('');
        setDigito3('');
        setDigito4('');
        setRodape('');
        setCandidatoDigitado({
            'nome': '',
            'partido': '',
            'cargo': 'senador',
            'numero': '',
            'imagem': vasco
        })
        setContador(1);
    }
    function aoConfirmar() {

        console.log ("teste")
        let numero = `${digito1}${digito2}${digito3}${digito4}`;

        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                setCandidatoDigitado(candidatos[i]);
            break;
            }
            setVotos(votos +1);
            aoCorrigir();
        }

    }



    function votoBranco() {
        console.log("Voto em branco chamado")
        return (
            <div className="votoBranco">
                <h1>Deseja votar em branco? </h1>
                <button className="botaoSim" onClick={() => setVotoNulo(votoNulo + 1)}>
                    Sim
                </button>
                <button className="botaoNao" onClick={aoCorrigir}>
                    Não
                </button>
            </div>
        );
    }
    function infoSenadores() {
        let senadoresList = [];
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].cargo === 'senador') {
                senadoresList.push(`${candidatos[i].nome} (${candidatos[i].numero})`);
            }
        }
        return (
            senadoresList.join(', ')
        );
    }

    useEffect(() => {
        verificaCandidato();
    }, [digito4]);

    return (


        <div className="urna">


            <div className="tela">

                <div className="infos">
                    <h1 className="cargo">Senadores</h1>
                    <h1 className="cola">Candidatos: {infoSenadores()}</h1>

                    {/* <h3 className="infos_cargo">{candidatoDigitado.cargo}</h3> */}

                    <section className="digito">

                        <div className="numero">
                            <h4>Número: </h4>
                        </div>

                        <p className='input'>{digito1}</p>
                        <p className='input'>{digito2}</p>
                        <p className='input'>{digito3}</p>
                        <p className='input'>{digito4}</p>

                    </section>
                    <h4>Nome: {candidatoDigitado.nome}</h4>
                    <h4>Partido: {candidatoDigitado.partido}</h4>
                    <h5 className="rodape">{rodape}</h5>
                </div>
                <div className="imagens">
                    <img src={candidatoDigitado.imagem}></img>
                </div>
            </div>

            <div className="tituloTeclado">
                <div className="titulo">
                    <img src={img}></img>
                    <p>Injustiça Eleitoral </p>
                </div>
                <Teclado
                    onClick={aoClicar}
                    aoCorrigir={aoCorrigir}
                    aoConfirmar={aoConfirmar}
                    votoNullo={votoBranco}
                />



            </div>
        </div>

    );

}

