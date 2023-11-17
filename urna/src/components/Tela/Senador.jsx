import { useState, useEffect, useRef } from "react";
import "./style.css";
import img from "../../assets/logo.jpeg";
import coxinha from "../../assets/coxinha.png";
import pxtrick from "../../assets/pxtrick.jpg";
import passaFome from "../../assets/passafome.jpg";
import vasco from "../../assets/vasco.png";
import romulo from "../../assets/romulo.jpg";
import felipe from "../../assets/felipe.jpg";
import audioTeclas from "../../audio/audioTeclas.mp3";
import audioTeclaConfirma from "../../audio/audioTeclaConfirma.mp3";
import Teclado from "../Teclado";


export default function TelaSenador() {


    const teclas = useRef(audioTeclas);

    const confirma = useRef(audioTeclaConfirma);

    const [candidatos, setCandidatos] = useState([
        {
            'nome': 'Lucas Coxinha',
            'partido': 'Partido dos Salgados',
            'cargo': 'Senador',
            'numero': '123',
            'imagem': coxinha,
            'votos': 0
        },
        {
            'nome': 'Pxtrick do Felipe ',
            'partido': 'Partido !Schimit ',
            'cargo': 'Senador',
            'numero': '479',
            'imagem': pxtrick,
            'votos': 0
        },
        {
            'nome': 'Rodrigo',
            'partido': 'Partido do Passa Fome',
            'cargo': 'Senador',
            'numero': '520',
            'imagem': passaFome,
            'votos': 0
        },
        {
            'nome': 'Rômulo',
            'partido': 'Partido da Linguiça',
            'cargo': 'Senador',
            'numero': '210',
            'imagem': romulo,
            'votos': 0
        },

        {
            'nome': 'Felipe !Schimit',
            'partido': 'Partido doce de Paçoca',
            'cargo': 'Senador',
            'numero': '142',
            'imagem': felipe,
            'votos': 0
        }
    ])
    const teclasRefTeclado = useRef(new Audio(audioTeclas));
    const teclasRefConfirma = useRef(new Audio(audioTeclaConfirma));
    const [digito1, setDigito1] = useState('');
    const [digito2, setDigito2] = useState('');
    const [digito3, setDigito3] = useState('');
    const [contador, setContador] = useState(1);
    const [rodape, setRodape] = useState('');
    const [votos, setVotos] = useState(true);
    const [branco, setBranco] = useState(0);
    const [apura, setApura] = useState(' ');
    const [candidatoDigitado, setCandidatoDigitado] = useState(
        {
            'nome': '',
            'partido': '',
            'cargo': 'Senador',
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
    function audioTeclado() {
        if (contador === 1 || contador === 2 || contador === 3) {
            teclasRefTeclado.current.currentTime = 0;
            teclasRefTeclado.current.play();
        }
    }

    function audioConfirma() {
        if (aoConfirmar) {
            teclasRefConfirma.current.currentTime = 0;
            teclasRefConfirma.current.play();
        }

    }

    function aoClicar(digito) {
        if (contador == 1) {
            setDigito1(digito);
            setContador(contador + 1);
            audioTeclado()
        }
        if (contador == 2) {
            setDigito2(digito);
            setContador(contador + 1);
            audioTeclado()
        }
        if (contador == 3) {
            setDigito3(digito);
            setContador(contador + 1);
            audioTeclado()
        }


    }




    function verificaCandidato() {

        let numero = `${digito1}${digito2}${digito3}`;
        let nulo = true;

        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                setCandidatoDigitado(candidatos[i]);
                nulo = false;
                break;
            }
        }
        if (nulo && (numero !== '')) {
            setRodape('Voto Nulo')
        }


    }

    function aoCorrigir() {
        setDigito1('');
        setDigito2('');
        setDigito3('');
        setRodape(' ');
        setBranco(' ');
        setCandidatoDigitado({
            'imagem': vasco
        })
        setContador(1);
    }
    function aoConfirmar() {

        let numero = `${digito1}${digito2}${digito3}`;
        let votoCandidato = candidatos;
        let nulo = true;
        let votoBranco = votosInvalidos;

        audioConfirma();
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                votoCandidato[i].votos += 1;
                setCandidatos(votoCandidato);
                nulo = false;
                break;
            }
        }
        if (branco === 'branco') {
            votoBranco.votos_brancos += 1;
        } else if (nulo && (numero !== ' ')) {
            votosInvalidos.votos_nulos += 1;
        }
        setVotos(votos + 1);
        aoCorrigir();
    }



    function aoBranco() {
        setRodape('Deseja votar em branco?');
        setBranco('branco');
    }

    function apuracao() {
        let listApuracao = [];

        for (let i = 0; i < candidatos.length; i++) {
            listApuracao.push(`${candidatos[i].nome}: (${candidatos[i].votos} votos)`);
        }
        listApuracao.push(`Votos Brancos: (${votosInvalidos.votos_brancos} votos)`);
        listApuracao.push(`Votos Nulos: (${votosInvalidos.votos_nulos} votos)`);


        return (
            listApuracao.join(', \n')
        );
    }


    function infoSenadores() {
        let senadoresList = [];
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].cargo === 'Senador') {
                senadoresList.push(`${candidatos[i].nome} (${candidatos[i].numero})`);
            }
        }
        return (
            senadoresList.join(', ')
        );
    }

    useEffect(() => {
        verificaCandidato();
    }, [digito3]);

    return (

        <div className="telaBranca">
            <audio ref={teclasRefTeclado} src={audioTeclas} type="audio/mp3" />
            <audio ref={teclasRefConfirma} src={audioTeclaConfirma} type="audio/mp3" />



            <div className="apuracao">
                <button className="botaoApuracao" onClick={() => setApura(apuracao())}>Apuração</button>
                <p className="resultadoApuracao">{apura}</p>

            </div>

            <div className="urna">



                <div className="tela">

                    <div className="infos">
                        <h1 className="cargo">Senadores</h1>
                        <h1 className="cola">Candidatos: {infoSenadores()}</h1>


                        <section className="digito">

                            <div className="numero">
                                <h4>Número: </h4>
                            </div>

                            <p className='input'>{digito1}</p>
                            <p className='input'>{digito2}</p>
                            <p className='input'>{digito3}</p>


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
                        aoBranco={aoBranco}
                    />



                </div>
            </div>
        </div>

    );

}

