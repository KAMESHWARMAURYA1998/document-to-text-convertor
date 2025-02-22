document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      alert('Please select a valid .docx file.');
      return;
    }
  
    const arrayBuffer = await file.arrayBuffer();
    
    // Load docx parsing library
    const docx = await import("https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js");
  
    // Extract text content
    docx.extractRawText({ arrayBuffer })
      .then((result) => {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = `<p>${result.value.replace(/\n/g, '</p><p>')}</p>`;
      })
      .catch((err) => {
        console.error("Error parsing docx:", err);
        alert("Failed to read the file. Please try again.");
      });
  });