
export default function toggleLoaderBackdrop(path1="something",path2="something else"){
  if(path1!==path2){
    document.querySelector(".custom-backdrop-loader").classList.toggle("active");
  }
}