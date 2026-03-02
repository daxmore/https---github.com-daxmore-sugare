const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoice = async (order, user) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const invoicesDir = path.join(__dirname, '../invoices');
      
      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const fileName = `invoice-${order._id}.pdf`;
      const filePath = path.join(invoicesDir, fileName);
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Brand Colors
      const primaryColor = '#2C1E16'; // Deep Espresso
      const accentColor = '#C17F59'; // Caramel / Rose Gold
      const grayColor = '#8c8c8c';

      // --- HEADER ---
      doc.rect(0, 0, 600, 120).fill(primaryColor);
      doc.fillColor('#FFFFFF')
         .fontSize(28)
         .text('SUGARÉ', 50, 45, { tracking: 4 });
      
      doc.fontSize(10)
         .text('INVOICE', 450, 50, { align: 'right', tracking: 2 });
         
      // --- INVOICE INFO ---
      doc.moveDown(4);
      doc.fillColor(primaryColor).fontSize(10).text('BILLED TO:', 50, 150, { tracking: 1 });
      doc.fontSize(14).font('Helvetica-Bold').text(user.fullname, 50, 165);
      doc.fontSize(10).font('Helvetica').fillColor(grayColor).text(`@${user.username} | ${user.email}`, 50, 185);
      
      doc.fillColor(primaryColor).fontSize(10).text('ORDER DETAILS:', 350, 150, { tracking: 1, align: 'right' });
      doc.fontSize(10).font('Helvetica').fillColor(grayColor)
         .text(`Order ID: #${order._id.toString().slice(-6).toUpperCase()}`, 350, 165, { align: 'right' })
         .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 350, 180, { align: 'right' })
         .text(`Pickup Date: ${new Date(order.pickupDate).toLocaleDateString()}`, 350, 195, { align: 'right' });

      // --- TABLE HEADER ---
      doc.moveDown(4);
      const tableTop = 250;
      doc.rect(50, tableTop - 10, 500, 25).fill(accentColor);
      
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(10);
      doc.text('ITEM DESCRIPTION', 60, tableTop);
      doc.text('QTY', 330, tableTop);
      doc.text('PRICE', 400, tableTop);
      doc.text('TOTAL', 480, tableTop, { align: 'right' });

      // --- TABLE ROWS ---
      let yPosition = tableTop + 30;
      doc.font('Helvetica').fillColor(primaryColor).fontSize(10);

      order.items.forEach((item, i) => {
        // Alternating row background
        if (i % 2 === 0) {
            doc.rect(50, yPosition - 10, 500, 40 + (item.modifiers.length * 15)).fill('#FAFAFA');
        }

        doc.fillColor(primaryColor).font('Helvetica-Bold').text(item.dessert.name, 60, yPosition);
        doc.font('Helvetica').fillColor(grayColor).text(`Variant: ${item.variant.name}`, 60, yPosition + 12);
        
        doc.fillColor(primaryColor);
        doc.text(item.quantity.toString(), 330, yPosition);
        doc.text(`Rs. ${item.variant.price.toFixed(2)}`, 400, yPosition);
        doc.font('Helvetica-Bold').text(`Rs. ${item.subtotal.toFixed(2)}`, 480, yPosition, { align: 'right' });

        let modY = yPosition + 26;
        if (item.modifiers.length > 0) {
          doc.font('Helvetica-Oblique').fillColor(accentColor).fontSize(8);
          item.modifiers.forEach(m => {
            doc.text(`+ ${m.name} (Rs. ${m.extraPrice.toFixed(2)})`, 60, modY);
            modY += 12;
          });
        }
        
        yPosition = modY + 10;
      });

      // --- TOTALS SECTION ---
      doc.moveTo(350, yPosition + 10).lineTo(550, yPosition + 10).strokeColor('#EAEAEA').stroke();
      yPosition += 25;

      doc.font('Helvetica').fontSize(10).fillColor(grayColor);
      doc.text('Subtotal:', 350, yPosition);
      doc.fillColor(primaryColor).text(`Rs. ${order.totalAmount.toFixed(2)}`, 450, yPosition, { align: 'right' });
      
      yPosition += 20;
      doc.fillColor(grayColor).text('GST (5%):', 350, yPosition);
      doc.fillColor(primaryColor).text(`Rs. ${order.gstAmount.toFixed(2)}`, 450, yPosition, { align: 'right' });

      if (order.discountApplied > 0) {
        yPosition += 20;
        doc.fillColor(accentColor).text('Discount Applied:', 350, yPosition);
        doc.text(`-Rs. ${order.discountApplied.toFixed(2)}`, 450, yPosition, { align: 'right' });
      }

      yPosition += 20;
      doc.moveTo(350, yPosition).lineTo(550, yPosition).strokeColor(primaryColor).stroke();
      
      yPosition += 15;
      doc.font('Helvetica-Bold').fontSize(14).fillColor(primaryColor);
      doc.text('GRAND TOTAL:', 350, yPosition);
      doc.text(`Rs. ${order.grandTotal.toFixed(2)}`, 450, yPosition, { align: 'right' });

      // --- FOOTER ---
      doc.rect(0, 750, 600, 100).fill('#FAFAFA');
      doc.font('Helvetica').fontSize(9).fillColor(grayColor);
      doc.text('Thank you for choosing Boutique Bakery.', 50, 770, { align: 'center' });
      doc.text('123 Delicious Lane, Sweets City | hello@donuterria.com | +91 98765 43210', 50, 785, { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(`/invoices/${fileName}`);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateInvoice };
