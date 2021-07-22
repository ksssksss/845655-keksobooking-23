const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const validityFileType = (file, types) => {
  const fileName = file.name.toLowerCase();
  const matches = types.some((it) => {
    const someName = fileName.endsWith(it);
    return someName;
  });
  return matches;
};

const onAvatarInputChange = () => {
  const file = avatarInput.files[0];
  if (validityFileType(file, FILE_TYPES)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onPhotoInputChange = () => {
  const file = photoInput.files[0];
  if (validityFileType(file, FILE_TYPES)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imgElement = document.createElement('img');
      imgElement.width = 70;
      imgElement.height = 70;
      imgElement.src = reader.result;
      imgElement.style.zIndex = 1;
      photoPreview.appendChild(imgElement);
    });
    reader.readAsDataURL(file);
  }
};

const uploadPreviews = () => {
  avatarInput.addEventListener('change', onAvatarInputChange);
  photoInput.addEventListener('change', onPhotoInputChange);
};

const removePreviews = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

export {uploadPreviews, removePreviews};
