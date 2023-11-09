import { useState } from "react";
import "./style.css";
import img from "../assets/logo.jpeg";
import coxinha from "../assets/coxinha.png";
import Botao from "./button/Botao";
import Quadrado from "./imput/Quadrado";

export default function TelaInicial () {
   
    return (
        <div class="urna">

            
            <div class="tela">
                
                <div className="infos">
                    <h3 className="infos_cargo">Senador</h3>  
                    
                    <section class="digito">

                    <div class="numero">

                    <h4>Número: </h4>
                    </div>

                    <p class="caixa1">
                    </p>

                    <p class="caixa2"> 
                    </p>

                    <p class="caixa3">
                    </p>

                    <p class="caixa4">
                    </p>



                    </section>
                    <h4>Nome: Zé Coxinha</h4>
                    

                    <h4>Partido</h4>  
                </div>
                <div className="imagens">
                <img src={coxinha}></img>
                </div>

            </div>
            <div class="titutecla">

             <div class="titulo">
                <img src={img}></img>
                <h1>Injustiça Eleitoral </h1>

            </div>

            <div class="teclado">

                <section class="numeros">
                <div class="umtres"> 
                <Botao onClick={"1"} tecla="teclaPreta"> 1 </Botao>
                <Botao tecla="teclaPreta"> 2 </Botao>
                <Botao tecla="teclaPreta"> 3 </Botao>
                </div>

                    <div class="quatroseis">
                <Botao tecla="teclaPreta"> 4 </Botao>
                <Botao tecla="teclaPreta"> 5 </Botao>
                <Botao tecla="teclaPreta"> 6 </Botao>
                </div>


                <div class="setenove">
                <Botao tecla="teclaPreta"> 7 </Botao>
                <Botao tecla="teclaPreta"> 8 </Botao>
                <Botao tecla="teclaPreta"> 9 </Botao>
                    </div>

                    <div class="zirou">
                <Botao tecla="teclaPreta"> 0 </Botao>
                </div>
                
                
                
                </section>

                    <div class="confirmacoes"> 
                <Botao tecla="teclaBranco"> Branco </Botao>
                <Botao tecla="teclaCorrige"> Corrige </Botao>
                <Botao tecla="teclaConfirma"> Confirma </Botao>
                </div>
            </div>

            </div>
            </div>

    );

}