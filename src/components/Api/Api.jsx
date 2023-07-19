const fetchImages = (searchQuery, page = 1) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=37005405-aee23f10e1a9d709a8c5923f1&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then((response) => response.json())
    .then((data) => {
      const formattedImages = data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
      return formattedImages;
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
      return [];
    });
};

export default fetchImages;
