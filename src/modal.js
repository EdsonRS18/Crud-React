import React, { useState, useEffect } from "react";
import './modal.css'


const Modal = ({ show, handleClose, aluno, handleAdd, handleUpdate }) => {
  const [formValues, setFormValues] = useState({
    id: "",
    nome: "",
    cpf: "",
    plano: "",
  });

  useEffect(() => {
    if (aluno) {
      setFormValues(aluno);
    }
  }, [aluno]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (aluno) {
      handleUpdate(formValues.id, formValues);
    } else {
      handleAdd(formValues);
    }
    handleClose();
  };
  

  return (
    <>
      {show ? (
        <div className="modal">
          <form onSubmit={handleSubmitForm}>
            <div className="modal-header">
              <h2>{aluno ? "Editar Aluno" : "Adicionar Aluno"}</h2>
              <button onClick={handleClose}>X</button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formValues.nome}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formValues.cpf}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="plano">Plano:</label>
                <select id="plano" name="plano" value={formValues.plano} onChange={handleChange}>
                  <option value="">Selecione um plano</option>
                  <option value="Musculação">Musculação</option>
                  <option value="Dança">Dança</option>
                  <option value="Crossfit">Crossfit</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit">
                {aluno ? "Salvar" : "Adicionar"}
              </button>
              <button onClick={handleClose}>Cancelar</button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
