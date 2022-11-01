export function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

export function validateEmail(mail) {
  let emailRegex = /(^[^@.]+)@([^@.]+)\.{1}(\w{1,9}$)/;
  if(mail?.match(emailRegex))
    return true;
  else
    return false;
}

export const checkMimeType = file => {
  let err = ''
  const types = ['image/png', 'image/jpeg', 'image/gif']
  if(types.every(type => file.type !== type)){
    console.log(file.type);
    err += file.type + ' формат буруу байна.';
  }

  if(err !== '') return err; 
  else return checkFileSize(file);
}

export const checkFileSize = file => {
  let size = 1000000;
  let err = ''; 
  if(file.size > size){
    err += 'Файлын хэмжээ хэт том байна.';
  }
  
  if(err !== '') return err;
  return false
}

export const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
}