import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import img from "../../assets/logo.jpeg";
import lucasCoxinha from "../../assets/lucasCoxinha.jpg";
import passaFome from "../../assets/passafome.jpg";
import vasco from "../../assets/vasco.png";
import roberta from "../../assets/roberta.jpg";
import arthur from "../../assets/arthur.jpg";
import audioTeclas from "../../audio/audioTeclas.mp3";
import audioTeclaConfirma from "../../audio/audioTeclaConfirma.mp3";
import Teclado from "../Teclado";


export default function TelaPresidente() {

    const navigate = useNavigate();

    const teclas = useRef(audioTeclas);

    const confirma = useRef(audioTeclaConfirma);

    const [candidatos, setCandidatos] = useState([
        {
            'nome': 'Lucas Coxinha',
            'partido': 'Partido dos Salgados',
            'cargo': 'Presidente',
            'numero': '16',
            'imagem': lucasCoxinha,
            'votos': 0
        },
        {
            'nome': 'Rodrigo Come Balde ',
            'partido': 'Partido Passa Fome ',
            'cargo': 'Presidente',
            'numero': '01',
            'imagem': passaFome,
            'votos': 0
        },
        {
            'nome': 'Arthur Flamenguista',
            'partido': 'Partido Não Ganha Nada',
            'cargo': 'Presidente',
            'numero': '71',
            'imagem': arthur,
            'votos': 0
        },
        {
            'nome': 'Roberta Cervejinha',
            'partido': 'Partido Sempre Alegre',
            'cargo': 'Presidente',
            'numero': '24',
            'imagem': roberta,
            'votos': 0
        }
    ])
    const teclasRefTeclado = useRef(new Audio(audioTeclas));
    const teclasRefConfirma = useRef(new Audio(audioTeclaConfirma));
    const [digito1, setDigito1] = useState('');
    const [digito2, setDigito2] = useState('');
    const [contador, setContador] = useState(1);
    const [rodape, setRodape] = useState('');
    const [votos, setVotos] = useState(true);
    const [branco, setBranco] = useState(0);
    const [apura, setApura] = useState(' ');
    const [candidatoDigitado, setCandidatoDigitado] = useState(
        {
            'nome': '',
            'partido': '',
            'cargo': 'Presidente',
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
        if (contador === 1 || contador === 2) {
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

    }




    function verificaCandidato() {

        let numero = `${digito1}${digito2}`;
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
        setRodape(' ');
        setBranco(' ');
        setCandidatoDigitado({
            'imagem': vasco
        })
        setContador(1);
    }
    function aoConfirmar() {

        let numero = `${digito1}${digito2}`;
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
        navigate("/");
    }



    function aoBranco() {
        setRodape('Deseja votar em branco?');
        setBranco('branco');
    }

     function apuracaoPresidente(candidatos, votosInvalidos) {
        let listApuracao = [];

        for (let i = 0; i < candidatos.length; i++) {
            listApuracao.push(`${candidatos[i].cargo}: ${candidatos[i].nome}: (${candidatos[i].votos} votos)`);
        }
        listApuracao.push(`Votos Brancos: (${votosInvalidos.votos_brancos} votos)`);
        listApuracao.push(`Votos Nulos: (${votosInvalidos.votos_nulos} votos)`);


        return (
            listApuracao.join(', \n')
        );
    }


    function infoPresidentes() {
        let presidenteList = [];
        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].cargo === 'Presidente') {
                presidenteList.push(`${candidatos[i].nome} (${candidatos[i].numero})`);
            }
        }
        return (
            presidenteList.join(', ')
        );
    }

    useEffect(() => {
        verificaCandidato();
    }, [digito2]);

    useEffect(() => {
        teclasRefTeclado.current = new Audio(audioTeclas);
        teclasRefConfirma.current = new Audio(audioTeclaConfirma);
      }, []);

    return (

        <div className="telaBranca">
            <audio ref={teclasRefTeclado} src={audioTeclas} type="audio/mp3" />
            <audio ref={teclasRefConfirma} src={audioTeclaConfirma} type="audio/mp3" />



            <div className="apuracao">
                <button className="botaoApuracao" onClick={() => setApura(apuracaoPresidente())}>Apuração</button>
                <p className="resultadoApuracao">{apura}</p>

            </div>

            <div className="urna">



                <div className="tela">

                    <div className="infos">
                        <h1 className="cargo">Presidente</h1>
                        <h1 className="cola">Candidatos: {infoPresidentes()}</h1>


                        <section className="digito">

                            <div className="numero">
                                <h4>Número: </h4>
                            </div>

                            <p className='input'>{digito1}</p>
                            <p className='input'>{digito2}</p>

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

