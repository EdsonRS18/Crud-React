import React, { Component } from "react";
import api from "../api";
import AlunosList from "../alunosList";
import './alunos.css';

class Alunos extends Component {
  state = {
    alunos: [],
    novoAluno: {
      nome: "",
      cpf: "",
      plano: "",
    },
  };

  async componentDidMount() {
    await this.carregarAlunos();
  }

  async carregarAlunos() {
    const response = await api.get("");
    console.log(response.data);
    this.setState({ alunos: response.data });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState) => ({
      novoAluno: {
        ...prevState.novoAluno,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post("/add", this.state.novoAluno);
    console.log(response.data);
    this.setState(
      (prevState) => ({
        alunos: [...prevState.alunos, response.data],
        novoAluno: {
          nome: "",
          cpf: "",
          plano: "",
        },
      }),
      () => {
        this.carregarAlunos();
      }
    );
  };

  handleUpdate = async (id) => {
    const response = await api.put(`/alunos/${id}`, this.state.novoAluno);
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
        novoAluno: {
          nome: "",
          cpf: "",
          plano: "",
        },
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

  render() {
    const { novoAluno } = this.state;
    return (
      <div>
        <h1>LISTAR</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={novoAluno.nome}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={novoAluno.cpf}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="plano"
            placeholder="Plano"
            value={novoAluno.plano}
            onChange={this.handleInputChange}
          />
          <button type="submit">Adicionar</button>
        </form>
        <AlunosList
          alunos={this.state.alunos}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default Alunos;

