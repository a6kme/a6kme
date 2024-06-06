export const downloadPdf = (source_path, download_filename) => {
    const link = document.createElement('a');
    link.href = source_path;  // Update this path to the location of your PDF file
    link.download = download_filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
