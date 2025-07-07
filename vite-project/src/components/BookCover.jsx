import React, { useEffect, useState } from 'react';

export function BookCover({ isbn, alt }) {
  const [src, setSrc] = useState(
    `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  );

  const fetchGoogleCover = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const { items } = await res.json();
      const thumb = items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      if (thumb) setSrc(thumb);
      else setSrc("/capa-placeholder.png");
    } catch {
      setSrc("/capa-placeholder.png");
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={fetchGoogleCover}
      className="w-[12rem] h-[16rem] object-cover mb-4 rounded"
    />
  );
}
