

export default function Botao (props) {
    return(
        <button className={props.tecla}>{props.children}</button>
    );
}