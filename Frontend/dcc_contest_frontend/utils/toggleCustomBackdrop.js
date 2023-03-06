
export default function toggleLoaderBackdrop(path1,path2){
  if(path1!==path2){
    document.querySelector(".custom-backdrop-loader").classList.toggle("active");
  }
}