import React, { useState } from "react";

const EditAluno = ({ aluno, handleSave, handleCancel }) => {
  const [nome, setNome] = useState(aluno.nome);
  const [cpf, setCpf] = useState(aluno.cpf);
  const [plano, setPlano] = useState(aluno.plano);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handlePlanoChange = (event) => {
    setPlano(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave(aluno._id, { nome, cpf, plano });
  };

  const handleCancelClick = () => {
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={handleNomeChange} />
      </label>
      <label>
        CPF:
        <input type="text" value={cpf} onChange={handleCpfChange} />
      </label>
      <label>
        Plano:
        <input type="text" value={plano} onChange={handlePlanoChange} />
      </label>
      <button type="submit">Salvar</button>
      <button type="button" onClick={handleCancelClick}>
        Cancelar
      </button>
    </form>
  );
};

export default EditAluno;
