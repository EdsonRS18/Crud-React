import React, { Component } from "react";
import api from "../api";
import AlunosList from "../alunosList";
import Modal from "../modal";
import "./alunos.css";


class Alunos extends Component {
  state = {
    alunos: [],
    showModal: false,
    alunoSelecionado: null // adicione uma variável de estado para armazenar o aluno selecionado
  };

  async componentDidMount() {
    await this.carregarAlunos();
  }

  async carregarAlunos() {
    const response = await api.get("");
    console.log(response.data);
    this.setState({ alunos: response.data });
  }

  handleAdd = async (novoAluno) => {
    const response = await api.post("/add", novoAluno);
    console.log(response.data);
    this.setState(
      (prevState) => ({
        alunos: [...prevState.alunos, response.data],
      }),
      () => {
        this.carregarAlunos();
      }
    );
  };

  handleUpdate = async (id, novoAluno) => {
    const response = await api.put(`/alunos/${id}`, novoAluno);
    console.log(response.data);
    this.setState(
      (prevState) => ({
        alunos: prevState.alunos.map((aluno) => {
          if (aluno._id === id) {
            return response.data;
          } else {
            return aluno;
          }
        }),
      }),
      () => {
        this.carregarAlunos();
      }
    );
  };

  handleDelete = async (id) => {
    const response = await api.delete(`/alunos/${id}`);
    console.log(response.data);
    this.setState(
      (prevState) => ({
        alunos: prevState.alunos.filter((aluno) => aluno._id !== id),
      }),
      () => {
        this.carregarAlunos();
      }
    );
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleEdit = (aluno) => {
    this.setState({ alunoSelecionado: aluno, showModal: true });
  };

  render() {
    return (
      <div>
      
        <button onClick={this.handleShowModal}>Adicionar aluno</button>
        <Modal
          show={this.state.showModal}
          handleClose={this.handleCloseModal}
          handleAdd={this.handleAdd}
          handleUpdate={this.handleUpdate} // passe a função handleUpdate como prop para o componente Modal
          aluno={this.state.alunoSelecionado} // passe o aluno selecionado como prop para o componente Modal
        />
        <AlunosList
          alunos={this.state.alunos}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleUpdate={this.handleUpdate} // add this line
        />
        
      </div>
    );
  }
}

export default Alunos;
