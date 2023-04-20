import React, { useState } from "react";
import Modal from "./modal";
import './alunoList.css'

const AlunosList = ({ alunos, handleDelete, handleUpdate, handleAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setAlunoSelecionado(null);
  };

  const handleEdit = (aluno) => {
    setAlunoSelecionado(aluno);
    setShowModal(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Plano</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.plano}</td>
              <td>
                <button onClick={() => handleDelete(aluno.id)}>Excluir</button>
              </td>
              <td>
                <button onClick={() => handleEdit(aluno)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        aluno={alunoSelecionado}
      />
    </>
  );
};

export default AlunosList;
