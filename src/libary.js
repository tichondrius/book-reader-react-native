

export function truncate(toggle, text, length){
  if (toggle == false) return text;
  else {
    if (text.length > length)
    {
      return text.substring(0, length) + '...';
      
    }
    else return text;
  }
}
export function renderImageTag(images){
  return images.map(image => {
    return ` <div><img style="width: 100% ;height: auto; display:block" src='${image.url}?imgmax=1000'/></div>`
  }).join(' ');
}