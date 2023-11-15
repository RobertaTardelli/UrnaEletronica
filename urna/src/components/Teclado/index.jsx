import "./style.css";

export default function Teclado (props) {

    let digitos = [1,2,3,4,5,6,7,8,9,0];

    return(
        <div className="teclado">
            <section className="numeros">
                {digitos.map(digito => {
                    return(
                        <button 
                            className="teclaPreta" 
                            onClick={ () => {props.onClick(digito)}} >
                                {digito}
                        </button>                        
                    );
                })}

            <div className="confirmacoes">
                <button className="teclaBranco" onClick={props.aoBranco} > Branco </button>
                <button className="teclaCorrige" onClick={props.aoCorrigir}> Corrige </button>
                <button className="teclaConfirma" onClick={props.aoConfirmar}>Confirma</button>
            </div>
            </section>
        </div>
    );
}