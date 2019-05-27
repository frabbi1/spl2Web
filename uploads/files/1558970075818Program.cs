using System;
using System.IO;
using org.apache.pdfbox.pdmodel;
using org.apache.pdfbox.util;

namespace Pdf2Text
{
	class Program
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			DateTime start = DateTime.Now;
			if (args.Length < 2)
			{
				Console.WriteLine("Usage: PDF2TEXT <input filename (PDF)> <output filename (text)>");
				return;
			}

			using (StreamWriter sw = new StreamWriter(args[1]))
			{
				sw.WriteLine(parseUsingPDFBox(args[0]));
			}

			Console.WriteLine("Done. Took " + (DateTime.Now - start));

            //			Console.ReadLine();

		}

		private static string parseUsingPDFBox(string input)
		{
		    PDDocument doc = null;

            try
            {
                doc = PDDocument.load(input);
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(doc);
            }
            finally
            {
                if (doc != null)
                {
                    doc.close();
                }
            }
		}
	}
}
