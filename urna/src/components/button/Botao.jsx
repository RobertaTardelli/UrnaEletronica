import "./style.css";

export default function Botao (props) {
    
    const botaoSim = ({onClick}) => (
        <button className="botaoSim" onClick={props.votoBranco}>
          Sim
        </button>
      );
      
  
      const botaoNao = ({ onClick }) => (
        <button className="botaoNao" onClick={onClick.votoBranco}>
          Não
        </button>
      );
}