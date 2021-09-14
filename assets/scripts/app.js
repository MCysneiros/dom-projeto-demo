const addMovieModal = document.getElementById('add-modal');

const startAddMovieBtn = document.querySelector('header button');

const closeAddMovieBtn = addMovieModal.querySelector('.btn--passive');

const addMovieBtn = closeAddMovieBtn.nextElementSibling;

const modalBackdrop = document.getElementById('backdrop');

const inputs = addMovieModal.querySelectorAll('input');

const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUi = () => {
  if (movies.length > 0) {
    entryTextSection.style.display = 'none';
  } else {
    entryTextSection.style.display = 'block';
  }
};

const addMovieModalFun = () => {
  addMovieModal.classList.add('visible');
  backdrop();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const backdrop = () => {
  modalBackdrop.classList.toggle('visible');
};
const cancelMovieModalHandler = () => {
  closeMovieModal();
  clearInputs();
  backdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearInputs();
};

const clearInputs = () => {
  for (const inp of inputs) {
    inp.value = '';
  }
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  backdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click', cancelMovieDeletion);

  cancelDeletionBtn.addEventListener('click', cancelMovieDeletion);
  confirmDeletionBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const deleteMovie = (movieId) => {
  let identifiedIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    identifiedIndex++;
  }
  movies.splice(identifiedIndex, 1);
  const listRoot = document.getElementById('movie-list');

  listRoot.children[identifiedIndex].remove();
  cancelMovieDeletion();
  updateUi();
};

const cancelMovieDeletion = () => {
  backdrop();

  deleteMovieModal.classList.remove('visible');
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl}" alt ='${title}'>
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');

  listRoot.append(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = inputs[0].value;
  const imageUrlValue = inputs[1].value;
  const ratingValue = inputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert('Please enter a valid value! (rating value between 1 and 5)');
    return;
  }
  const newMovie = {
    id: Math.random().toString,
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  clearInputs();
  backdrop();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.imageUrl,
    newMovie.rating
  );
  updateUi();
};

startAddMovieBtn.addEventListener('click', addMovieModalFun, backdrop);

closeAddMovieBtn.addEventListener('click', cancelMovieModalHandler);

modalBackdrop.addEventListener('click', backdropClickHandler);

addMovieBtn.addEventListener('click', addMovieHandler);
