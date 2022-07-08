import livros from "../models/Livro.js";

class livroController {

  static listarLivros = (req, res) => {
    livros.find().populate("autor").exec(
      (err, livros) => {
        res.status(200).json(livros);
      });
  }

  static listarLivroPorId = (req, res) => {
    const { id } = req.params;

    livros.findById(id).populate("autor", "nome").exec((err, livros) => {
      if (!err) {
        res.status(200).json(livros);
      } else {
        res.status(400).send({ message: `${err.message} - Livro não encontrado` })
      }
    })
  }

  static listarLivroPorEditora = (req, res) => {
    const { editora } = req.query;

    livros.find({ "editora": editora }, {}, (err, livros) => {
      if (!err) {
        res.status(200).json(livros);
      } else {
        res.status(400).send({ message: `${err.message} - Editora não encontrada` })
      }
    })
  }

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao Cadastrar Livro` })
      } else {
        res.status(201).send(livro.toJSON());
      }
    })
  }

  static atualizarLivro = (req, res) => {
    const { id } = req.params;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        res.status(500).send({ message: `${err.message} - Falha ao Atualizar Livro` })
      }
    })
  }

  static excluirLivro = (req, res) => {
    const { id } = req.params;

    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro excluido com sucesso" });
      } else {
        res.status(500).send({ message: `${err.message} - Falha ao Excluir Livro` })
      }
    })
  }

}

export default livroController;