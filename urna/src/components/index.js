import { useState } from "react";
import "./style.css";
import img from "../assets/logo.jpeg";
import coxinha from "../assets/coxinha.png";
import Teclado from "./Teclado";

export default function TelaInicial() {

    const [digito1, setDigito1] = useState (null);
    const [digito2, setDigito2] = useState (null);
    const [digito3, setDigito3] = useState (null);
    const [digito4, setDigito4] = useState (null);

    function cliqueBotao (numero) {
        console.log(numero);
    }

    return (
        <div class="urna">


            <div class="tela">
                <div className="infos">
                    <h3 className="infos_cargo">Senador</h3>

                    <section class="digito">

                        <div class="numero">
                            <h4>Número: </h4>
                        </div>

                        <p className='input'>1</p>
                        <p className='input'>2</p>
                        <p className='input'>3</p>
                        <p className='input'>4</p>

                    </section>
                    <h4>Nome: Zé Coxinha</h4>
                    <h4>Partido</h4>
                </div>
                <div className="imagens">
                    <img src={coxinha}></img>
                </div>
            </div>

            <div className="titutecla">
                <div className="titulo">
                    <img src={img}></img>
                    <h1>Injustiça Eleitoral </h1>
                </div>
                <Teclado cliqueBotao={cliqueBotao}/>

            </div>
        </div>

    );

}