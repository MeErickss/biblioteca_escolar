import React, { useEffect, useState } from 'react';

export function BookCover({ isbn, alt, className }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const fetchGoogle = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        const data = await res.json();
        const thumb = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail
          || data.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail;
        if (thumb) {
          // garantir https
          setSrc(thumb.replace('http://', 'https://'));
          return;
        }
      } catch (e) {
        // ignora e tenta OpenLibrary
      }
      // fallback para OpenLibrary (com default=true para garantir imagem)
      setSrc(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=true`);
    };

    fetchGoogle();
  }, [isbn]);

  if (!src) {
    return (
      <div
        style={{ width: '12rem', height: '16rem', backgroundColor: '#f0f0f0' }}
        className={className}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}
