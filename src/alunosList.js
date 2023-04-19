const AlunosList = ({ alunos, handleDelete,handleUpdate }) => {

  

  return (
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
              <button onClick={() => handleUpdate(aluno.id)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlunosList;
