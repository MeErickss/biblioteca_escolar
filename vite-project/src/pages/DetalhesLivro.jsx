import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import loadingGif from '../images/loading.gif';
import { BookCover } from '../components/BookCover';
import Group15 from '../images/Group15.svg'

export function DetalhesLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ref para o container de cards
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchDetalhes() {
      try {
        setLoading(true);
        // dados do livro
        const resp = await axios.get(`http://localhost:5000/api/livro/${id}`);
        setLivro(resp.data);
        console.log(resp.data)

        // livros relacionados (mesma categoria ou qualquer lógica sua)
        const rel = await axios.get(`http://localhost:5000/api/select`, {
          params: { table: "livro" }
        });
        console.log(rel.data)
        setRelated(rel.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetalhes();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Carregando..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Erro ao carregar dados.
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-white">
      <div className="p-12 pt-[12rem]">
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg mb-6"
        >
          <LeftOutlined /> Voltar
        </button>

        <div className="w-5xl mx-auto bg-neutral-200 p-8 rounded-lg grid grid-cols-2 gap-2 items-start">
          <BookCover
            isbn={livro.isbn}
            alt={`Capa de ${livro.titulo}`}
            className="w-[12rem] h-[16rem] object-cover mb-4 rounded"
          />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{livro.titulo}</h1>
            <p><strong>Autor:</strong> {livro.autores[0].nome}</p>
            <p><strong>ISBN:</strong> {livro.isbn}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{livro.descricao}</p>
            <div className='w-full flex justify-end'><img src={Group15} width={200} /></div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 relative">
            <h2 className="text-2xl font-semibold mb-4">Relacionados</h2>

            {/* Container de cards */}
            <div
              ref={carouselRef}
              className="flex space-x-6 overflow-x-auto no-scrollbar px-12"
              style={{ scrollBehavior: 'smooth' }}
            >
              {related.map(item => (
                <div key={`${item.id}-${item.isbn}`} className="flex-shrink-0 w-40">
                    <button onClick={() => navigate(`/livro/${item.id}`)}>
                      <BookCover
                        isbn={item.isbn}
                        alt={`Capa de ${item.titulo}`}
                        className="w-[12rem] cursor-pointer h-[16rem] object-cover mb-4 rounded"
                      />
                    </button>

                  <h3 className="text-sm font-medium text-center">{item.titulo}</h3>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
