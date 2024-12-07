import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGenerator = ({ reportRef }) => {
  const generatePDF = async () => {
    if (!reportRef || !reportRef.current) {
      console.error('Report reference is not available');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;

    try {
      // Identify Summary Page
      const summaryPage = reportRef.current.querySelector('.page:first-child');
      if (summaryPage) {
        const summaryCanvas = await html2canvas(summaryPage, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const summaryHeight = (summaryCanvas.height * (pageWidth - 2 * margin)) / summaryCanvas.width;
        pdf.addImage(
          summaryCanvas.toDataURL('image/png'),
          'PNG',
          margin,
          margin,
          pageWidth - 2 * margin,
          summaryHeight
        );

        // Add a new page after the summary
        pdf.addPage();
      } else {
        console.error('Summary page not found');
      }

      // Handle Dynamic Usage Pages
      const usageRows = reportRef.current.querySelectorAll('.usage-row');
      const columnValuesElement = reportRef.current.querySelector('.usage-page-header');
      const contactDetailsElement = reportRef.current.querySelector('.contact-details');

      if (!usageRows.length || !columnValuesElement || !contactDetailsElement) {
        console.error('Required elements for usage pages are missing');
        return;
      }

      let currentY = margin;

      // Add ColumnValues to the first dynamic page
      const columnValuesCanvas = await html2canvas(columnValuesElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const columnValuesHeight = (columnValuesCanvas.height * (pageWidth - 2 * margin)) / columnValuesCanvas.width;

      pdf.addImage(
        columnValuesCanvas.toDataURL('image/png'),
        'PNG',
        margin,
        currentY,
        pageWidth - 2 * margin,
        columnValuesHeight
      );
      currentY += columnValuesHeight + 5;

      // Add each usage row to the PDF
      for (let i = 0; i < usageRows.length; i++) {
        const rowCanvas = await html2canvas(usageRows[i], {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const rowHeight = (rowCanvas.height * (pageWidth - 2 * margin)) / rowCanvas.width;

        if (currentY + rowHeight > pageHeight - margin - 30) {
          // Add contact details before starting a new page
          const contactCanvas = await html2canvas(contactDetailsElement, {
            scale: 2,
            useCORS: true,
            logging: false,
          });
          const contactHeight = (contactCanvas.height * (pageWidth - 2 * margin)) / contactCanvas.width;

          pdf.addImage(
            contactCanvas.toDataURL('image/png'),
            'PNG',
            margin,
            currentY,
            pageWidth - 2 * margin,
            contactHeight
          );

          // Start a new page
          pdf.addPage();
          currentY = margin;

          // Add ColumnValues at the top of the new page
          pdf.addImage(
            columnValuesCanvas.toDataURL('image/png'),
            'PNG',
            margin,
            currentY,
            pageWidth - 2 * margin,
            columnValuesHeight
          );
          currentY += columnValuesHeight + 5;
        }

        // Add the current row to the page
        pdf.addImage(
          rowCanvas.toDataURL('image/png'),
          'PNG',
          margin,
          currentY,
          pageWidth - 2 * margin,
          rowHeight
        );
        currentY += rowHeight + 5;
      }

      // Add contact details on the final page
      const finalContactCanvas = await html2canvas(contactDetailsElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const finalContactHeight = (finalContactCanvas.height * (pageWidth - 2 * margin)) / finalContactCanvas.width;

      pdf.addImage(
        finalContactCanvas.toDataURL('image/png'),
        'PNG',
        margin,
        currentY,
        pageWidth - 2 * margin,
        finalContactHeight
      );

      // Save the PDF
      pdf.save('report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button 
      onClick={generatePDF} 
      className="bg-purpleCustom hover:bg-purpleCustom/80 text-white font-bold py-2 px-4 rounded"
    >
      Export PDF
    </button>
  );
};

export default PDFGenerator;
