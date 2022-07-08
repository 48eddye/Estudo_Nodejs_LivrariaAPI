import autores from "../models/Autor.js";

class autorController {

  static listarAutores = (req, res) => {
    autores.find((err, autor) => {
      res.status(200).json(autor);
    });
  }

  static listarAutorPorId = (req, res) => {
    const { id } = req.params;

    autores.findById(id, (err, autor) => {
      if (!err){
        res.status(200).json(autor);
      } else {
        res.status(400).send({ message: `${err.message} - Autor não encontrado` })
      }
    })
  }

  static cadastrarAutor = (req, res) => {
    let livro = new autores(req.body);

    livro.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao Cadastrar Autor` })
      } else {
        res.status(201).send(livro.toJSON());
      }
    })
  }

  static atualizarAutor = (req, res) => {
    const { id } = req.params;

    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err){
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        res.status(500).send({ message: `${err.message} - Falha ao Atualizar Autor` })
      }
    })
  }

  static excluirAutor = (req, res) => {
    const { id } = req.params;

    autores.findByIdAndDelete(id, (err) => {
      if (!err){
        res.status(200).send({message: "Autor excluido com sucesso"});
      } else {
        res.status(500).send({ message: `${err.message} - Falha ao Excluir Autor` })
      }
    })
  }

}

export default autorController;