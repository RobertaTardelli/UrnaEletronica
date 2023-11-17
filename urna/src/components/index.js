import { useState, useEffect, useRef } from "react";
import "./style.css";
import img from "../assets/logo.jpeg";
import coxinha from "../assets/coxinha.png";
import pxtrick from "../assets/pxtrick.jpg";
import passaFome from "../assets/passafome.jpg";
import vasco from "../assets/vasco.png";
import romulo from "../assets/romulo.jpg";
import felipe from "../assets/felipe.jpg";
import Teclado from "./Teclado";
import audioTeclas from "../audio/audioTeclas";
import audioTeclaConfirma from "../audio/audioTeclaConfirma";
export default function TelaInicial() {

//

    const Teclas = useRef (audioTeclas)
    const [candidatos, setCandidatos] = useState([
        {
            'nome': 'Lucas Coxinha',
            'partido': 'Partido dos Salgados',
            'cargo': 'senador',
            'numero': '1234',
            'imagem': coxinha,
            'votos': 0
        },
        {
            'nome': 'Pxtrick do Felipe ',
            'partido': 'Partido !Schimit ',
            'cargo': 'senador',
            'numero': '2345',
            'imagem': pxtrick,
            'votos': 0
        },
        {
            'nome': 'Rodrigo',
            'partido': 'Partido do Passa Fome',
            'cargo': 'senador',
            'numero': '1008',
            'imagem': passaFome,
            'votos': 0
        },
        {
            'nome': 'Rômulo',
            'partido': 'Partido da Linguiça',
            'cargo': 'senador',
            'numero': '2455',
            'imagem': romulo,
            'votos': 0
        },

        {
            'nome': 'Felipe !Schimit',
            'partido': 'Partido doce de Paçoca',
            'cargo': 'senador',
            'numero': '5368',
            'imagem': felipe,
            'votos': 0
        }
    ])
    const [audio] = useState(new Audio(audioTeclas));
    const [digito1, setDigito1] = useState('');
    const [digito2, setDigito2] = useState('');
    const [digito3, setDigito3] = useState('');
    const [digito4, setDigito4] = useState('');
    const [contador, setContador] = useState(1);
    const [rodape, setRodape] = useState('');
    const [votos, setVotos] = useState(true);
    const [branco, setBranco] = useState(0);
    const [apura, setApura] = useState(' ');
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
    function audio (){
        if(contador == 1 || contador == 2 || contador ==3 || contador == 4) {
            audioTeclas.current.play();
        }
}
function aoClicar(digito) {
    if (contador == 1) {
        setDigito1(digito);
        setContador(contador + 1);
        audio()
    }
    if (contador == 2) {
        setDigito2(digito);
        setContador(contador + 1);
        audio()
    }
    if (contador == 3) {
        setDigito3(digito);
        setContador(contador + 1);
        audio()
    }
    if (contador == 4) {
        setDigito4(digito);
        setContador(contador + 1);
        audio()
    }
    audio.currentTime = 0;
    audio.play(audioTeclas);
}




    function verificaCandidato() {

        let numero = `${digito1}${digito2}${digito3}${digito4}`;
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
        setDigito4('');
        setRodape(' ');
        setBranco(' ');
        setCandidatoDigitado({
            'imagem': vasco
        })
        setContador(1);
    }
    function aoConfirmar() {

        let numero = `${digito1}${digito2}${digito3}${digito4}`;
        let votoCandidato = candidatos;
        let nulo = true;
        let votoNulo = votosInvalidos;

        for (let i = 0; i < candidatos.length; i++) {
            if (candidatos[i].numero == numero) {
                votoCandidato[i].votos += 1;
                setCandidatos(votoCandidato);
                nulo = false;
                break;
            }
        }
        if (nulo && (numero !== '')) {
            votoNulo.votos_nulos +=1;
        }
        setVotos(votos + 1);
        aoCorrigir();
    }



    function aoBranco() {
        setBranco('');
        <div className={setBranco(<button className="branco" onClick={confirmaVotoBranco}>Confirmar</button>
        )}>
        </div>

        console.log('voto branco');
    }
    function confirmaVotoBranco() {
        let votoBranco = votosInvalidos
        votoBranco.votos_brancos += 1;
        aoCorrigir();
        console.log(votosInvalidos.votos_brancos);

    }

    function apuracao() {
        let listApuracao = [];
        
        for (let i = 0; i < candidatos.length; i++) {
            listApuracao.push(`${candidatos[i].nome}: (${candidatos[i].votos} votos)`);
        }
        listApuracao.push(`Votos Brancos: ${votosInvalidos.votos_brancos}`);
        listApuracao.push(`Votos Nulos: ${votosInvalidos.votos_nulos}`);
       
       
        return (
            listApuracao.join(', \n')
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

        <div className="telaBranca">
<audio>
    ref ={teclas} src= {audioTeclas} type= "audio/mp3"
</audio>      

                        <div className="apuracao">
                            <button className="botaoApuracao" onClick={() => setApura(apuracao())}>Apuração</button>
                            <p className="resultadoApuracao">{apura}</p>

                        </div>

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
                        aoBranco={aoBranco}
                    />



                </div>
            </div>
        </div>

    );

}

