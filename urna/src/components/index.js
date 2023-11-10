import { useState } from "react";
import "./style.css";
import img from "../assets/logo.jpeg";
import coxinha from "../assets/coxinha.png";
import Teclado from "./Teclado";

export default function TelaInicial() {

    let candidatos = [
        { 
            'nome':'Lucas',
            'partido':'Partido do Lucas',
            'cargo':'senador',
            'numero':'1234',
            'imagem':coxinha
        },
        {
            'nome':'Arthur',
            'partido':'Partido do Arthur',
            'cargo':'senador',
            'numero':'2345',
            'imagem':null
        }
    ]

    const [digito1, setDigito1] = useState ('');
    const [digito2, setDigito2] = useState ('');
    const [digito3, setDigito3] = useState ('');
    const [digito4, setDigito4] = useState ('');
    const [contador, setContador] = useState (1);
    const [candidatoDigitado, setCandidatoDigitado] = useState(
        { 
            'nome':'',
            'partido':'',
            'cargo':'senador',
            'numero':'',
            'imagem':''
        }
    );
    const [imagem, setImagem] = useState (null);
   

    function aoClicar(digito) {
        if (contador == 1) {
        setDigito1(digito);
        setContador(contador + 1);
        }
        if (contador == 2) {
            setDigito2(digito);
            setContador(contador + 1);
        }
        if(contador == 3) {
            setDigito3(digito);
            setContador(contador + 1);
        }
        if (contador == 4) {
            setDigito4(digito);
            setContador(contador + 1);

            verificaCandidato();
        }
    }
    function verificaCandidato () {
        //Candidato existe?
        //se existe, carrega os dados dele
        //se não existe, carrega voto nulo
    }

    function aoCorrigir() {
        setDigito1('');
        setDigito2('');
        setDigito3('');
        setDigito4('');
        setContador(1);
    }

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
                <Teclado onClick={aoClicar} aoCorrigir={aoCorrigir}/>



            </div>
        </div>

    );

}