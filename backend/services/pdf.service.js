import { PDFParse } from 'pdf-parse'

const extractPdfText = async (fileUrl) => {
    // Load the PDF
    const response = await fetch(fileUrl);

    if(!response.ok){
        throw new Error(`Failed to download PDF: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // PDF -> text
    const parser = new PDFParse({data: buffer,});
    const pdfData = await parser.getText();

    return pdfData;
}

export { extractPdfText };