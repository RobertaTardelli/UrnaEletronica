import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import img from "../../assets/logo.jpeg";
import coxinha from "../../assets/coxinha.png";
import pxtrick from "../../assets/pxtrick.jpg";
import passaFome from "../../assets/passafome.jpg";
import vasco from "../../assets/vasco.png";
import romulo from "../../assets/romulo.jpg";
import felipe from "../../assets/felipe.jpg";
import Teclado from "../Teclado";
import audioTeclas from "../../audio/audioTeclas.mp3";
import audioTeclaConfirma from "../../audio/audioTeclaConfirma.mp3";


export default function TelaVereador() {
      const navigate = useNavigate();

      const teclas = useRef(audioTeclas);

      const confirma = useRef(audioTeclaConfirma);

      const [candidatos, setCandidatos] = useState([
            {
                  'nome': 'Lucas Coxinha',
                  'partido': 'Partido dos Salgados',
                  'cargo': 'Vereador',
                  'numero': '1234',
                  'imagem': coxinha,
                  'votos': 0
            },
            {
                  'nome': 'Pxtrick do Felipe ',
                  'partido': 'Partido !Schimit ',
                  'cargo': 'Vereador',
                  'numero': '2345',
                  'imagem': pxtrick,
                  'votos': 0
            },
            {
                  'nome': 'Rodrigo',
                  'partido': 'Partido do Passa Fome',
                  'cargo': 'Vereador',
                  'numero': '1008',
                  'imagem': passaFome,
                  'votos': 0
            },
            {
                  'nome': 'Rômulo',
                  'partido': 'Partido da Linguiça',
                  'cargo': 'Vereador',
                  'numero': '2455',
                  'imagem': romulo,
                  'votos': 0
            },

            {
                  'nome': 'Felipe !Schimit',
                  'partido': 'Partido doce de Paçoca',
                  'cargo': 'Vereador',
                  'numero': '5368',
                  'imagem': felipe,
                  'votos': 0
            }
      ])
      const teclasRefTeclado = useRef(new Audio(audioTeclas));
      const teclasRefConfirma = useRef(new Audio(audioTeclaConfirma));
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
                  'cargo': 'Vereador',
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
            if (contador === 1 || contador === 2 || contador === 3 || contador === 4) {
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
            if (contador == 4) {
                  setDigito4(digito);
                  setContador(contador + 1);
                  audioTeclado()
            }

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
            navigate("/TelaSenador");
      }



      function aoBranco() {
            setRodape('Deseja votar em branco?');
            setBranco('branco');
      }

      function apuracao() {
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


      function infoVereadores() {
            let vereadoresList = [];
            for (let i = 0; i < candidatos.length; i++) {
                  if (candidatos[i].cargo === 'Vereador') {
                        vereadoresList.push(`${candidatos[i].nome} (${candidatos[i].numero})`);
                  }
            }
            return (
                  vereadoresList.join(', ')
            );
      }

      useEffect(() => {
            verificaCandidato();
      }, [digito4]);

      useEffect(() => {
            teclasRefTeclado.current = new Audio(audioTeclas);
            teclasRefConfirma.current = new Audio(audioTeclaConfirma);
          }, []);

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
                                    <h1 className="cargo">Vereadores</h1>
                                    <h1 className="cola">Candidatos: {infoVereadores()}</h1>


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


