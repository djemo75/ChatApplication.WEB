export const downloadFile = (blob, fileName) => {
  const link = document.createElement("a");
  if (link.download !== undefined) {
    let url;

    try {
      url = URL.createObjectURL(blob);
    } catch (error) {
      url = blob;
    }

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
